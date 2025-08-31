import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  console.log("[v0] Auth confirm route called")
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get("token_hash")
  const type = searchParams.get("type")
  const next = searchParams.get("next") || "/auth/reset-password"

  console.log("[v0] Confirm params:", { token_hash: !!token_hash, type, next })

  if (token_hash && type) {
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

    console.log("[v0] Calling verifyOtp with token_hash")
    const { error } = await supabase.auth.verifyOtp({
      type: type as any,
      token_hash,
    })

    if (!error) {
      console.log("[v0] Token verified successfully, redirecting to:", next)
      return NextResponse.redirect(new URL(next, request.url))
    } else {
      console.log("[v0] Token verification failed:", error)
      return NextResponse.redirect(new URL("/auth/error", request.url))
    }
  }

  console.log("[v0] Missing token_hash or type, redirecting to error")
  return NextResponse.redirect(new URL("/auth/error", request.url))
}
