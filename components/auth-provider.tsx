"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface UserProfile {
  id: string
  email: string
  subscription_plan: "free" | "essential" | "complete" | "pro" | "family"
  subscription_status: "active" | "cancelled" | "expired"
  templates_accessed: number
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  refreshProfile: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchProfile = async (userId: string) => {
    try {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single()

      if (profileError) {
        console.error("Profile fetch error:", profileError)
        return null
      }

      return profile
    } catch (error) {
      console.error("Error fetching user profile:", error)
      return null
    }
  }

  const refreshProfile = async () => {
    if (user) {
      const profile = await fetchProfile(user.id)
      setUserProfile(profile)
    }
  }

  const clearAuthState = () => {
    console.log("[v0] Clearing auth state")
    setUser(null)
    setUserProfile(null)
  }

  useEffect(() => {
    const getInitialData = async () => {
      try {
        console.log("[v0] Getting initial auth data")

        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession()

        let session = currentSession

        // Only refresh if there's an existing session
        if (currentSession) {
          console.log("[v0] Refreshing existing session")
          const {
            data: { session: refreshedSession },
            error: refreshError,
          } = await supabase.auth.refreshSession()

          if (refreshError) {
            console.error("Session refresh error:", refreshError)
            // Fall back to current session if refresh fails
            session = currentSession
          } else {
            session = refreshedSession
          }
        }

        if (session?.user) {
          console.log("[v0] User session found:", session.user.email)
          setUser(session.user)
          const profile = await fetchProfile(session.user.id)
          setUserProfile(profile)
        } else {
          console.log("[v0] No user session found")
          clearAuthState()
        }
      } catch (error) {
        console.error("Error fetching initial auth data:", error)
        clearAuthState()
      } finally {
        setLoading(false)
      }
    }

    getInitialData()

    const authStateChange = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[v0] Auth state change:", event, session?.user?.email || "no user")

      if (session?.user) {
        setUser(session.user)
        const profile = await fetchProfile(session.user.id)
        setUserProfile(profile)
      } else {
        clearAuthState()
      }
      setLoading(false)
    })

    return () => {
      authStateChange?.data?.subscription?.unsubscribe?.()
    }
  }, [])

  return <AuthContext.Provider value={{ user, userProfile, loading, refreshProfile }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
