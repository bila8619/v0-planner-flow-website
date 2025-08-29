import { type NextRequest, NextResponse } from "next/server"
import { stripe, isStripeConfigured, priceToPlan } from "@/lib/stripe"
import { supabaseAdmin } from "@/lib/supabase/admin"
import type Stripe from "stripe"

export async function POST(request: NextRequest) {
  console.log("[v0] =================================")
  console.log("[v0] WEBHOOK RECEIVED AT:", new Date().toISOString())
  console.log("[v0] Request URL:", request.url)
  console.log("[v0] Request method:", request.method)
  console.log("[v0] =================================")

  try {
    console.log("[v0] Stripe webhook received")

    if (!isStripeConfigured() || !stripe) {
      console.log("[v0] Stripe not configured for webhooks")
      return NextResponse.json({ error: "Stripe not configured" }, { status: 503 })
    }

    const body = await request.text()
    const signature = request.headers.get("stripe-signature")

    if (!signature) {
      console.log("[v0] Missing Stripe signature")
      return NextResponse.json({ error: "Missing signature" }, { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (err) {
      console.error("[v0] Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    console.log("[v0] Processing webhook event:", event.type)

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        console.log("[v0] Checkout completed for session:", session.id)
        console.log("[v0] Session details:", JSON.stringify(session, null, 2))

        const customerId = session.customer as string
        console.log("[v0] Looking for user with customer ID:", customerId)

        if (customerId) {
          // Get the price ID from the session to determine the plan
          let planName = "essential" // Default to essential for paid sessions
          let priceId = null

          // Try to get price ID from line items
          if (session.line_items?.data?.[0]?.price?.id) {
            priceId = session.line_items.data[0].price.id
            planName = priceToPlan[priceId] || "essential"
          }

          console.log("[v0] Price ID:", priceId)
          console.log("[v0] Updating user plan to:", planName)

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
            console.error("[v0] Failed to update user profile:", error)
          } else {
            console.log("[v0] User profile updated successfully:", data)
            console.log("[v0] Plan updated from free to:", planName)
          }
        } else {
          console.log("[v0] No customer ID found in session")
        }
        break
      }

      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription
        console.log("[v0] Subscription created:", subscription.id)

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
          console.error("[v0] Failed to update subscription:", error)
        } else {
          console.log("[v0] Subscription created and updated:", planName)
        }
        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        console.log("[v0] Subscription updated:", subscription.id, subscription.status)

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
          console.error("[v0] Failed to update subscription:", error)
        } else {
          console.log("[v0] Subscription updated:", status, planName)
        }
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        console.log("[v0] Subscription deleted:", subscription.id)

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
          console.error("[v0] Failed to cancel subscription:", error)
        } else {
          console.log("[v0] Subscription canceled, user downgraded to free")
        }
        break
      }

      default:
        console.log("[v0] Unhandled webhook event type:", event.type)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[v0] Webhook processing error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
