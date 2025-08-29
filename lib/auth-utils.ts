export const PLAN_TEMPLATE_LIMITS = {
  free: 5,
  essential: 15,
  complete: 30,
  pro: 45,
  family: 45,
} as const

export function getTemplateAccess(plan: string, templateIndex: number): boolean {
  const limit = PLAN_TEMPLATE_LIMITS[plan as keyof typeof PLAN_TEMPLATE_LIMITS] || 5
  return templateIndex < limit
}
