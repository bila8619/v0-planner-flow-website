import { type NextRequest, NextResponse } from "next/server"
import { stripe, isStripeConfigured, priceToPlan } from "@/lib/stripe"
import { supabaseAdmin } from "@/lib/supabase/admin"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Manual subscription update requested")

    if (!isStripeConfigured() || !stripe) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 503 })
    }

    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 })
    }

    console.log("[v0] Retrieving Stripe session:", sessionId)

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "line_items.data.price"],
    })

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 })
    }

    const customerId = session.customer as string
    const priceId = session.line_items?.data?.[0]?.price?.id
    const planName = priceId ? priceToPlan[priceId] || "essential" : "essential"

    console.log("[v0] Updating user subscription manually:")
    console.log("[v0] Customer ID:", customerId)
    console.log("[v0] Price ID:", priceId)
    console.log("[v0] Plan:", planName)

    try {
      const { data, error } = await supabaseAdmin
        .from("profiles")
        .update({
          subscription_plan: planName,
          subscription_status: "active",
          stripe_customer_id: customerId,
          stripe_subscription_id: session.subscription as string,
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_customer_id", customerId)
        .select()

      if (error) {
        console.error("[v0] Database update error:", error)
        return NextResponse.json(
          {
            error: "Database update failed",
            details: error.message,
          },
          { status: 500 },
        )
      }

      if (!data || data.length === 0) {
        console.error("[v0] No profile found for customer:", customerId)
        return NextResponse.json({ error: "User profile not found for customer" }, { status: 404 })
      }

      console.log("[v0] User profile updated manually:", data[0])
      return NextResponse.json({
        success: true,
        plan: planName,
        profile: data[0],
      })
    } catch (dbError) {
      console.error("[v0] Database operation failed:", dbError)
      return NextResponse.json(
        {
          error: "Database operation failed",
          details: dbError instanceof Error ? dbError.message : "Unknown error",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("[v0] Manual subscription update error:", error)
    return NextResponse.json(
      {
        error: "Update failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
