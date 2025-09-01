import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  try {
    const userPromise = supabase.auth.getUser()
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Server session timeout")), 5000),
    )

    const {
      data: { user },
      error,
    } = (await Promise.race([userPromise, timeoutPromise])) as any

    if (error && !error.message.includes("timeout")) {
      console.error("Server auth error:", error)
    }

    if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
      const url = request.nextUrl.clone()
      url.pathname = "/auth/login"
      return NextResponse.redirect(url)
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes("timeout")) {
      console.warn("Server session check timed out, allowing request to continue")
    } else {
      console.error("Middleware error:", error)
    }
  }

  return supabaseResponse
}
