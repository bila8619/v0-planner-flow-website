"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasValidSession, setHasValidSession] = useState<boolean | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      console.log("[v0] Reset password page mounted, checking session...")
      const supabase = createClient()
      console.log("[v0] Supabase client created")

      try {
        console.log("[v0] Calling supabase.auth.getSession()...")
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        console.log("[v0] getSession() response:", { session: !!session, error })
        if (session) {
          console.log("[v0] Session details:", {
            user_id: session.user?.id,
            email: session.user?.email,
            expires_at: session.expires_at,
          })
        }

        if (error || !session) {
          console.log("[v0] No valid session found, setting hasValidSession to false")
          setHasValidSession(false)
        } else {
          console.log("[v0] Valid session found, setting hasValidSession to true")
          setHasValidSession(true)
        }
      } catch (error) {
        console.log("[v0] Error during session check:", error)
        setHasValidSession(false)
      }
    }
    checkSession()
  }, [])

  useEffect(() => {
    if (isSuccess) {
      console.log("[v0] Password reset successful, starting 2-second redirect timer...")
      const timer = setTimeout(() => {
        console.log("[v0] Redirecting to login page...")
        router.push("/auth/login")
      }, 2000)
      return () => {
        console.log("[v0] Cleanup: clearing redirect timer")
        clearTimeout(timer)
      }
    }
  }, [isSuccess, router])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Password reset form submitted")
    const supabase = createClient()
    setIsLoading(true)
    setError(null)
    console.log("[v0] Set loading state to true, cleared error")

    if (!password.trim()) {
      console.log("[v0] Password validation failed: empty password")
      setError("Please enter a password")
      setIsLoading(false)
      return
    }

    console.log("[v0] Password validation passed, attempting to update user password...")

    try {
      console.log("[v0] Calling supabase.auth.updateUser() with new password...")
      const { error } = await supabase.auth.updateUser({ password })

      if (error) {
        console.log("[v0] updateUser() returned error:", error)
        throw error
      }

      console.log("[v0] Password update successful!")
      console.log("[v0] Setting success state to true...")
      setIsSuccess(true)
    } catch (error: unknown) {
      console.log("[v0] Password update failed with error:", error)
      const errorMessage = error instanceof Error ? error.message : "An error occurred"
      console.log("[v0] Setting error message:", errorMessage)
      setError(errorMessage)
    } finally {
      console.log("[v0] Setting loading state to false")
      setIsLoading(false)
    }
  }

  if (hasValidSession === null) {
    console.log("[v0] Rendering loading state (hasValidSession is null)")
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <Card className="shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!hasValidSession) {
    console.log("[v0] Rendering invalid session state")
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <div className="flex-1 flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <Card className="shadow-lg">
              <CardHeader className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">Invalid Reset Link</CardTitle>
                <CardDescription className="text-muted-foreground">
                  This password reset link is invalid or has expired
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground text-center">
                    Please request a new password reset link to continue.
                  </p>
                  <Link href="/auth/forgot-password">
                    <Button className="w-full">Request New Reset Link</Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button variant="outline" className="w-full bg-transparent">
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  if (isSuccess) {
    console.log("[v0] Rendering success state")
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <div className="flex-1 flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <Card className="shadow-lg">
              <CardHeader className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">Password Updated!</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Your password has been successfully updated
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground text-center">
                    Redirecting you to the login page in 2 seconds...
                  </p>
                  <Link href="/auth/login">
                    <Button className="w-full">Continue to Login</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  console.log("[v0] Rendering password reset form")
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <Card className="shadow-lg">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold text-foreground">Reset Your Password</CardTitle>
              <CardDescription className="text-muted-foreground">Enter your new password below</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90" disabled={isLoading}>
                  {isLoading ? "Updating Password..." : "Update Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
