import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token_hash = searchParams.get("token_hash")
    const type = searchParams.get("type")
    const next = searchParams.get("next") ?? "/auth/reset-password"

    if (!token_hash || type !== "recovery") {
      return NextResponse.redirect(
        new URL("/auth/reset-password?error=missing_params", request.url)
      )
    }

    // Prepare redirect response early
    const redirectUrl = new URL(next, request.url)
    const response = NextResponse.redirect(redirectUrl)

    // Create Supabase client that can persist cookies onto `response`
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: (cookies) => {
            cookies.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options)
            })
          },
        },
      }
    )

    // Verify recovery token & establish session
    const { data, error } = await supabase.auth.verifyOtp({
      type: "recovery",
      token_hash,
    })

    if (error || !data?.session) {
      console.error("[auth/confirm] Token verification failed:", error?.message)
      return NextResponse.redirect(
        new URL("/auth/reset-password?error=invalid_token", request.url)
      )
    }

    console.log("[auth/confirm] Recovery token verified, session established")
    return response
  } catch (err) {
    console.error("[auth/confirm] Unexpected error:", err)
    return NextResponse.redirect(
      new URL("/auth/reset-password?error=server_error", request.url)
    )
  }
}
