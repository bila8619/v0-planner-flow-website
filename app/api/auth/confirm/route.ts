import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(req: Request) {
  const supabase = createClient()
  const url = new URL(req.url)

  const token_hash = url.searchParams.get("token_hash")
  const type = url.searchParams.get("type")

  console.log("[v0] Auth confirm API - token_hash:", token_hash ? "present" : "none", "type:", type)

  if (!token_hash || type !== "recovery") {
    console.log("[v0] Invalid request parameters")
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({ token_hash, type })

    console.log("[v0] VerifyOtp result:", session ? "success" : "failed", error ? `error: ${error.message}` : "")

    if (error) {
      console.log("[v0] Token verification failed:", error.message)
      return NextResponse.redirect(new URL("/auth/reset-password?error=invalid_token", req.url))
    }

    if (!session) {
      console.log("[v0] No session created from token")
      return NextResponse.redirect(new URL("/auth/reset-password?error=no_session", req.url))
    }

    console.log("[v0] Token verified successfully, redirecting to reset password page")
    return NextResponse.redirect(new URL("/auth/reset-password", req.url))
  } catch (err: any) {
    console.log("[v0] Auth confirm API error:", err.message)
    return NextResponse.redirect(new URL("/auth/reset-password?error=server_error", req.url))
  }
}
