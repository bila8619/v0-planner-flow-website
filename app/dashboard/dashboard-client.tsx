"use client"

import { useEffect, useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Lock, CheckCircle, Star, Users, ClipboardCheck, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { getTemplateAccess, PLAN_TEMPLATE_LIMITS } from "@/lib/supabase/auth"
import { templateCategories } from "@/lib/template-data"

export function DashboardClient() {
  const { user, userProfile, loading: authLoading, refreshProfile } = useAuth()
  const [loadingTimeout, setLoadingTimeout] = useState(false)

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
    const timeout = setTimeout(() => {
      if (authLoading) {
        setLoadingTimeout(true)
      }
    }, 10000) // 10 second timeout

    return () => clearTimeout(timeout)
  }, [authLoading])

  useEffect(() => {
    if (!authLoading) {
      setLoadingTimeout(false)
    }
  }, [authLoading])

  if (loadingTimeout) {
    return (
      <>
        <Header />
        <div className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-6 max-w-md mx-auto px-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Loading Taking Too Long?</h1>
              <p className="text-muted-foreground text-lg">
                There might be a connection issue. Try refreshing the page.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => window.location.reload()} size="lg" className="bg-primary hover:bg-primary/90">
                Refresh Page
              </Button>
              <Link href="/auth/login">
                <Button variant="outline" size="lg">
                  Sign In Again
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (authLoading) {
    return (
      <>
        <Header />
        <div className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-8 max-w-md mx-auto px-4">
            <div className="relative">
              {/* Animated template icons */}
              <div className="flex justify-center items-center space-x-4 mb-8">
                <div className="animate-bounce delay-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ClipboardCheck className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="animate-bounce delay-150">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Star className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="animate-bounce delay-300">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Loading spinner */}
              <div className="relative mx-auto w-16 h-16 mb-6">
                <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground">Loading Dashboard</h2>
              <p className="text-muted-foreground">Preparing your planning templates...</p>
            </div>

            {/* Animated dots */}
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></div>
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
        <div className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-6 max-w-md mx-auto px-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Please Sign In</h1>
              <p className="text-muted-foreground text-lg">You need to be signed in to access your dashboard.</p>
            </div>
            <Link href="/auth/login">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                Sign In
              </Button>
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
      <div className="flex-1 container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        <div className="mb-8 md:mb-12">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-4xl font-bold text-foreground text-balance">
              Welcome back, {user.email?.split("@")[0]}!
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl">Here's your planning dashboard overview</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg md:text-xl flex items-center justify-between">
                Current Plan
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={refreshProfile}
                  className="h-8 w-8 p-0 hover:bg-muted rounded-full"
                  title="Refresh subscription status"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Badge
                className={`${currentPlan.color} text-white text-sm px-3 py-1 hover:opacity-90 transition-opacity`}
              >
                {currentPlan.name}
              </Badge>
              <p className="text-sm text-muted-foreground leading-relaxed">{currentPlan.description}</p>
              {userProfile.subscription_plan !== "family" && (
                <Link href="/pricing">
                  <Button size="sm" className="w-full bg-red-600 text-white hover:bg-red-600 hover:text-white">
                    Upgrade Plan
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg md:text-xl">Template Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-2xl md:text-3xl font-bold text-foreground">
                  {accessibleTemplates}{" "}
                  <span className="text-lg text-muted-foreground">/ {templateStats.totalTemplates}</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-sm text-muted-foreground">Templates available</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg md:text-xl">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <span className="text-sm font-medium capitalize block">{userProfile.subscription_status}</span>
                  <p className="text-xs text-muted-foreground">Account in good standing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8 md:space-y-12">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Your Template Access</h2>
            <p className="text-muted-foreground">Explore and use templates based on your current plan</p>
          </div>

          {Object.entries(templateCategories).map(([categoryKey, category]) => {
            const categoryIcon =
              categoryKey === "demographic" ? Users : categoryKey === "methodology" ? ClipboardCheck : Star
            const IconComponent = categoryIcon

            return (
              <Card key={categoryKey} className="border-0 shadow-sm">
                <CardHeader className="pb-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-xl md:text-2xl">{category.name}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {category.templates.map((template, index) => {
                      const globalIndex =
                        Object.entries(templateCategories)
                          .slice(0, Object.keys(templateCategories).indexOf(categoryKey))
                          .reduce((acc, [, cat]) => acc + cat.templates.length, 0) + index

                      const isAccessible = getTemplateAccess(userProfile.subscription_plan, globalIndex)

                      return (
                        <div key={template.id} className="relative">
                          <Card
                            className={`transition-all duration-200 border-0 ${
                              isAccessible
                                ? "hover:shadow-md cursor-pointer bg-background hover:bg-muted/30"
                                : "opacity-60 bg-muted/20"
                            }`}
                          >
                            <CardContent className="p-4 space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                  <span className="text-xl flex-shrink-0">{template.emoji}</span>
                                  <h3 className="font-medium text-sm leading-tight truncate">{template.name}</h3>
                                </div>
                                <div className="flex-shrink-0 ml-2">
                                  {isAccessible ? (
                                    <div className="p-1 bg-green-100 rounded-full">
                                      <CheckCircle className="h-3 w-3 text-green-600" />
                                    </div>
                                  ) : (
                                    <div className="p-1 bg-muted rounded-full">
                                      <Lock className="h-3 w-3 text-muted-foreground" />
                                    </div>
                                  )}
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                {template.description}
                              </p>
                              {isAccessible ? (
                                <Link href={`/templates/${template.id}`}>
                                  <Button
                                    size="sm"
                                    className="w-full text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
                                  >
                                    Open Template
                                  </Button>
                                </Link>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="w-full text-xs bg-transparent hover:bg-muted/50"
                                  disabled
                                >
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

        <Card className="mt-8 md:mt-12 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl md:text-2xl flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Star className="h-5 w-5 text-primary" />
              </div>
              {userProfile.subscription_plan === "free" ? "Unlock More Templates" : "Upgrade Your Plan"}
            </CardTitle>
            <CardDescription className="text-base leading-relaxed">
              {userProfile.subscription_plan === "free"
                ? `You're currently on the Free plan with access to ${userLimit} templates. Upgrade to access all ${templateStats.totalTemplates} premium planning templates.`
                : userProfile.subscription_plan === "family"
                  ? `You have access to all ${templateStats.totalTemplates} templates! You're on our highest tier plan.`
                  : `You're on the ${currentPlan.name} with access to ${userLimit} templates. Upgrade to unlock even more features and templates.`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/pricing">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
                  {userProfile.subscription_plan === "free"
                    ? "View Pricing Plans"
                    : userProfile.subscription_plan === "family"
                      ? "View All Plans"
                      : "Upgrade Plan"}
                </Button>
              </Link>
              {userProfile.subscription_plan !== "free" && userProfile.subscription_plan !== "family" && (
                <Link href="/templates">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent hover:bg-muted/50">
                    Browse All Templates
                  </Button>
                </Link>
              )}
            </div>
            {userProfile.subscription_plan === "free" && (
              <div className="p-4 md:p-6 bg-background/80 rounded-xl border border-primary/10">
                <h4 className="font-semibold text-base mb-3">Popular Upgrade Benefits:</h4>
                <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Access to all {templateStats.totalTemplates} premium templates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Advanced planning methodologies
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Priority customer support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Regular template updates
                  </li>
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
