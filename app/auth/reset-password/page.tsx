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
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Eye, EyeOff, Check, AlertCircle } from "lucide-react"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const passwordRequirements = [
    { text: "At least 8 characters", met: password.length >= 8 },
    { text: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { text: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { text: "Contains number", met: /\d/.test(password) },
  ]

  useEffect(() => {
    const errorParam = searchParams.get("error")
    if (errorParam === "invalid_token") {
      setError("Invalid or expired reset link. Please request a new password reset.")
    } else if (errorParam === "missing_params") {
      setError("Invalid reset link format. Please request a new password reset.")
    }
  }, [searchParams])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (!passwordRequirements.every((req) => req.met)) {
      setError("Please meet all password requirements")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) {
        throw error
      }

      setSuccess(true)

      setTimeout(async () => {
        await supabase.auth.signOut()
        router.push("/auth/login?message=password_updated")
      }, 2000)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (error && searchParams.get("error")) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <Card className="shadow-lg text-center">
              <CardHeader className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">Invalid Reset Link</CardTitle>
                <CardDescription className="text-muted-foreground">{error}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/auth/forgot-password">
                  <Button className="w-full">Request New Reset Link</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <div className="flex-1 flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <Card className="shadow-lg text-center">
              <CardHeader className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">Password Updated!</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Your password has been successfully updated. Redirecting to sign in...
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <Card className="shadow-lg">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold text-foreground">Create New Password</CardTitle>
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
                      placeholder="Create a strong password"
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
                  {password && (
                    <div className="mt-2 space-y-1">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs">
                          <Check className={`h-3 w-3 ${req.met ? "text-green-500" : "text-muted-foreground"}`} />
                          <span className={req.met ? "text-green-600" : "text-muted-foreground"}>{req.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && !searchParams.get("error") && (
                  <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90" disabled={isLoading}>
                  {isLoading ? "Updating password..." : "Update Password"}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-center text-sm text-muted-foreground">
                  Remember your password?{" "}
                  <Link
                    href="/auth/login"
                    className="text-primary hover:text-primary/80 font-medium underline underline-offset-4"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
