import type { Metadata } from "next"
import { templateCategories } from "@/lib/template-data"
import TemplateClient from "./template-client"

interface TemplatePageProps {
  params: {
    templateId: string
  }
}

export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
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

  if (!foundTemplate) {
    return {
      title: "Template Not Found | PlannerFlow",
      description: "The requested template could not be found.",
    }
  }

  return {
    title: `${foundTemplate.name} - Interactive Template | PlannerFlow`,
    description: `${foundTemplate.description} Interactive digital planning template with auto-save, progress tracking, and smart features.`,
    keywords: `${foundTemplate.name.toLowerCase()}, digital planning template, interactive template, ${categoryName.toLowerCase()}`,
    openGraph: {
      title: `${foundTemplate.name} - PlannerFlow Template`,
      description: foundTemplate.description,
      url: `https://plannerflow.shop/templates/${params.templateId}`,
    },
  }
}

export default function TemplatePage({ params }: TemplatePageProps) {
  return <TemplateClient params={params} />
}

export async function generateStaticParams() {
  const params = []

  for (const category of Object.values(templateCategories)) {
    for (const template of category.templates) {
      params.push({
        templateId: template.id,
      })
    }
  }

  return params
}
