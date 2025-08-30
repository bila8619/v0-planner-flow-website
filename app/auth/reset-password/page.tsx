"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isValidSession, setIsValidSession] = useState(false)
  const [isCheckingSession, setIsCheckingSession] = useState(true)

  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isCheckingSession) {
        console.log("[v0] Verification timeout - forcing error state")
        setError("Verification timed out. Please request a new reset link.")
        setIsCheckingSession(false)
      }
    }, 10000) // 10 second timeout

    const handleAuthCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get("code")
        const error_param = urlParams.get("error")
        const error_code = urlParams.get("error_code")

        console.log("[v0] Reset password callback - code:", code, "error:", error_param, "error_code:", error_code)
        console.log("[v0] Full URL:", window.location.href)

        // Handle URL errors first
        if (error_param) {
          console.log("[v0] URL contains error parameters")
          if (error_code === "otp_expired") {
            setError("Reset link has expired. Please request a new one.")
          } else {
            setError("Invalid reset link. Please request a new one.")
          }
          clearTimeout(timeoutId)
          setIsCheckingSession(false)
          return
        }

        if (code) {
          console.log("[v0] Using PKCE flow with code:", code)

          let retryCount = 0
          const maxRetries = 3

          while (retryCount < maxRetries) {
            try {
              const { data, error: sessionError } = await supabase.auth.exchangeCodeForSession(code)

              console.log(`[v0] exchangeCodeForSession attempt ${retryCount + 1}:`, {
                data: !!data.session,
                error: sessionError?.message,
              })

              if (sessionError) {
                if (retryCount === maxRetries - 1) {
                  console.error("[v0] Final exchangeCodeForSession error:", sessionError)
                  setError("Invalid or expired reset link. Please request a new one.")
                  break
                }
                retryCount++
                await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait 1 second before retry
                continue
              }

              if (data.session) {
                console.log("[v0] PKCE session established successfully")
                setIsValidSession(true)
                // Clean up URL
                window.history.replaceState({}, document.title, window.location.pathname)
                break
              } else {
                console.log("[v0] No session returned from exchangeCodeForSession")
                setError("Unable to establish session. Please request a new reset link.")
                break
              }
            } catch (err) {
              console.error(`[v0] exchangeCodeForSession attempt ${retryCount + 1} failed:`, err)
              if (retryCount === maxRetries - 1) {
                setError("Network error. Please check your connection and try again.")
                break
              }
              retryCount++
              await new Promise((resolve) => setTimeout(resolve, 1000))
            }
          }
        } else {
          console.log("[v0] No code parameter, checking hash-based tokens")
          const hashParams = new URLSearchParams(window.location.hash.substring(1))
          const accessToken = hashParams.get("access_token")
          const refreshToken = hashParams.get("refresh_token")
          const hashError = hashParams.get("error")
          const hashErrorCode = hashParams.get("error_code")

          console.log(
            "[v0] Hash tokens - access_token:",
            !!accessToken,
            "refresh_token:",
            !!refreshToken,
            "error:",
            hashError,
          )

          if (hashError) {
            if (hashErrorCode === "otp_expired") {
              setError("Reset link has expired. Please request a new one.")
            } else {
              setError("Invalid reset link. Please request a new one.")
            }
          } else if (accessToken && refreshToken) {
            console.log("[v0] Using legacy hash-based flow")
            const { data, error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            })

            console.log("[v0] setSession result:", { data: !!data.session, error: sessionError })

            if (sessionError) {
              console.error("[v0] setSession error:", sessionError)
              setError("Invalid or expired reset link. Please request a new one.")
            } else if (data.session) {
              console.log("[v0] Legacy session established successfully")
              setIsValidSession(true)
              window.history.replaceState({}, document.title, window.location.pathname)
            } else {
              console.log("[v0] No session returned from setSession")
              setError("Unable to establish session. Please request a new reset link.")
            }
          } else {
            console.log("[v0] No tokens found, checking existing session")
            const {
              data: { session },
            } = await supabase.auth.getSession()

            console.log("[v0] Existing session check:", !!session)

            if (session) {
              setIsValidSession(true)
            } else {
              setError("Invalid or expired reset link. Please request a new one.")
            }
          }
        }
      } catch (err) {
        console.error("[v0] Reset password auth callback error:", err)
        setError("An error occurred processing the reset link. Please try again.")
      } finally {
        clearTimeout(timeoutId)
        setIsCheckingSession(false)
      }
    }

    handleAuthCallback()

    return () => clearTimeout(timeoutId)
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) {
        setError(error.message)
      } else {
        await supabase.auth.signOut()
        router.push("/auth/login?message=Password updated successfully. Please sign in with your new password.")
      }
    } catch (err) {
      console.error("[v0] Password update error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-6 md:p-10">
          <Card className="max-w-md w-full shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-sm text-muted-foreground">Verifying reset link...</p>
                <p className="mt-1 text-xs text-muted-foreground">This may take a few seconds</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  if (!isValidSession && error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-6 md:p-10">
          <Card className="max-w-md w-full shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-destructive">Invalid Reset Link</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <div className="mt-4 text-center">
                <Button onClick={() => router.push("/auth/forgot-password")} variant="outline">
                  Request New Reset Link
                </Button>
              </div>
            </CardContent>
          </Card>
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
              <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
                <Lock className="h-6 w-6" />
                Set New Password
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Choose a strong password for your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isLoading}
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

                {error && (
                  <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-11 bg-primary hover:bg-primary/90"
                  disabled={isLoading || !password || !confirmPassword}
                >
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
