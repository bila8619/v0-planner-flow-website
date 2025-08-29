import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Cookie Policy - PlannerFlow",
  description: "Cookie Policy for PlannerFlow digital planning suite",
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance mb-4">Cookie Policy</h1>
            <p className="text-lg text-muted-foreground">Last updated: December 2024</p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>What Are Cookies?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Cookies are small text files that are stored on your device when you visit our website. They help us
                  provide you with a better experience by remembering your preferences, keeping you logged in, and
                  analyzing how you use our service.
                </p>
                <p>
                  We use cookies to enhance your browsing experience, analyze site traffic, and provide personalized
                  content and advertisements.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Types of Cookies We Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>We use several types of cookies on our website:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Essential Cookies:</strong> Required for the website to function properly
                  </li>
                  <li>
                    <strong>Analytics Cookies:</strong> Help us understand how visitors use our website
                  </li>
                  <li>
                    <strong>Functional Cookies:</strong> Remember your preferences and provide enhanced features
                  </li>
                  <li>
                    <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Third-Party Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We use trusted third-party services that may set their own cookies to help us provide better service
                  and analyze website performance.
                </p>
                <p>
                  These include payment processors like Stripe, analytics services like Google Analytics, and our
                  hosting provider Vercel.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Managing Your Cookie Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>You can control cookies through your browser settings by:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Blocking all cookies</li>
                  <li>Deleting existing cookies</li>
                  <li>Setting preferences for specific sites</li>
                  <li>Receiving notifications when cookies are set</li>
                </ul>
                <p>
                  Please note that disabling cookies may affect the functionality of our website and your user
                  experience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p>If you have any questions about our use of cookies, please contact us at:</p>
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
