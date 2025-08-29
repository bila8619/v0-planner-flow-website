"use client"

import { useEffect, useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Lock, CheckCircle, Star, Users, ClipboardCheck } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { getUserProfile, getTemplateAccess, PLAN_TEMPLATE_LIMITS, type UserProfile } from "@/lib/supabase/auth"
import { templateCategories } from "@/lib/template-data"
import type { User } from "@supabase/supabase-js"

export function DashboardClient() {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const templateStats = useMemo(() => {
    const totalTemplates = Object.values(templateCategories).reduce(
      (total, category) => total + category.templates.length,
      0,
    )
    return { totalTemplates }
  }, [])

  const dashboardData = useMemo(() => {
    if (!userProfile) return null

    const userLimit = PLAN_TEMPLATE_LIMITS[userProfile.subscription_plan]
    const accessibleTemplates = Math.min(userLimit, templateStats.totalTemplates)
    const progressPercentage = (accessibleTemplates / templateStats.totalTemplates) * 100

    const planInfo = {
      free: { name: "Free Plan", color: "bg-gray-500", description: "Basic access to get started" },
      essential: { name: "Essential Plan", color: "bg-blue-500", description: "Perfect for individuals" },
      complete: { name: "Complete Plan", color: "bg-green-500", description: "Comprehensive planning tools" },
      pro: { name: "Pro Plan", color: "bg-purple-500", description: "Advanced features for professionals" },
      family: { name: "Family Plan", color: "bg-orange-500", description: "Shared planning for families" },
    }

    return {
      userLimit,
      accessibleTemplates,
      progressPercentage,
      currentPlan: planInfo[userProfile.subscription_plan],
    }
  }, [userProfile, templateStats.totalTemplates])

  useEffect(() => {
    const supabase = createClient()

    const getInitialData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (user) {
          setUser(user)
          const profile = await getUserProfile(user, true)
          setUserProfile(profile)
          console.log("[v0] Dashboard loaded with profile:", profile?.subscription_plan)
        }
      } catch (error) {
        console.error("[v0] Dashboard loading error:", error)
      } finally {
        setLoading(false)
      }
    }

    getInitialData()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user)
        const profile = await getUserProfile(session.user, true)
        setUserProfile(profile)
        console.log("[v0] Auth state change - profile updated:", profile?.subscription_plan)
      } else {
        setUser(null)
        setUserProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [refreshTrigger]) // Added refreshTrigger dependency to force re-fetch

  const refreshProfile = async () => {
    if (user) {
      setLoading(true)
      const profile = await getUserProfile(user, true)
      setUserProfile(profile)
      setRefreshTrigger((prev) => prev + 1)
      setLoading(false)
      console.log("[v0] Manual profile refresh:", profile?.subscription_plan)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-32 mx-auto"></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!user || !userProfile || !dashboardData) {
    return (
      <>
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Please Sign In</h1>
            <p className="text-muted-foreground mb-6">You need to be signed in to access your dashboard.</p>
            <Link href="/auth/login">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Sign In</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const { userLimit, accessibleTemplates, progressPercentage, currentPlan } = dashboardData

  return (
    <>
      <Header />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user.email}!</h1>
          <p className="text-muted-foreground">Here's your planning dashboard overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                Current Plan
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={refreshProfile}
                  className="h-6 w-6 p-0"
                  title="Refresh subscription status"
                >
                  🔄
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={`${currentPlan.color} text-white mb-2`}>{currentPlan.name}</Badge>
              <p className="text-sm text-muted-foreground">{currentPlan.description}</p>
              {userProfile.subscription_plan !== "family" && (
                <Link href="/pricing" className="block mt-3">
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    {userProfile.subscription_plan === "free" ? "Upgrade Plan" : "View Higher Plans"}
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Template Access</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-2">
                {accessibleTemplates} / {templateStats.totalTemplates}
              </div>
              <Progress value={progressPercentage} className="mb-2" />
              <p className="text-sm text-muted-foreground">Templates available</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium capitalize">{userProfile.subscription_status}</span>
              </div>
              <p className="text-sm text-muted-foreground">Account in good standing</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Your Template Access</h2>

          {Object.entries(templateCategories).map(([categoryKey, category]) => {
            const categoryIcon =
              categoryKey === "demographic" ? Users : categoryKey === "methodology" ? ClipboardCheck : Star
            const IconComponent = categoryIcon

            return (
              <Card key={categoryKey}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-6 w-6 text-primary" />
                    <div>
                      <CardTitle className="text-xl">{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.templates.map((template, index) => {
                      const globalIndex =
                        Object.entries(templateCategories)
                          .slice(0, Object.keys(templateCategories).indexOf(categoryKey))
                          .reduce((acc, [, cat]) => acc + cat.templates.length, 0) + index

                      const isAccessible = getTemplateAccess(userProfile.subscription_plan, globalIndex)

                      return (
                        <div key={template.id} className="relative">
                          <Card
                            className={`transition-all duration-200 ${isAccessible ? "hover:shadow-md cursor-pointer" : "opacity-60"}`}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">{template.emoji}</span>
                                  <h3 className="font-medium text-sm">{template.name}</h3>
                                </div>
                                {isAccessible ? (
                                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                ) : (
                                  <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mb-3">{template.description}</p>
                              {isAccessible ? (
                                <Link href={`/templates/${template.id}`}>
                                  <Button size="sm" className="w-full">
                                    Open Template
                                  </Button>
                                </Link>
                              ) : (
                                <Button size="sm" variant="outline" className="w-full bg-transparent" disabled>
                                  Requires Upgrade
                                </Button>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              {userProfile.subscription_plan === "free" ? "Unlock More Templates" : "Upgrade Your Plan"}
            </CardTitle>
            <CardDescription>
              {userProfile.subscription_plan === "free"
                ? `You're currently on the Free plan with access to ${userLimit} templates. Upgrade to access all ${templateStats.totalTemplates} premium planning templates.`
                : userProfile.subscription_plan === "family"
                  ? `You have access to all ${templateStats.totalTemplates} templates! You're on our highest tier plan.`
                  : `You're on the ${currentPlan.name} with access to ${userLimit} templates. Upgrade to unlock even more features and templates.`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/pricing">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  {userProfile.subscription_plan === "free"
                    ? "View Pricing Plans"
                    : userProfile.subscription_plan === "family"
                      ? "View All Plans"
                      : "Upgrade Plan"}
                </Button>
              </Link>
              {userProfile.subscription_plan !== "free" && userProfile.subscription_plan !== "family" && (
                <Link href="/templates">
                  <Button variant="outline">Browse All Templates</Button>
                </Link>
              )}
            </div>
            {userProfile.subscription_plan === "free" && (
              <div className="mt-4 p-4 bg-background rounded-lg border">
                <h4 className="font-medium text-sm mb-2">Popular Upgrade Benefits:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Access to all {templateStats.totalTemplates} premium templates</li>
                  <li>• Advanced planning methodologies</li>
                  <li>• Priority customer support</li>
                  <li>• Regular template updates</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  )
}
