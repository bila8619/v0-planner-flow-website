import type { Metadata } from "next"
import { CheckoutSuccessClient } from "./checkout-success-client"

export const metadata: Metadata = {
  title: "Payment Successful - PlannerFlow",
  description: "Your subscription has been activated successfully",
}

export default function CheckoutSuccessPage() {
  return <CheckoutSuccessClient />
}
