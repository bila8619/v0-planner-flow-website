import type { Metadata } from "next"
import { DashboardClient } from "./dashboard-client"

export const metadata: Metadata = {
  title: "Dashboard - PlannerFlow",
  description: "Manage your PlannerFlow subscription and access your templates",
}

export default function DashboardPage() {
  return <DashboardClient />
}
