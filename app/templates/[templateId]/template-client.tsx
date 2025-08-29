"use client"

import { useEffect, useState } from "react"
import { InteractiveTemplate } from "@/components/interactive-template"
import { templateCategories } from "@/lib/template-data"
import { useAuth } from "@/components/auth-provider"
import { getTemplateAccess } from "@/lib/auth-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import Link from "next/link"

interface TemplateClientProps {
  params: {
    templateId: string
  }
}

export default function TemplateClient({ params }: TemplateClientProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { user, userProfile, loading } = useAuth()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [params.templateId])

  let foundTemplate = null
  let categoryKey = ""
  let templateIndex = 0
  let globalIndex = 0

  for (const [key, category] of Object.entries(templateCategories)) {
    const template = category.templates.find((t, index) => {
      if (t.id === params.templateId) {
        templateIndex = index
        return true
      }
      return false
    })
    if (template) {
      foundTemplate = template
      categoryKey = key
      // Calculate global index based on category position
      const categoryOrder = ["demographic", "methodology", "premium"]
      const categoryIndex = categoryOrder.indexOf(key)
      globalIndex = categoryIndex * 15 + templateIndex
      break
    }
  }

  if (!foundTemplate) {
    notFound()
  }

  const userPlan = userProfile?.subscription_plan || "free"
  const hasAccess = getTemplateAccess(userPlan, globalIndex)

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading template...</p>
        </div>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Templates
          </Link>

          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-dashed border-muted-foreground/20">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-muted rounded-full w-fit">
                  <Lock className="h-8 w-8 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl mb-2">Template Access Required</CardTitle>
                <div className="text-muted-foreground space-y-2">
                  <p>This template requires a subscription to access.</p>
                  <div className="bg-muted/50 rounded-lg p-4 mt-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">{foundTemplate.emoji}</div>
                      <div>
                        <h3 className="font-semibold text-foreground">{foundTemplate.name}</h3>
                        <p className="text-sm text-muted-foreground">{foundTemplate.description}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-foreground">Features included:</h4>
                      <ul className="space-y-1">
                        {foundTemplate.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Current plan: <span className="font-medium capitalize">{userPlan}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Upgrade to access this template and unlock more features.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {!user ? (
                    <Link href="/auth/login">
                      <Button className="bg-primary hover:bg-primary/90">Sign In to Continue</Button>
                    </Link>
                  ) : (
                    <Link href="/pricing">
                      <Button className="bg-primary hover:bg-primary/90">Upgrade Plan</Button>
                    </Link>
                  )}
                  <Link href="/templates">
                    <Button variant="outline">Browse Free Templates</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <InteractiveTemplate
      templateId={params.templateId}
      templateName={foundTemplate.name}
      templateDescription={foundTemplate.description}
    />
  )
}
