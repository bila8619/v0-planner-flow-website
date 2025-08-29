import { type NextRequest, NextResponse } from "next/server"
import { stripe, isStripeConfigured } from "@/lib/stripe"
import { createServerClient } from "@/lib/supabase/server"

export const runtime = "nodejs"

export async function GET() {
  console.log("[v0] GET request to Stripe checkout API")
  console.log("[v0] Environment check - NODE_ENV:", process.env.NODE_ENV)
  console.log("[v0] Environment check - VERCEL:", process.env.VERCEL)
  console.log("[v0] Stripe configured:", isStripeConfigured())

  return NextResponse.json({
    message: "Stripe checkout API is available",
    stripeConfigured: isStripeConfigured(),
    timestamp: new Date().toISOString(),
    availableMethods: ["GET", "POST"],
    environment: process.env.NODE_ENV,
    isVercel: !!process.env.VERCEL,
  })
}

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    console.log("[v0] Invalid method:", request.method)
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
  }

  console.log("[v0] POST request received to Stripe checkout API")
  console.log("[v0] Request method:", request.method)
  console.log("[v0] Request URL:", request.url)
  console.log("[v0] Environment:", process.env.NODE_ENV)
  console.log("[v0] Is Vercel:", !!process.env.VERCEL)

  try {
    console.log("[v0] Stripe checkout API called")

    // Check if Stripe is configured
    if (!isStripeConfigured() || !stripe) {
      console.log("[v0] Stripe not configured")
      console.log("[v0] STRIPE_SECRET_KEY exists:", !!process.env.STRIPE_SECRET_KEY)
      console.log("[v0] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY exists:", !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
      return NextResponse.json({ error: "Payment system is not configured. Please contact support." }, { status: 503 })
    }

    const body = await request.json()
    console.log("[v0] Request body:", body)

    const { priceId } = body
    console.log("[v0] Price ID:", priceId)

    if (!priceId) {
      console.log("[v0] Missing priceId in request")
      return NextResponse.json({ error: "Price ID is required" }, { status: 400 })
    }

    const supabase = await createServerClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      console.log("[v0] Authentication failed:", authError)
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    console.log("[v0] User authenticated:", user.email)
    console.log("[v0] Using price ID:", priceId)

    const { data: profile } = await supabase.from("profiles").select("stripe_customer_id").eq("id", user.id).single()

    let customerId = profile?.stripe_customer_id

    if (!customerId) {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: user.email!,
        metadata: {
          supabase_user_id: user.id,
        },
      })
      customerId = customer.id

      // Update profile with Stripe customer ID
      await supabase.from("profiles").update({ stripe_customer_id: customerId }).eq("id", user.id)

      console.log("[v0] Created new Stripe customer:", customerId)
    } else {
      console.log("[v0] Using existing Stripe customer:", customerId)
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://v0-planner-flow-website-overview-one.vercel.app"
    console.log("[v0] Site URL:", siteUrl)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "affirm"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/pricing`,
      customer: customerId,
      payment_method_options: {
        affirm: {
          capture_method: "automatic",
        },
      },
      metadata: {
        supabase_user_id: user.id,
        price_id: priceId,
      },
    })

    console.log("[v0] Checkout session created:", session.id)
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("[v0] Stripe checkout error:", error)
    return NextResponse.json(
      {
        error: "Failed to create checkout session",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      Allow: "GET, POST, OPTIONS",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
