import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

/**
 * Especially important if using Fluid compute: Don't put this client in a
 * global variable. Always create a new client within each function when using
 * it.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The "setAll" method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}

export function createClientForRoute(request: Request, response?: NextResponse) {
  const tempResponse = response || NextResponse.next()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get: (name: string) => {
        if (request instanceof Request) {
          const cookies = request.headers.get("cookie")
          if (cookies) {
            const cookie = cookies.split(";").find((c) => c.trim().startsWith(`${name}=`))
            return cookie ? cookie.split("=")[1] : undefined
          }
        }
        return undefined
      },
      set: (name: string, value: string, options: any) => {
        tempResponse.cookies.set({ name, value, ...options })
      },
      remove: (name: string, options: any) => {
        tempResponse.cookies.delete({ name, ...options })
      },
    },
  })
}

export { createClient as createServerClient }
