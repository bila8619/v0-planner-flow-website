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

  useEffect(() => {
    const getInitialData = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          console.error("Session error:", sessionError)
          throw sessionError
        }

        if (session?.user) {
          setUser(session.user)
          const profile = await fetchProfile(session.user.id)
          setUserProfile(profile)
        } else {
          setUser(null)
          setUserProfile(null)
        }
      } catch (error) {
        console.error("Error fetching initial auth data:", error)
        setUser(null)
        setUserProfile(null)
      } finally {
        setLoading(false)
      }
    }

    getInitialData()

    const authStateChange = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user)
        const profile = await fetchProfile(session.user.id)
        setUserProfile(profile)
      } else {
        setUser(null)
        setUserProfile(null)
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
