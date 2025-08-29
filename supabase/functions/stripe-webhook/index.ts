import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import Stripe from "https://esm.sh/stripe@14.21.0"
import { Deno } from "https://deno.land/std@0.168.0/node/deno.ts"

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
})

const supabase = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "")

serve(async (req) => {
  const signature = req.headers.get("stripe-signature")
  const body = await req.text()

  if (!signature) {
    return new Response("No signature", { status: 400 })
  }

  try {
    const event = stripe.webhooks.constructEvent(body, signature, Deno.env.get("STRIPE_WEBHOOK_SECRET") || "")

    console.log("Webhook event type:", event.type)

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session

        if (session.mode === "subscription") {
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
          const priceId = subscription.items.data[0]?.price.id

          // Map price IDs to subscription plans
          const planMapping: Record<string, string> = {
            price_1S16N3JUG8OCdoSp8QqKyUdh: "essential",
            price_1S16ODJUG8OCdoSp2GFNeRV4: "essential",
            // Add other price IDs when available
          }

          const plan = planMapping[priceId] || "free"

          // Update user profile
          await supabase
            .from("profiles")
            .update({
              stripe_subscription_id: subscription.id,
              subscription_plan: plan,
              subscription_status: subscription.status,
              subscription_start_date: new Date(subscription.current_period_start * 1000).toISOString(),
              subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("stripe_customer_id", session.customer)
        }
        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        const priceId = subscription.items.data[0]?.price.id

        const planMapping: Record<string, string> = {
          price_1S16N3JUG8OCdoSp8QqKyUdh: "essential",
          price_1S16ODJUG8OCdoSp2GFNeRV4: "essential",
        }

        const plan = planMapping[priceId] || "free"

        await supabase
          .from("profiles")
          .update({
            subscription_plan: plan,
            subscription_status: subscription.status,
            subscription_start_date: new Date(subscription.current_period_start * 1000).toISOString(),
            subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subscription.id)
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription

        await supabase
          .from("profiles")
          .update({
            subscription_plan: "free",
            subscription_status: "canceled",
            subscription_end_date: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subscription.id)
        break
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    })
  } catch (error) {
    console.error("Webhook error:", error)
    return new Response(`Webhook error: ${error.message}`, { status: 400 })
  }
})
