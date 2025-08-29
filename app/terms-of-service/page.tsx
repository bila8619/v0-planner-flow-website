import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Terms of Service - PlannerFlow",
  description: "Terms of Service for PlannerFlow digital planning suite",
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance mb-4">Terms of Service</h1>
            <p className="text-lg text-muted-foreground">Last updated: December 2024</p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  By accessing and using PlannerFlow's digital planning services, you accept and agree to be bound by
                  the terms and provision of this agreement. If you do not agree to abide by the above, please do not
                  use this service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  PlannerFlow provides digital planning templates and productivity tools designed to help users organize
                  their personal and professional lives. Our service includes interactive templates, goal tracking,
                  progress analytics, and auto-save functionality.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Accounts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  To access certain features of our service, you may be required to create an account. You are
                  responsible for maintaining the confidentiality of your account information and for all activities
                  that occur under your account.
                </p>
                <p>
                  You agree to provide accurate, current, and complete information during registration and to update
                  such information as necessary.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment and Refunds</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our templates are available for purchase at the prices listed on our website. Payment is due at the
                  time of purchase. We offer a 30-day money-back guarantee for all template purchases.
                </p>
                <p>
                  Subscription services are billed monthly and can be cancelled at any time. Refunds for subscription
                  services are prorated to the date of cancellation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  All content, features, and functionality of PlannerFlow, including but not limited to templates, text,
                  graphics, logos, and software, are owned by PlannerFlow and are protected by copyright, trademark, and
                  other intellectual property laws.
                </p>
                <p>
                  Upon purchase, you receive a non-exclusive, non-transferable license to use our templates for personal
                  or commercial purposes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prohibited Uses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>You may not use our service:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>
                    To violate any international, federal, provincial, or state regulations, rules, laws, or local
                    ordinances
                  </li>
                  <li>
                    To infringe upon or violate our intellectual property rights or the intellectual property rights of
                    others
                  </li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  In no event shall PlannerFlow, nor its directors, employees, partners, agents, suppliers, or
                  affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages,
                  including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Termination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We may terminate or suspend your account and bar access to the service immediately, without prior
                  notice or liability, under our sole discretion, for any reason whatsoever and without limitation,
                  including but not limited to a breach of the Terms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p>If you have any questions about these Terms of Service, please contact us at:</p>
                <div className="mt-4 space-y-1">
                  <p>
                    <strong>Email:</strong> support@plannerflow.shop
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
