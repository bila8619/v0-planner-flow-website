import type { Metadata } from "next"
import { Header } from "@/components/header"
import { TemplatesSection } from "@/components/templates-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Templates - 45+ Interactive Digital Planning Templates | PlannerFlow",
  description:
    "Browse 45+ interactive digital planning templates organized by demographic, methodology, and premium categories. OKR, GTD, Pomodoro, Life Planning and more.",
  keywords:
    "digital planning templates, OKR templates, GTD planning, Pomodoro technique, life planning, productivity templates, goal tracking",
  openGraph: {
    title: "45+ Interactive Digital Planning Templates - PlannerFlow",
    description: "Discover templates for every planning need: demographic, methodology, and premium categories.",
    url: "https://plannerflow.shop/templates",
  },
}

export default function TemplatesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <TemplatesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
