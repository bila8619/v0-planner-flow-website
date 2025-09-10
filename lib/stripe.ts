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
  essential_monthly: "price_1S15IoJUG8OCdoSpiVcPUHuf",
  essential_yearly: "price_1S15KZJUG8OCdoSpsZAO33ZG",
  complete_monthly: "price_1S15LOJUG8OCdoSpe0DuDBTB",
  complete_yearly: "price_1S15MZJUG8OCdoSpScCXxVBD",
  pro_monthly: "price_1S15NWJUG8OCdoSpAgX8h9qf",
  pro_yearly: "price_1S15P9JUG8OCdoSpkTYqfINY",
  family_monthly: "price_1S15PoJUG8OCdoSpARHAcwVk",
  family_yearly: "price_1S15QWJUG8OCdoSp4adb69J9",
}

export const priceToPlan: Record<string, string> = {
  // Essential Plan
  price_1S15IoJUG8OCdoSpiVcPUHuf: "essential",
  price_1S15KZJUG8OCdoSpsZAO33ZG: "essential",
  // Complete Plan
  price_1S15LOJUG8OCdoSpe0DuDBTB: "complete",
  price_1S15MZJUG8OCdoSpScCXxVBD: "complete",
  // Pro Plan
  price_1S15NWJUG8OCdoSpAgX8h9qf: "pro",
  price_1S15P9JUG8OCdoSpkTYqfINY: "pro",
  // Family Plan
  price_1S15PoJUG8OCdoSpARHAcwVk: "family",
  price_1S15QWJUG8OCdoSp4adb69J9: "family",
}
