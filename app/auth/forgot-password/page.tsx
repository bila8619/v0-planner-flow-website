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
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Reset your password</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Forgot Password
            </CardTitle>
            <CardDescription>We'll send you a secure link to reset your password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {message && (
                <Alert>
                  <AlertDescription className="text-green-600">{message}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading || !email}>
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
