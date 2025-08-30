import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get("token_hash")
  const type = searchParams.get("type")
  const next = searchParams.get("next") ?? "/auth/reset-password"

  if (token_hash && type) {
    const supabase = createClient()

    const { error } = await supabase.auth.verifyOtp({
      type: type as any,
      token_hash,
    })

    if (!error) {
      // Redirect to reset password page on success
      return NextResponse.redirect(new URL(next, request.url))
    }
  }

  // Redirect to error page on failure
  return NextResponse.redirect(new URL("/auth/reset-password?error=invalid_link", request.url))
}
