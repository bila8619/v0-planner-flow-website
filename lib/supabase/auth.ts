"use client"

import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

export interface UserProfile {
  id: string
  email: string
  subscription_plan: "free" | "essential" | "complete" | "pro" | "family"
  subscription_status: "active" | "cancelled" | "expired"
  created_at: string
  updated_at: string
  stripe_customer_id?: string
}

export const PLAN_TEMPLATE_LIMITS = {
  free: 5,
  essential: 25, // Updated from 15 to 25 templates for Essential plan
  complete: 45, // Updated from 30 to 45 templates for Complete plan
  pro: 45, // Pro gets all templates
  family: 45, // Family gets all templates
} as const

const profileCache: { [userId: string]: { profile: UserProfile | null; timestamp: number } } = {}
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export function clearProfileCache(userId?: string) {
  if (userId) {
    delete profileCache[userId]
  } else {
    // Clear entire cache
    Object.keys(profileCache).forEach((key) => delete profileCache[key])
  }
}

export async function getUserProfile(user: User, forceRefresh = false): Promise<UserProfile | null> {
  if (forceRefresh) {
    clearProfileCache(user.id)
  }

  // Check cache first to avoid unnecessary database calls
  const cached = profileCache[user.id]
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION && !forceRefresh) {
    console.log("[v0] Using cached profile:", cached.profile?.subscription_plan)
    return cached.profile
  }

  const supabase = createClient()
  const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (error) {
    console.error("[v0] Error fetching user profile:", error)
    return null
  }

  console.log("[v0] Fresh profile from database:", {
    plan: data?.subscription_plan,
    status: data?.subscription_status,
    stripe_customer_id: data?.stripe_customer_id,
  })

  // Cache the result
  profileCache[user.id] = { profile: data, timestamp: Date.now() }
  return data
}

export function getTemplateAccess(plan: string, templateIndex: number): boolean {
  const limit = PLAN_TEMPLATE_LIMITS[plan as keyof typeof PLAN_TEMPLATE_LIMITS] || 5
  return templateIndex < limit
}

export async function canAccessTemplate(templateIndex: number): Promise<boolean> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return false

  const profile = await getUserProfile(user)
  if (!profile) return false

  return getTemplateAccess(profile.subscription_plan, templateIndex)
}
