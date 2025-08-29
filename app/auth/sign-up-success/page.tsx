"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Mail, CheckCircle } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo-black.png"
                alt="PlannerFlow - Create. Focus. Repeat."
                width={180}
                height={60}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <Card className="shadow-lg text-center">
            <CardHeader className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">Account Created Successfully!</CardTitle>
              <CardDescription className="text-muted-foreground">
                We've sent you a confirmation email to verify your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-2">
                  <Mail className="h-5 w-5" />
                  <span className="text-sm font-medium">Check Your Email</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Please check your email and click the confirmation link to activate your account before signing in.
                </p>
              </div>

              <div className="space-y-3">
                <Link href="/auth/login">
                  <Button className="w-full bg-primary hover:bg-primary/90">Go to Sign In</Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full bg-transparent">
                    Return to Homepage
                  </Button>
                </Link>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Didn't receive the email? Check your spam folder or contact support
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
