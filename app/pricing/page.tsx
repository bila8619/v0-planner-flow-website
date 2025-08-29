import type { Metadata } from "next"
import { Header } from "@/components/header"
import { PricingSection } from "@/components/pricing-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Pricing - PlannerFlow Digital Planning Templates",
  description:
    "Choose from Essential ($12.99/month), Complete ($19.99/month), Pro ($24.99/month) or Family ($32.99/month). 45+ interactive templates for digital planning and productivity.",
  keywords:
    "planning templates pricing, digital planner subscription, productivity templates price, OKR templates, GTD planning",
  openGraph: {
    title: "PlannerFlow Pricing - Digital Planning Templates",
    description: "Choose the perfect subscription plan for your productivity needs. Starting from $12.99/month.",
    url: "https://plannerflow.shop/pricing",
  },
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
