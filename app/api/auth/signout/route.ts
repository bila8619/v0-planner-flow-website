import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST() {
  try {
    const supabase = await createServerClient()
    await supabase.auth.signOut()
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[signout] server error:", err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
