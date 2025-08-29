import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Blog - Productivity Tips & Planning Insights | PlannerFlow",
  description:
    "Discover productivity tips, planning strategies, and insights from the PlannerFlow team. Learn about digital planning, focus techniques, and productivity frameworks.",
  keywords:
    "productivity blog, digital planning tips, focus techniques, planning strategies, productivity frameworks, time management",
  openGraph: {
    title: "PlannerFlow Blog - Productivity Tips & Planning Insights",
    description: "Insights, tips, and strategies for better planning and productivity.",
    url: "https://plannerflow.shop/blog",
  },
}

export default function BlogPage() {
  const blogPosts = [
    {
      id: "digital-planning-2025",
      title: "Why Digital Planning Outperforms Paper in 2025",
      excerpt:
        "Discover the compelling advantages of digital planning tools and why they're becoming essential for modern productivity.",
      author: "Sarah Chen",
      date: "January 15, 2025",
      readTime: "5 min read",
      category: "Productivity",
      comments: 24,
      image: "/digital-planning-workspace-with-tablet-and-stylus.png",
    },
    {
      id: "productivity-frameworks",
      title: "5 Productivity Frameworks That Actually Work",
      excerpt:
        "An in-depth analysis of the most effective productivity methodologies and how to implement them in your daily routine.",
      author: "Marcus Rodriguez",
      date: "January 10, 2025",
      readTime: "8 min read",
      category: "Frameworks",
      comments: 31,
      image: "/productivity-framework-diagram-with-charts-and-gra.png",
    },
    {
      id: "plannerflow-focus-study",
      title: "How PlannerFlow Users Increased Focus by 40%",
      excerpt:
        "Real user data reveals significant improvements in focus and productivity after implementing PlannerFlow templates.",
      author: "Dr. Emily Watson",
      date: "January 5, 2025",
      readTime: "6 min read",
      category: "Case Study",
      comments: 18,
      image: "/focus-and-concentration-study-with-brain-activity-.png",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-balance mb-6">PlannerFlow Blog</h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Insights, tips, and strategies for better planning and productivity
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {blogPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <Card className="border-border bg-card hover:shadow-lg transition-all duration-200 group cursor-pointer h-full">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {post.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{post.readTime}</span>
                      </div>
                      <CardTitle className="text-xl text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <span>By {post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                          {post.comments}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
