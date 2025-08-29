import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Target, BarChart3, Cloud, Palette, Smartphone } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      title: "45+ Interactive Templates",
      description:
        "From daily planners to life goals, we have templates for every planning need. Each template is fully interactive with smart features.",
      icon: <FileText className="w-8 h-8 text-red-500" />,
    },
    {
      title: "Goal Tracking",
      description:
        "Set, track, and achieve your goals with our advanced progress tracking system. Visual progress bars and milestone celebrations.",
      icon: <Target className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Progress Analytics",
      description:
        "Understand your productivity patterns with detailed analytics and insights. Make data-driven decisions about your planning.",
      icon: <BarChart3 className="w-8 h-8 text-green-500" />,
    },
    {
      title: "Auto-Save & Sync",
      description:
        "Never lose your progress. All your planning data is automatically saved and synced across all your devices.",
      icon: <Cloud className="w-8 h-8 text-purple-500" />,
    },
    {
      title: "Customizable Design",
      description:
        "Personalize your planning experience with custom themes, colors, and layouts that match your style.",
      icon: <Palette className="w-8 h-8 text-orange-500" />,
    },
    {
      title: "Mobile Responsive",
      description: "Plan anywhere, anytime. Our templates work perfectly on desktop, tablet, and mobile devices.",
      icon: <Smartphone className="w-8 h-8 text-teal-500" />,
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Everything You Need to Plan Better</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Comprehensive digital planning tools designed for modern productivity
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
