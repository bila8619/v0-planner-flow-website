import { createBrowserClient } from "@supabase/ssr"

const noOpLock = async (name: string, acquireTimeout: number, fn: () => Promise<any>) => {
  return await fn()
}

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        lock: noOpLock,
      },
    }
  )
}
