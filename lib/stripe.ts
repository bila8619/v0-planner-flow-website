import Stripe from "stripe"

// Create Stripe instance with error handling for missing environment variables
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    })
  : null

// Helper function to check if Stripe is configured
export const isStripeConfigured = (): boolean => {
  return !!(process.env.STRIPE_SECRET_KEY && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
}

export const STRIPE_PRICE_IDS = {
  essential_monthly: "price_1S17foJTZ7RccFMAu0YJ06WR",
  essential_yearly: "price_1S17fRJTZ7RccFMAyRzB3FpU",
  complete_monthly: "price_1S1CkaJTZ7RccFMABeclHUSU",
  complete_yearly: "price_1S1ClCJTZ7RccFMA4fUtuxYC",
  pro_monthly: "price_1S1CljJTZ7RccFMAFiSa39nD",
  pro_yearly: "price_1S1Cm3JTZ7RccFMAwPLMBAvJ",
  family_monthly: "price_1S1CmOJTZ7RccFMAbrUjseZd",
  family_yearly: "price_1S1CmmJTZ7RccFMAYFGt4ISL",
}

export const priceToPlan: Record<string, string> = {
  // Essential Plan
  price_1S17foJTZ7RccFMAu0YJ06WR: "essential",
  price_1S17fRJTZ7RccFMAyRzB3FpU: "essential",
  // Complete Plan
  price_1S1CkaJTZ7RccFMABeclHUSU: "complete",
  price_1S1ClCJTZ7RccFMA4fUtuxYC: "complete",
  // Pro Plan
  price_1S1CljJTZ7RccFMAFiSa39nD: "pro",
  price_1S1Cm3JTZ7RccFMAwPLMBAvJ: "pro",
  // Family Plan
  price_1S1CmOJTZ7RccFMAbrUjseZd: "family",
  price_1S1CmmJTZ7RccFMAYFGt4ISL: "family",
}
