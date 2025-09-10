import { type NextRequest, NextResponse } from "next/server"
import { stripe, isStripeConfigured, priceToPlan } from "@/lib/stripe"
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
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
  }

  try {
    // Check if Stripe is configured
    if (!isStripeConfigured() || !stripe) {
      return NextResponse.json({ error: "Payment system is not configured. Please contact support." }, { status: 503 })
    }

    const body = await request.json()
    const { priceId } = body

    if (!priceId) {
      return NextResponse.json({ error: "Price ID is required" }, { status: 400 })
    }

    const supabase = await createServerClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

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
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://plannerflow.shop"
    const planName = priceToPlan[priceId] || "essential"
    const billingCycle = priceId.includes("yearly") ? "yearly" : "monthly"

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
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
      metadata: {
        supabase_user_id: user.id,
        price_id: priceId,
        plan_name: planName,
        billing_cycle: billingCycle,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Stripe checkout error:", error)
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
