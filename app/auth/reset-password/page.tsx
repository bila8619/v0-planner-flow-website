"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Eye, EyeOff, CheckCircle } from "lucide-react"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const [tokenHash, setTokenHash] = useState<string | null>(null)
  const [tokenType, setTokenType] = useState<string | null>(null)

  useEffect(() => {
    console.log("[v0] Reset password page mounted")
    console.log("[v0] Current URL:", window.location.href)

    const token_hash = searchParams.get("token_hash")
    const type = searchParams.get("type")

    console.log("[v0] Extracted parameters:", {
      token_hash: token_hash ? `${token_hash.substring(0, 10)}...` : null,
      type,
    })

    if (!token_hash || !type) {
      console.log("[v0] Missing required URL parameters")
      setError("Invalid reset link. Missing required parameters.")
      return
    }

    if (type !== "recovery") {
      console.log("[v0] Invalid token type")
      setError("Invalid reset link. Incorrect token type.")
      return
    }

    setTokenHash(token_hash)
    setTokenType(type)
  }, [searchParams])

  useEffect(() => {
    if (isSuccess) {
      console.log("[v0] Password reset successful, setting redirect timer")
      const timer = setTimeout(() => {
        console.log("[v0] Redirecting to login page")
        router.push("/auth/login")
      }, 2000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [isSuccess, router])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Password reset form submitted")

    if (!password.trim()) {
      console.log("[v0] Password validation failed - empty password")
      setError("Please enter a password")
      return
    }

    if (!tokenHash || !tokenType) {
      console.log("[v0] Missing token parameters")
      setError("Invalid reset link. Please request a new password reset.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      console.log("[v0] Calling server-side reset password API...")
      console.log("[v0] Request URL:", "/api/auth/reset-password")
      console.log("[v0] Request method:", "POST")
      console.log("[v0] Request headers:", { "Content-Type": "application/json" })

      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token_hash: tokenHash,
          type: tokenType,
          password,
        }),
      })

      console.log("[v0] Fetch completed")
      console.log("[v0] Response status:", response.status)
      console.log("[v0] Response ok:", response.ok)
      console.log("[v0] Response headers:", Object.fromEntries(response.headers.entries()))

      const data = await response.json()

      console.log("[v0] Server API response:", {
        status: response.status,
        success: data.success,
        error: data.error,
      })

      if (!response.ok) {
        throw new Error(data.error || "Failed to reset password")
      }

      console.log("[v0] Password reset successful!")
      setIsSuccess(true)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred"
      console.log("[v0] Password reset error:", errorMessage)
      console.log("[v0] Error type:", typeof error)
      console.log("[v0] Error object:", error)
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (!tokenHash || !tokenType) {
    console.log("[v0] Rendering invalid token state")
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-red-600">Invalid Reset Link</CardTitle>
                <CardDescription>The password reset link is invalid or malformed.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild className="w-full">
                  <Link href="/auth/forgot-password">Request New Reset Link</Link>
                </Button>
                <Button variant="outline" asChild className="w-full bg-transparent">
                  <Link href="/auth/login">Back to Login</Link>
                </Button>
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
