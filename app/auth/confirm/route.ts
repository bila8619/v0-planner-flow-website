import type { EmailOtpType } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get("token_hash")
  const type = searchParams.get("type") as EmailOtpType | null
  const next = searchParams.get("next") ?? "/auth/reset-password"

  console.log("[v0] Auth confirm endpoint called:", { token_hash: !!token_hash, type, next })

  const response = NextResponse.redirect(new URL(next, request.url))

  if (token_hash && type) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            response.cookies.set({ name, value, ...options })
          },
          remove(name: string, options: any) {
            response.cookies.delete({ name, ...options })
          },
        },
      },
    )

    console.log("[v0] Verifying OTP with token_hash")
    const { error } = await supabase.auth.verifyOtp({ type, token_hash })

    if (!error) {
      console.log("[v0] OTP verification successful")
      return response
    } else {
      console.log("[v0] OTP verification failed:", error.message)
      return NextResponse.redirect(new URL("/auth/error", request.url))
    }
  }

  console.log("[v0] Missing token_hash or type")
  return NextResponse.redirect(new URL("/auth/error", request.url))
}
