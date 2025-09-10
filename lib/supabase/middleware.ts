import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables in middleware")
    return supabaseResponse
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
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
  })

  try {
    const userPromise = supabase.auth.getUser()
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Server session timeout")), 5000),
    )

    const {
      data: { user },
      error,
    } = (await Promise.race([userPromise, timeoutPromise])) as any

    if (error) {
      if (error.message?.includes("Auth session missing") || error.message?.includes("session")) {
        console.warn("Auth session missing, allowing request to continue")
      } else if (!error.message?.includes("timeout")) {
        console.error("Server auth error:", error.message || error)
      }
    }

    if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
      const url = request.nextUrl.clone()
      url.pathname = "/auth/login"
      return NextResponse.redirect(url)
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("timeout")) {
        console.warn("Server session check timed out, allowing request to continue")
      } else if (error.message.includes("Auth session missing")) {
        console.warn("Auth session missing in middleware, allowing request to continue")
      } else {
        console.error("Middleware error:", error.message)
      }
    } else {
      console.error("Unknown middleware error:", error)
    }
  }

  return supabaseResponse
}
