import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Refund Policy - PlannerFlow",
  description: "Refund Policy for PlannerFlow digital planning suite",
}

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance mb-4">Refund Policy</h1>
            <p className="text-lg text-muted-foreground">Last updated: December 2024</p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>30-Day Money-Back Guarantee</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We offer a 30-day money-back guarantee for all PlannerFlow subscription plans. If you're not
                  completely satisfied with our digital planning templates and features, you can request a full refund
                  within 30 days of your initial purchase.
                </p>
                <p>
                  This guarantee covers all subscription plans including Essential, Complete, Pro, and Family plans for
                  both monthly and yearly billing cycles.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How to Request a Refund</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>To request a refund, please follow these simple steps:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Contact our support team at support@plannerflow.shop</li>
                  <li>Include your account email address and purchase details</li>
                  <li>Provide a brief reason for your refund request</li>
                  <li>Allow 5-7 business days for processing</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Refund Conditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Refunds are available under the following conditions:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Request made within 30 days of purchase</li>
                  <li>Technical issues preventing access to templates</li>
                  <li>Service not meeting described expectations</li>
                  <li>Accidental duplicate purchases</li>
                </ul>
                <p>
                  Refunds may not be available for accounts that violate our terms of service or make excessive refund
                  requests.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscription Cancellations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  You can cancel your subscription at any time through your account dashboard. Upon cancellation, you'll
                  retain access to templates until the end of your current billing period.
                </p>
                <p>
                  Cancellation stops future billing but doesn't automatically refund the current period unless requested
                  within our 30-day guarantee window.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p>If you have any questions about our refund policy, please contact us at:</p>
                <div className="mt-4 space-y-1">
                  <p>
                    <strong>Email:</strong> support@plannerflow.shop
                  </p>
                  <p>
                    <strong>Response Time:</strong> Within 24 hours
                  </p>
                  <p>
                    <strong>Address:</strong> 442 5th Ave. Ste. 1913, New York, NY 10018
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
