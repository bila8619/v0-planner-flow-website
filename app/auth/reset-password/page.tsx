"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { CheckCircle } from "lucide-react"

export default function ResetPasswordPage() {
  console.log("[v0] ResetPasswordPage component mounted")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    console.log("[v0] useEffect triggered - checking auth session")

    const handleAuthCallback = async () => {
      console.log("[v0] Creating Supabase client")
      const supabase = createClient()

      console.log("[v0] Calling supabase.auth.getSession()")
      const { data, error } = await supabase.auth.getSession()

      console.log("[v0] getSession response:", {
        hasSession: !!data.session,
        sessionId: data.session?.access_token?.substring(0, 20) + "...",
        error: error?.message,
      })

      if (error) {
        console.log("[v0] Session error detected:", error.message)
        setError("Invalid or expired reset link")
      } else if (data.session) {
        console.log("[v0] Valid session found - user can reset password")
      } else {
        console.log("[v0] No session found - may be invalid reset link")
        setError("Invalid or expired reset link")
      }
    }

    handleAuthCallback()
  }, [])

  const handleResetPassword = async (e: React.FormEvent) => {
    console.log("[v0] handleResetPassword triggered")
    e.preventDefault()

    console.log("[v0] Creating Supabase client for password update")
    const supabase = createClient()

    console.log("[v0] Setting loading state to true")
    setIsLoading(true)
    setError(null)

    console.log("[v0] Validating password match")
    if (password !== confirmPassword) {
      console.log("[v0] Password validation failed - passwords do not match")
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    console.log("[v0] Validating password length")
    if (password.length < 6) {
      console.log("[v0] Password validation failed - too short")
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    console.log("[v0] Password validation passed - calling updateUser")
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      })

      console.log("[v0] updateUser response:", {
        hasUser: !!data.user,
        userId: data.user?.id,
        error: error?.message,
      })

      if (error) {
        console.log("[v0] updateUser error:", error.message)
        throw error
      }

      console.log("[v0] Password update successful - setting success state")
      setSuccess(true)

      console.log("[v0] Setting redirect timer for 2 seconds")
      setTimeout(() => {
        console.log("[v0] Redirecting to login page")
        router.push("/auth/login")
      }, 2000)
    } catch (error: unknown) {
      console.log("[v0] Password update failed with error:", error)
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      console.log("[v0] Setting loading state to false")
      setIsLoading(false)
    }
  }

  if (success) {
    console.log("[v0] Rendering success state")
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-balance">Password Updated</CardTitle>
                <CardDescription className="text-pretty">Your password has been successfully reset</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">Redirecting you to sign in...</p>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  console.log("[v0] Rendering reset password form")
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-balance">Set New Password</CardTitle>
              <CardDescription className="text-pretty">Enter your new password below</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter new password"
                    required
                    value={password}
                    onChange={(e) => {
                      console.log("[v0] Password field updated")
                      setPassword(e.target.value)
                    }}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    required
                    value={confirmPassword}
                    onChange={(e) => {
                      console.log("[v0] Confirm password field updated")
                      setConfirmPassword(e.target.value)
                    }}
                    className="w-full"
                  />
                </div>
                {error && (
                  <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
                    {error}
                  </div>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Password"}
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
