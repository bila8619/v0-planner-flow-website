"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { templateCategories } from "@/lib/template-data"
import { getTemplateAccess } from "@/lib/supabase/auth"
import { Lock } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"

export function TemplatesSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const { user, userProfile, loading } = useAuth()

  const filterOptions = [
    { id: "all", label: "All Templates", count: 45 },
    { id: "demographic", label: "Demographic", count: 15 },
    { id: "methodology", label: "Methodology", count: 15 },
    { id: "premium", label: "Premium Bonus", count: 15 },
  ]

  const filteredCategories =
    activeFilter === "all"
      ? templateCategories
      : { [activeFilter]: templateCategories[activeFilter as keyof typeof templateCategories] }

  const getGlobalTemplateIndex = (categoryKey: string, templateIndex: number): number => {
    return (
      Object.entries(templateCategories)
        .slice(0, Object.keys(templateCategories).indexOf(categoryKey))
        .reduce((acc, [, cat]) => acc + cat.templates.length, 0) + templateIndex
    )
  }

  const getIcon = (iconName: string) => {
    const iconClass = "w-8 h-8 text-primary"
    const strokeProps = { strokeLinecap: "round" as const, strokeLinejoin: "round" as const, strokeWidth: 2 }

    switch (iconName) {
      case "users":
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              {...strokeProps}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 002-2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 8l2 2 4-4"
            />
          </svg>
        )
      case "clipboard-check":
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              {...strokeProps}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        )
      case "star":
        return (
          <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              {...strokeProps}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        )
      default:
        return null
    }
  }

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-64 mx-auto"></div>
              <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="h-8 w-8 bg-muted rounded"></div>
                      <div className="h-5 bg-muted rounded w-32"></div>
                    </div>
                    <div className="h-5 bg-muted rounded w-16"></div>
                  </div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-24"></div>
                    <div className="space-y-1">
                      <div className="h-3 bg-muted rounded w-full"></div>
                      <div className="h-3 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-5/6"></div>
                    </div>
                    <div className="h-9 bg-muted rounded w-full mt-4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">45+ Interactive Templates</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Choose from our comprehensive collection of planning templates, each designed for specific needs and
            methodologies
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterOptions.map((option) => (
            <Button
              key={option.id}
              onClick={() => setActiveFilter(option.id)}
              variant={activeFilter === option.id ? "default" : "outline"}
              className={`transition-all duration-200 ${
                activeFilter === option.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {option.label}
              <span className="ml-2 text-xs opacity-75">({option.count})</span>
            </Button>
          ))}
        </div>

        {Object.entries(filteredCategories).map(([key, category]) => (
          <div key={key} className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              {getIcon(category.icon)}
              <div>
                <h3 className="text-2xl font-bold text-foreground">{category.name}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.templates.map((template, index) => {
                const globalIndex = getGlobalTemplateIndex(key, index)
                const userPlan = userProfile?.subscription_plan || "free"
                const hasAccess = getTemplateAccess(userPlan, globalIndex)
                const isLocked = !hasAccess

                return (
                  <Card
                    key={template.id}
                    className={`border-border bg-card transition-all duration-200 group hover:shadow-lg cursor-pointer relative ${
                      isLocked ? "opacity-75" : ""
                    }`}
                  >
                    {isLocked && (
                      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                        <div className="text-center p-6">
                          <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <h4 className="font-semibold text-foreground mb-2">Template Locked</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            {user ? "Upgrade your plan to access this template" : "Sign in to access templates"}
                          </p>
                          {user ? (
                            <Link href="/pricing">
                              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                Upgrade Plan
                              </Button>
                            </Link>
                          ) : (
                            <Link href="/auth/login">
                              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                Sign In
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    )}

                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col items-start gap-2">
                          <div className="text-3xl">{template.emoji}</div>
                          <CardTitle className="text-lg text-card-foreground group-hover:text-primary transition-colors">
                            {template.name}
                          </CardTitle>
                        </div>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            hasAccess ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {hasAccess ? "Available" : "Locked"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-card-foreground">Key Features:</h4>
                        <ul className="space-y-1">
                          {template.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {hasAccess ? (
                        <Link href={`/templates/${template.id}`}>
                          <Button
                            variant="outline"
                            className="w-full hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent cursor-pointer"
                          >
                            Try Template
                          </Button>
                        </Link>
                      ) : (
                        <Link href={user ? "/pricing" : "/auth/login"}>
                          <Button
                            variant="outline"
                            className="w-full hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent cursor-pointer"
                          >
                            {user ? "Upgrade to Access" : "Sign In to Access"}
                          </Button>
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
