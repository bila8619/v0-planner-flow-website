import type { EmailOtpType } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  console.log("[v0] Auth confirm route called")
  console.log("[v0] Request URL:", request.url)

  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get("token_hash")
  const type = searchParams.get("type") as EmailOtpType | null
  const next = searchParams.get("next") ?? "/auth/reset-password"

  console.log("[v0] URL parameters received:", {
    token_hash: token_hash ? `${token_hash.substring(0, 10)}...` : null,
    type,
    next,
  })

  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next

  if (token_hash && type) {
    console.log("[v0] Valid parameters found, creating Supabase client")

    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: "", ...options })
          },
        },
      },
    )

    console.log("[v0] Calling verifyOtp with:", { type, token_hash: token_hash ? "present" : "missing" })

    try {
      const { error, data } = await supabase.auth.verifyOtp({
        type,
        token_hash,
      })

      console.log("[v0] verifyOtp response:", {
        error: error ? { message: error.message, status: error.status } : null,
        data: data ? { user: !!data.user, session: !!data.session } : null,
      })

      if (!error) {
        console.log("[v0] Token verification successful, redirecting to:", redirectTo.pathname)
        return NextResponse.redirect(redirectTo)
      } else {
        console.log("[v0] Token verification failed:", error.message)
      }
    } catch (err) {
      console.log("[v0] verifyOtp threw error:", err)
    }
  } else {
    console.log("[v0] Missing required parameters - token_hash or type")
  }

  console.log("[v0] Redirecting to error page")
  redirectTo.pathname = "/auth/error"
  return NextResponse.redirect(redirectTo)
}
