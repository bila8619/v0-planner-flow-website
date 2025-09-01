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
  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        {
          error: "Server configuration error - missing environment variables",
        },
        { status: 500, headers: corsHeaders },
      )
    }

    const { token_hash, type, password } = await request.json()

    if (!token_hash || !type || !password) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400, headers: corsHeaders })
    }

    if (type !== "recovery") {
      return NextResponse.json({ error: "Invalid reset type" }, { status: 400, headers: corsHeaders })
    }

    const supabase = createServiceClient()

    // Verify the OTP token
    const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
      token_hash,
      type: "recovery",
    })

    if (verifyError || !verifyData.session) {
      return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400, headers: corsHeaders })
    }

    // Update the user's password
    const { data: updateData, error: updateError } = await supabase.auth.updateUser({
      password,
    })

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400, headers: corsHeaders })
    }

    // Sign out user after password reset
    const { error: signOutError } = await supabase.auth.signOut()

    if (signOutError) {
      // Don't fail the request if sign out fails, password was still updated
    }

    return NextResponse.json({ success: true }, { headers: corsHeaders })
  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: corsHeaders })
  }
}

export async function GET() {
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
