import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token_hash = searchParams.get("token_hash")
    const type = searchParams.get("type")
    const next = searchParams.get("next") ?? "/auth/reset-password"

    console.log("[v0] Confirm route - token_hash:", token_hash, "type:", type)

    if (!token_hash || !type) {
      console.log("[v0] Missing token_hash or type parameters")
      return NextResponse.redirect(new URL("/auth/reset-password?error=missing_params", request.url))
    }

    const supabase = await createClient()
    console.log("[v0] Supabase client created successfully")

    const { data, error } = await supabase.auth.exchangeCodeForSession(token_hash)

    console.log("[v0] ExchangeCodeForSession result - data:", data, "error:", error)

    if (!error && data?.session) {
      console.log("[v0] Token verification successful, redirecting to reset password page")
      return NextResponse.redirect(new URL(next, request.url))
    }

    console.log("[v0] Token verification failed:", error?.message)
    return NextResponse.redirect(new URL("/auth/reset-password?error=invalid_token", request.url))
  } catch (err) {
    console.error("[v0] API confirm route error:", err)
    return NextResponse.redirect(new URL("/auth/reset-password?error=server_error", request.url))
  }
}
