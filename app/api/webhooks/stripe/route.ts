import { type NextRequest, NextResponse } from "next/server"
import { stripe, isStripeConfigured, priceToPlan } from "@/lib/stripe"
import { supabaseAdmin } from "@/lib/supabase/admin"
import type Stripe from "stripe"

export async function POST(request: NextRequest) {
  try {
    if (!isStripeConfigured() || !stripe) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 503 })
    }

    const body = await request.text()
    const signature = request.headers.get("stripe-signature")

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const customerId = session.customer as string

        if (customerId) {
          // Get the price ID from the session to determine the plan
          let planName = "essential" // Default to essential for paid sessions
          let priceId = null

          // Try to get price ID from line items
          if (session.line_items?.data?.[0]?.price?.id) {
            priceId = session.line_items.data[0].price.id
            planName = priceToPlan[priceId] || "essential"
          }

          // Update user by stripe_customer_id instead of metadata
          const { data, error } = await supabaseAdmin
            .from("profiles")
            .update({
              subscription_plan: planName,
              subscription_status: "active",
              stripe_subscription_id: session.subscription as string,
              updated_at: new Date().toISOString(),
            })
            .eq("stripe_customer_id", customerId)
            .select()

          if (error) {
            console.error("Failed to update user profile:", error)
          }
        }
        break
      }

      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription
        const priceId = subscription.items.data[0]?.price.id
        const planName = priceId ? priceToPlan[priceId] : "free"

        const { error } = await supabaseAdmin
          .from("profiles")
          .update({
            subscription_plan: planName,
            subscription_status: subscription.status === "trialing" ? "trialing" : "active",
            stripe_subscription_id: subscription.id,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_customer_id", subscription.customer as string)

        if (error) {
          console.error("Failed to update subscription:", error)
        }
        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        const priceId = subscription.items.data[0]?.price.id
        const planName = priceId ? priceToPlan[priceId] : "free"

        let status = "active"
        if (subscription.status === "canceled") status = "canceled"
        else if (subscription.status === "past_due") status = "past_due"
        else if (subscription.status === "trialing") status = "trialing"

        const { error } = await supabaseAdmin
          .from("profiles")
          .update({
            subscription_plan: planName,
            subscription_status: status,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_customer_id", subscription.customer as string)

        if (error) {
          console.error("Failed to update subscription:", error)
        }
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription

        const { error } = await supabaseAdmin
          .from("profiles")
          .update({
            subscription_plan: "free",
            subscription_status: "canceled",
            stripe_subscription_id: null,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_customer_id", subscription.customer as string)

        if (error) {
          console.error("Failed to cancel subscription:", error)
        }
        break
      }

      default:
        // Unhandled webhook event type
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook processing error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
