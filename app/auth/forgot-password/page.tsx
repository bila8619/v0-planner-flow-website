"use client"

import type React from "react"
import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { processEnv } from "@/utils/processEnv"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")
    setError("")

    try {
      const redirectUrl = processEnv.NEXT_PUBLIC_SITE_URL || window.location.origin
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${redirectUrl}/auth/reset-password`,
      })

      if (error) {
        setError(error.message)
      } else {
        setMessage("Check your email for a password reset link.")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Reset your password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Mail className="h-5 w-5" />
                Forgot Password
              </CardTitle>
              <CardDescription>We'll send you a secure link to reset your password</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {message && (
                  <Alert className="border-green-200 bg-green-50">
                    <AlertDescription className="text-green-700">{message}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full h-11" disabled={isLoading || !email}>
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
