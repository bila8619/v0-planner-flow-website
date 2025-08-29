"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const { user, loading } = useAuth()
  const router = useRouter()

  const handleSubscribe = async (planName: string) => {
    if (loading) {
      toast.error("Please wait while we load your session")
      return
    }

    if (!user) {
      toast.info("Please sign in to purchase a subscription")
      router.push("/auth/login")
      return
    }

    setLoadingPlan(planName)

    try {
      const priceMapping: Record<string, { monthly: string; yearly: string }> = {
        "essential plan": {
          monthly: "price_1S17foJTZ7RccFMAu0YJ06WR",
          yearly: "price_1S17fRJTZ7RccFMAyRzB3FpU",
        },
        "complete plan": {
          monthly: "price_1S1CkaJTZ7RccFMABeclHUSU",
          yearly: "price_1S1ClCJTZ7RccFMA4fUtuxYC",
        },
        "pro plan": {
          monthly: "price_1S1CljJTZ7RccFMAFiSa39nD",
          yearly: "price_1S1Cm3JTZ7RccFMAwPLMBAvJ",
        },
        "family plan": {
          monthly: "price_1S1CmOJTZ7RccFMAbrUjseZd",
          yearly: "price_1S1CmmJTZ7RccFMAYFGt4ISL",
        },
      }

      const planKey = planName.toLowerCase()
      const priceId = isYearly ? priceMapping[planKey]?.yearly : priceMapping[planKey]?.monthly

      if (!priceId) {
        toast.error("Plan not available yet")
        return
      }

      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: priceId,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        toast.error(errorData.error || "Failed to create checkout session")
        return
      }

      const data = await response.json()

      if (data?.url) {
        window.location.href = data.url
      } else {
        toast.error("Failed to create checkout session")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoadingPlan(null)
    }
  }

  const topRowPlans = [
    {
      name: "Essential Plan",
      price: isYearly ? "$99" : "$12.99",
      period: isYearly ? "/year" : "/month",
      originalPrice: isYearly ? "$140" : null,
      savings: isYearly ? "save 30%" : null,
      description: "Perfect for individuals starting their planning journey",
      features: [
        "25 Core Templates (All Demographic + 10 most popular Methodology)",
        "Full template functionality (auto-save, progress tracking, basic export)",
        "Mobile responsive access on all devices",
        "PDF export with PlannerFlow branding",
        "Email support (72-hour response)",
      ],
      buttonText: "Start Essential",
      buttonClass: "bg-red-600 hover:bg-red-700 text-white",
      perfectFor: "Individuals starting their planning journey",
    },
    {
      name: "Complete Plan",
      price: isYearly ? "$159" : "$19.99",
      period: isYearly ? "/year" : "/month",
      originalPrice: isYearly ? "$240" : null,
      savings: isYearly ? "save 30%" : null,
      description: "Most popular choice for serious planners",
      features: [
        "All 45+ Templates (Complete collection)",
        "Advanced export options (PDF, CSV, print-friendly formats)",
        "Template customization (colors, fonts, add personal sections)",
        "Progress analytics (completion rates, productivity insights)",
        "White-label export (remove PlannerFlow branding)",
        "Priority email support (24-hour response)",
      ],
      buttonText: "Choose Complete",
      buttonClass: "bg-red-600 hover:bg-red-700 text-white",
      perfectFor: "Serious planners who want everything",
      popular: true,
    },
    {
      name: "Pro Plan",
      price: isYearly ? "$219" : "$24.99",
      period: isYearly ? "/year" : "/month",
      originalPrice: isYearly ? "$300" : null,
      savings: isYearly ? "save 30%" : null,
      description: "Complete suite for productivity professionals",
      features: [
        "Everything in Complete Plan",
        "Custom template builder (create unlimited personal templates)",
        "Advanced integrations (Google Calendar, Outlook, sync)",
        "Bulk operations (duplicate templates, batch export message formats)",
        "API access for power users and developers",
        "Early access to new templates (30 days before other tiers)",
      ],
      buttonText: "Go Pro",
      buttonClass: "bg-red-600 hover:bg-red-700 text-white",
      perfectFor: "Power users and productivity enthusiasts",
    },
  ]

  const familyPlan = {
    name: "Family Plan",
    price: isYearly ? "$279" : "$32.99",
    period: isYearly ? "/year" : "/month",
    originalPrice: isYearly ? "$396" : null,
    savings: isYearly ? "save 30%" : null,
    description: "Perfect for families who plan together",
    features: [
      "Everything in Pro Plan",
      "Up to 6 family accounts (separate logins and data)",
      "Shared family templates (collaborative family planning)",
      "Family dashboard (view everyone's progress and goals)",
      "Shared goal tracking (family objectives and milestones)",
      "Family calendar integration (sync all family schedules)",
    ],
    buttonText: "Choose Family",
    buttonClass: "bg-red-600 hover:bg-red-700 text-white",
    perfectFor: "Families who plan together",
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Planning Style</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Flexible subscription plans designed for every planning need. Start your productivity journey today.
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`font-medium ${!isYearly ? "text-red-600" : "text-gray-500"}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isYearly ? "bg-gray-400" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`font-medium ${isYearly ? "text-red-600" : "text-gray-500"}`}>Yearly</span>
            <Badge className="bg-green-500 text-white ml-2">Save up to 30%</Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          {topRowPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-2 ${plan.popular ? "border-red-500" : "border-gray-200"} rounded-lg`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-red-600 text-white px-3 py-1">🔥 Most Popular</Badge>
                </div>
              )}

              <CardHeader className="text-center p-6">
                <CardTitle className="text-xl font-bold text-gray-900 mb-4">{plan.name}</CardTitle>

                <div className="mb-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-red-600">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="text-sm text-gray-500 mt-1">
                      or <span className="line-through">{plan.originalPrice}</span>{" "}
                      <span className="text-green-600">({plan.savings})</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
              </CardHeader>

              <CardContent className="p-6 pt-0">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Perfect for:</span> {plan.perfectFor}
                  </p>
                </div>

                <Button
                  className={`w-full ${plan.buttonClass}`}
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={loadingPlan === plan.name}
                >
                  {loadingPlan === plan.name ? "Processing..." : plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <Card className="border-2 border-gray-200 rounded-lg">
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-4">{familyPlan.name}</CardTitle>

                <div className="mb-4">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-red-600">{familyPlan.price}</span>
                    <span className="text-gray-500 ml-1">{familyPlan.period}</span>
                  </div>
                  {familyPlan.originalPrice && (
                    <div className="text-sm text-gray-500 mt-1">
                      or <span className="line-through">{familyPlan.originalPrice}</span>{" "}
                      <span className="text-green-600">({familyPlan.savings})</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 mb-6">{familyPlan.description}</p>

                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Perfect for:</span> {familyPlan.perfectFor}
                  </p>
                </div>

                <Button
                  className={`w-full ${familyPlan.buttonClass}`}
                  onClick={() => handleSubscribe(familyPlan.name)}
                  disabled={loadingPlan === familyPlan.name}
                >
                  {loadingPlan === familyPlan.name ? "Processing..." : familyPlan.buttonText}
                </Button>
              </CardHeader>
            </Card>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Everything Included:</h3>
              <ul className="space-y-3">
                {familyPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
