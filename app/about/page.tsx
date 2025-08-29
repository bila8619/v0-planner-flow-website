import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About PlannerFlow - Digital Planning Suite for Modern Productivity",
  description:
    "Learn about PlannerFlow's mission to simplify digital planning with beautiful, interactive templates. Our vision, values, and commitment to productivity.",
  keywords:
    "about plannerflow, digital planning company, productivity tools, planning software, goal tracking platform",
  openGraph: {
    title: "About PlannerFlow - Digital Planning Suite",
    description: "Empowering individuals to align their goals with their values through seamless digital planning.",
    url: "https://plannerflow.shop/about",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-balance mb-6">About PlannerFlow</h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Empowering individuals to align their goals with their values through seamless digital planning
              </p>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <CardTitle className="text-2xl text-card-foreground">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    PlannerFlow empowers individuals to align their goals with their values, providing a seamless and
                    professional platform for intentional planning and personal growth.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <CardTitle className="text-2xl text-card-foreground">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Our mission is to simplify digital planning by offering beautiful, interactive, and practical
                    templates that help people create, focus, and repeat their way to success.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Company Background */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
              <div className="space-y-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    Founded in 2024, PlannerFlow emerged from a simple observation: traditional planning methods weren't
                    keeping up with the demands of modern life. Our founders, productivity enthusiasts and digital
                    natives, recognized the need for planning tools that could adapt to different methodologies, life
                    stages, and personal preferences.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    What started as a personal project to create better digital planning templates quickly evolved into
                    a comprehensive suite of 45+ interactive templates. Each template is carefully crafted based on
                    proven productivity frameworks and real user feedback, ensuring that every feature serves a genuine
                    need.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Today, PlannerFlow serves thousands of users worldwide, from busy parents managing family schedules
                    to executives planning quarterly objectives. Our commitment remains the same: providing tools that
                    help people create meaningful plans, maintain focus on what matters, and build sustainable habits
                    for long-term success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Quality First</h3>
                  <p className="text-muted-foreground">
                    Every template is meticulously designed and tested to ensure it delivers real value to our users.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">User-Centered</h3>
                  <p className="text-muted-foreground">
                    We listen to our community and continuously improve based on real user needs and feedback.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                  <p className="text-muted-foreground">
                    We constantly explore new ways to make planning more effective, intuitive, and enjoyable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
