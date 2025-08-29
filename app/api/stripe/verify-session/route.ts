import { type NextRequest, NextResponse } from "next/server"
import { stripe, isStripeConfigured } from "@/lib/stripe"

export async function GET(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!isStripeConfigured() || !stripe) {
      return NextResponse.json({ error: "Payment system is not configured" }, { status: 503 })
    }

    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get("session_id")

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "subscription"],
    })

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 })
    }

    // Return session data
    return NextResponse.json({
      planName: session.metadata?.plan_name || "unknown",
      billingCycle: session.metadata?.billing_cycle || "monthly",
      amount: session.amount_total || 0,
      currency: session.currency || "usd",
      customerEmail: session.customer_details?.email || "",
      sessionId: session.id,
    })
  } catch (error) {
    console.error("Session verification error:", error)
    return NextResponse.json({ error: "Failed to verify session" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] POST request received for session verification")

    // Check if Stripe is configured
    if (!isStripeConfigured() || !stripe) {
      console.log("[v0] Stripe not configured for session verification")
      return NextResponse.json({ error: "Payment system is not configured" }, { status: 503 })
    }

    const body = await request.json()
    const { sessionId } = body

    if (!sessionId) {
      console.log("[v0] Missing session ID in POST request")
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
    }

    console.log("[v0] Verifying Stripe session:", sessionId)

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "subscription"],
    })

    console.log("[v0] Session retrieved, payment status:", session.payment_status)

    if (session.payment_status !== "paid") {
      console.log("[v0] Payment not completed for session:", sessionId)
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 })
    }

    const sessionData = {
      planName: session.metadata?.plan_name || "essential",
      billingCycle: session.metadata?.billing_cycle || "monthly",
      amount: session.amount_total || 0,
      currency: session.currency || "usd",
      customerEmail: session.customer_details?.email || "",
      sessionId: session.id,
    }

    console.log("[v0] Session verification successful:", sessionData)

    // Return session data
    return NextResponse.json(sessionData)
  } catch (error) {
    console.error("[v0] Session verification error:", error)
    return NextResponse.json({ error: "Failed to verify session" }, { status: 500 })
  }
}
