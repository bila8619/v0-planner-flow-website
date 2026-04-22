import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createServiceClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (!password || password.trim().length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long." }, { status: 400 })
    }

    // Get the user from the session cookie
    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      console.error("[API] No user in session:", userError)
      return NextResponse.json({ error: "Session expired. Please request a new reset link." }, { status: 401 })
    }

    // Use service role to update the password (bypasses session issues)
    const adminSupabase = createServiceClient()
    const { error } = await adminSupabase.auth.admin.updateUserById(user.id, { password })

    if (error) {
      console.error("[API] updateUserById error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error("Error in update-password API:", err)
    return NextResponse.json({ error: "Unexpected error occurred." }, { status: 500 })
  }
}
