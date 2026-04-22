import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (!password || password.trim().length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long." }, { status: 400 })
    }

    const supabase = await createClient()

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      console.error("[API] updateUser error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error("Error in update-password API:", err)
    return NextResponse.json({ error: "Unexpected error occurred." }, { status: 500 })
  }
}
