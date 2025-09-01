"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { CheckCircle, Crown, Calendar, ArrowRight, AlertCircle } from "lucide-react"

interface SessionData {
  planName: string
  billingCycle: string
  amount: number
  currency: string
  customerEmail: string
}

export function CheckoutSuccessClient() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [sessionData, setSessionData] = useState<SessionData | null>(null)
  const [verifying, setVerifying] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const sessionIdParam = urlParams.get("session_id")

    if (sessionIdParam) {
      setSessionId(sessionIdParam)
      verifySession(sessionIdParam)
    } else {
      setError("No session ID found. Please contact support if you completed a payment.")
      setVerifying(false)
    }
  }, [])

  const verifySession = async (sessionId: string) => {
    try {
      console.log("[v0] Verifying session:", sessionId)

      const response = await fetch("/api/stripe/verify-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log("[v0] Session verified:", data)
        setSessionData(data)

        await updateSubscriptionManually(sessionId)
      } else {
        const errorData = await response.json()
        console.error("[v0] Session verification failed:", errorData)
        setError(errorData.error || "Failed to verify payment session")
      }
    } catch (error) {
      console.error("[v0] Session verification error:", error)
      setError("Unable to verify payment. Please contact support.")
    } finally {
      setVerifying(false)
    }
  }

  const updateSubscriptionManually = async (sessionId: string) => {
    try {
      console.log("[v0] Manually updating subscription for session:", sessionId)

      const response = await fetch("/api/stripe/update-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Manual subscription update failed:", errorData)
      }
    } catch (error) {
      console.error("Manual subscription update error:", error)
    }
  }

  const getPlanDisplayName = (plan: string) => {
    switch (plan) {
      case "essential":
        return "Essential Plan"
      case "complete":
        return "Complete Plan"
      case "pro":
        return "Pro Plan"
      case "family":
        return "Family Plan"
      default:
        return "Plan"
    }
  }

  const getPlanFeatures = (plan: string) => {
    switch (plan) {
      case "essential":
        return ["25 Interactive Templates", "Basic Export", "Mobile Access", "Email Support"]
      case "complete":
        return ["All 45 Templates", "Advanced Export", "Customization", "Analytics", "White Label"]
      case "pro":
        return ["Everything in Complete", "Custom Template Builder", "Integrations", "API Access", "Priority Support"]
      case "family":
        return ["Everything in Pro", "6 Family Accounts", "Shared Templates", "Family Dashboard", "Admin Controls"]
      default:
        return ["Access to templates"]
    }
  }

  if (verifying) {
    return (
      <>
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Verifying your payment...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Payment Verification Failed</h1>
            <p className="text-lg text-muted-foreground mb-6">{error}</p>
            <div className="space-y-3">
              <Link href="/pricing">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Try Again</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" className="w-full bg-transparent">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const currentPlan = sessionData?.planName || "complete"
  const billingCycle = sessionData?.billingCycle || "monthly"

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Payment Successful!</h1>
            <p className="text-lg text-muted-foreground">
              Welcome to PlannerFlow! Your subscription has been activated.
            </p>
          </div>

          {/* Plan Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-primary" />
                Your New Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{getPlanDisplayName(currentPlan)}</h3>
                  <p className="text-sm text-muted-foreground">
                    {sessionData && (
                      <>
                        ${(sessionData.amount / 100).toFixed(2)} {sessionData.currency.toUpperCase()} / {billingCycle}
                        {sessionId && ` • ${sessionId.slice(0, 20)}...`}
                      </>
                    )}
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-foreground">What's included:</h4>
                <ul className="space-y-2">
                  {getPlanFeatures(currentPlan).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Link href="/templates">
                  <div className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <h3 className="font-medium">Browse Templates</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Explore all available templates and start planning</p>
                    <div className="flex items-center gap-1 mt-2 text-sm text-primary">
                      <span>Get started</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>

                <Link href="/dashboard">
                  <div className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <Crown className="w-5 h-5 text-primary" />
                      <h3 className="font-medium">View Dashboard</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Manage your account and subscription settings</p>
                    <div className="flex items-center gap-1 mt-2 text-sm text-primary">
                      <span>Go to dashboard</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-medium text-foreground mb-2">Need Help Getting Started?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our support team is here to help you make the most of PlannerFlow
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/faq">
                    <Button variant="outline" className="cursor-pointer bg-transparent">
                      View FAQ
                    </Button>
                  </Link>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer">
                    Contact Support
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Confirmation Notice */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-3 h-3 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Confirmation Email Sent</h4>
                <p className="text-sm text-blue-700">
                  We've sent a confirmation email to {sessionData?.customerEmail || "your email address"} with your
                  receipt and subscription details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
