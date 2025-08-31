import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { token_hash, type, password } = await request.json()

    console.log("[v0] Server: Reset password API called")
    console.log("[v0] Server: Received parameters:", {
      token_hash: token_hash ? `${token_hash.substring(0, 10)}...` : null,
      type,
      password: password ? "[REDACTED]" : null,
    })

    if (!token_hash || !type || !password) {
      console.log("[v0] Server: Missing required parameters")
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    if (type !== "recovery") {
      console.log("[v0] Server: Invalid type parameter")
      return NextResponse.json({ error: "Invalid reset type" }, { status: 400 })
    }

    // Create server-side Supabase client
    const supabase = createClient()
    console.log("[v0] Server: Created Supabase client")

    // Verify the OTP token
    console.log("[v0] Server: Calling verifyOtp...")
    const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
      token_hash,
      type: "recovery",
    })

    console.log("[v0] Server: verifyOtp response:", {
      session: verifyData.session ? "Session created" : "No session",
      user: verifyData.user ? "User found" : "No user",
      error: verifyError ? verifyError.message : null,
    })

    if (verifyError || !verifyData.session) {
      console.log("[v0] Server: Token verification failed")
      return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 })
    }

    // Update the user's password
    console.log("[v0] Server: Calling updateUser...")
    const { data: updateData, error: updateError } = await supabase.auth.updateUser({
      password,
    })

    console.log("[v0] Server: updateUser response:", {
      user: updateData.user ? "User updated" : "No user",
      error: updateError ? updateError.message : null,
    })

    if (updateError) {
      console.log("[v0] Server: Password update failed")
      return NextResponse.json({ error: updateError.message }, { status: 400 })
    }

    console.log("[v0] Server: Password reset successful")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.log("[v0] Server: Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
