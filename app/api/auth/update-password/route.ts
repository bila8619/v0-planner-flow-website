import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { password, user_id } = await request.json()

    if (!password || password.trim().length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long." }, { status: 400 })
    }

    if (!user_id) {
      return NextResponse.json({ error: "Missing user ID." }, { status: 400 })
    }

    const adminSupabase = createServiceClient()
    const { error } = await adminSupabase.auth.admin.updateUserById(user_id, { password })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unexpected error occurred." }, { status: 500 })
  }
}
