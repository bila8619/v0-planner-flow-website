import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get("token_hash")
  const type = searchParams.get("type")
  const next = searchParams.get("next") ?? "/auth/reset-password"

  if (!token_hash || type !== "recovery") {
    return NextResponse.redirect(new URL("/auth/reset-password?error=missing_params", request.url))
  }

  // prepare response object
  const redirectUrl = new URL(next, request.url)
  const response = NextResponse.redirect(redirectUrl)

  // supabase server client with cookie persistence
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, {
              ...options,
              secure: true, // force secure cookies
              sameSite: "lax", // allow cross-site redirect
              path: "/", // ensure cookie applies everywhere
            })
          })
        },
      },
    },
  )

  // verify recovery token → establish session
  const { data, error } = await supabase.auth.verifyOtp({
    type: "recovery",
    token_hash,
  })

  if (error || !data?.session) {
    console.error("[auth/confirm] verifyOtp failed:", error?.message)
    return NextResponse.redirect(new URL("/auth/reset-password?error=invalid_token", request.url))
  }

  const { error: sessionError } = await supabase.auth.setSession({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
  })

  if (sessionError) {
    console.error("[auth/confirm] setSession failed:", sessionError.message)
    return NextResponse.redirect(new URL("/auth/reset-password?error=session_failed", request.url))
  }

  console.log("[auth/confirm] Session established for user:", data.session.user.id)

  // return redirect WITH cookies attached
  return response
}
