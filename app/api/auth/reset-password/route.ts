import { type NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return new Response(null, { status: 200, headers: corsHeaders })
}

export async function POST(request: NextRequest) {
  console.log("[v0] API Route: Environment check")
  console.log("[v0] API Route: NODE_ENV:", process.env.NODE_ENV)
  console.log("[v0] API Route: SUPABASE_URL exists:", !!process.env.SUPABASE_URL)
  console.log("[v0] API Route: SUPABASE_SERVICE_ROLE_KEY exists:", !!process.env.SUPABASE_SERVICE_ROLE_KEY)

  try {
    console.log("[v0] Server: Reset password API called")
    console.log("[v0] Server: Request method:", request.method)
    console.log("[v0] Server: Request URL:", request.url)

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.log("[v0] Server: Missing environment variables")
      return NextResponse.json(
        {
          error: "Server configuration error - missing environment variables",
        },
        { status: 500, headers: corsHeaders },
      )
    }

    const { token_hash, type, password } = await request.json()

    console.log("[v0] Server: Received parameters:", {
      token_hash: token_hash ? `${token_hash.substring(0, 10)}...` : null,
      type,
      password: password ? "[REDACTED]" : null,
    })

    if (!token_hash || !type || !password) {
      console.log("[v0] Server: Missing required parameters")
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400, headers: corsHeaders })
    }

    if (type !== "recovery") {
      console.log("[v0] Server: Invalid type parameter")
      return NextResponse.json({ error: "Invalid reset type" }, { status: 400, headers: corsHeaders })
    }

    const supabase = createServiceClient()
    console.log("[v0] Server: Created Supabase service client")
    console.log("[v0] Server: Client auth object exists:", !!supabase.auth)

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
      return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400, headers: corsHeaders })
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
      return NextResponse.json({ error: updateError.message }, { status: 400, headers: corsHeaders })
    }

    console.log("[v0] Server: Password reset successful")
    return NextResponse.json({ success: true }, { headers: corsHeaders })
  } catch (error) {
    console.log("[v0] Server: Unexpected error:", error)
    console.log("[v0] Server: Error stack:", error instanceof Error ? error.stack : "No stack trace")
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: corsHeaders })
  }
}

export async function GET() {
  console.log("[v0] API Route: GET request received - route is accessible")
  return NextResponse.json(
    {
      message: "Password reset API is accessible",
      timestamp: new Date().toISOString(),
      env: {
        hasSupabaseUrl: !!process.env.SUPABASE_URL,
        hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
    },
    { headers: corsHeaders },
  )
}
