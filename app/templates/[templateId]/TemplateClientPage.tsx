"use client"

import { useEffect } from "react"
import { InteractiveTemplate } from "@/components/interactive-template"
import { templateCategories } from "@/lib/template-data"
import { notFound } from "next/navigation"

interface TemplatePageProps {
  params: {
    templateId: string
  }
}

export default function TemplateClientPage({ params }: TemplatePageProps) {
  // Find the template across all categories
  let foundTemplate = null
  let categoryName = ""

  for (const [key, category] of Object.entries(templateCategories)) {
    const template = category.templates.find((t) => t.id === params.templateId)
    if (template) {
      foundTemplate = template
      categoryName = category.name
      break
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [params.templateId])

  if (!foundTemplate) {
    notFound()
  }

  return (
    <InteractiveTemplate
      templateId={params.templateId}
      templateName={foundTemplate.name}
      templateDescription={foundTemplate.description}
    />
  )
}
