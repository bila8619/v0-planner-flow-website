import type { EmailOtpType } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get("token_hash")
  const code = searchParams.get("code")
  const type = searchParams.get("type") as EmailOtpType | null
  const next = searchParams.get("next") ?? "/auth/update-password"

  const siteUrl = "https://plannerflow.shop"
  const redirectTo = new URL(next, siteUrl)
  const errorRedirect = new URL("/auth/error", siteUrl)

  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch (e) {
            console.error("Cookie set error:", e)
          }
        },
      },
    },
  )

  try {
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (!error) return NextResponse.redirect(redirectTo)
      console.error("exchangeCodeForSession error:", error)
    } else if (token_hash && type) {
      const { error } = await supabase.auth.verifyOtp({ type, token_hash })
      if (!error) return NextResponse.redirect(redirectTo)
      console.error("verifyOtp error:", error)
    }
  } catch (err) {
    console.error("Auth confirm error:", err)
  }

  return NextResponse.redirect(errorRedirect)
}
