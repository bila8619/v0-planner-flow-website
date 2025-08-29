import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

const blogPosts = {
  "digital-planning-2025": {
    title: "Why Digital Planning Outperforms Paper in 2025",
    excerpt:
      "Discover the compelling advantages of digital planning tools and why they're becoming essential for modern productivity.",
    author: "Sarah Chen",
    date: "January 15, 2025",
    readTime: "5 min read",
    category: "Productivity",
    comments: 24,
    image: "/digital-planning-workspace-with-tablet-and-stylus.png",
    content: `
      <div class="space-y-8">
        <div class="prose-intro">
          <p class="text-xl leading-relaxed text-muted-foreground">In today's fast-paced digital world, the way we plan and organize our lives has evolved dramatically. While traditional paper planners have served us well for decades, digital planning tools are now proving to be superior in almost every aspect.</p>
        </div>
        
        <section class="space-y-6">
          <h2 class="text-3xl font-bold text-foreground border-b border-border pb-3">The Digital Advantage</h2>
          <p class="text-lg leading-relaxed text-muted-foreground">Digital planning offers unprecedented flexibility and functionality that paper simply cannot match. With features like real-time synchronization across devices, automated reminders, and interactive elements, digital planners have become indispensable tools for modern productivity.</p>
          
          <div class="space-y-8 mt-8">
            <div class="bg-card border border-border rounded-lg p-6">
              <h3 class="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                <span class="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Accessibility Everywhere
              </h3>
              <p class="text-muted-foreground leading-relaxed">Your digital planner is always with you. Whether you're on your phone, tablet, or computer, your plans and goals are instantly accessible. No more forgetting your planner at home or losing important notes.</p>
            </div>
            
            <div class="bg-card border border-border rounded-lg p-6">
              <h3 class="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                <span class="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Dynamic and Interactive
              </h3>
              <p class="text-muted-foreground leading-relaxed">Unlike static paper pages, digital planners can adapt to your needs. Interactive templates, progress tracking, and automated calculations make planning more engaging and effective.</p>
            </div>
            
            <div class="bg-card border border-border rounded-lg p-6">
              <h3 class="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                <span class="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">3</span>
                Environmental Impact
              </h3>
              <p class="text-muted-foreground leading-relaxed">By choosing digital planning, you're making an environmentally conscious decision. No paper waste, no need for multiple planners throughout the year, and a significantly reduced carbon footprint.</p>
            </div>
          </div>
        </section>
        
        <section class="space-y-6">
          <h2 class="text-3xl font-bold text-foreground border-b border-border pb-3">The Future is Digital</h2>
          <p class="text-lg leading-relaxed text-muted-foreground">As we move further into 2025, the gap between digital and paper planning continues to widen. Digital tools offer features that were unimaginable just a few years ago, making them the clear choice for anyone serious about productivity and organization.</p>
        </section>
      </div>
    `,
  },
  "productivity-frameworks": {
    title: "5 Productivity Frameworks That Actually Work",
    excerpt:
      "An in-depth analysis of the most effective productivity methodologies and how to implement them in your daily routine.",
    author: "Marcus Rodriguez",
    date: "January 10, 2025",
    readTime: "8 min read",
    category: "Frameworks",
    comments: 31,
    image: "/productivity-framework-diagram-with-charts-and-gra.png",
    content: `
      <div class="space-y-8">
        <div class="prose-intro">
          <p class="text-xl leading-relaxed text-muted-foreground">After analyzing hundreds of productivity systems and testing them with thousands of users, we've identified the five frameworks that consistently deliver results. These aren't just theoretical concepts – they're practical systems that real people use to transform their productivity.</p>
        </div>
        
        <section class="space-y-8">
          <div class="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-8">
            <h2 class="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <span class="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-lg font-bold">1</span>
              Getting Things Done (GTD)
            </h2>
            <p class="text-lg leading-relaxed text-muted-foreground mb-6">David Allen's GTD system remains one of the most effective frameworks for managing tasks and projects. The key is the "capture everything" principle – getting all tasks out of your head and into a trusted system.</p>
            
            <div class="bg-background/50 rounded-lg p-6">
              <h3 class="text-xl font-semibold text-foreground mb-4">Implementation Tips:</h3>
              <ul class="space-y-3 text-muted-foreground">
                <li class="flex items-start gap-3">
                  <span class="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
                  Use a single inbox for all incoming tasks
                </li>
                <li class="flex items-start gap-3">
                  <span class="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
                  Process items regularly with the 2-minute rule
                </li>
                <li class="flex items-start gap-3">
                  <span class="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
                  Organize by context, not priority
                </li>
              </ul>
            </div>
          </div>
          
          <div class="bg-card border border-border rounded-lg p-8">
            <h2 class="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <span class="w-10 h-10 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-lg font-bold">2</span>
              Objectives and Key Results (OKRs)
            </h2>
            <p class="text-lg leading-relaxed text-muted-foreground">Originally developed at Intel and popularized by Google, OKRs help align individual work with organizational goals. The framework focuses on setting ambitious objectives and measuring progress through key results.</p>
          </div>
          
          <div class="bg-card border border-border rounded-lg p-8">
            <h2 class="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <span class="w-10 h-10 bg-green-100 text-green-700 rounded-lg flex items-center justify-center text-lg font-bold">3</span>
              The Eisenhower Matrix
            </h2>
            <p class="text-lg leading-relaxed text-muted-foreground">This simple but powerful framework helps you prioritize tasks based on urgency and importance. By categorizing tasks into four quadrants, you can focus on what truly matters.</p>
          </div>
          
          <div class="bg-card border border-border rounded-lg p-8">
            <h2 class="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <span class="w-10 h-10 bg-purple-100 text-purple-700 rounded-lg flex items-center justify-center text-lg font-bold">4</span>
              Time Blocking
            </h2>
            <p class="text-lg leading-relaxed text-muted-foreground">Instead of keeping a to-do list, time blocking involves scheduling specific time slots for different activities. This approach helps prevent overcommitment and ensures important tasks get adequate attention.</p>
          </div>
          
          <div class="bg-card border border-border rounded-lg p-8">
            <h2 class="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <span class="w-10 h-10 bg-orange-100 text-orange-700 rounded-lg flex items-center justify-center text-lg font-bold">5</span>
              The Pomodoro Technique
            </h2>
            <p class="text-lg leading-relaxed text-muted-foreground">Francesco Cirillo's technique uses 25-minute focused work sessions followed by short breaks. This framework is particularly effective for maintaining concentration and preventing burnout.</p>
          </div>
        </section>
        
        <section class="bg-muted/30 rounded-lg p-8 space-y-6">
          <h2 class="text-3xl font-bold text-foreground border-b border-border pb-3">Choosing the Right Framework</h2>
          <p class="text-lg leading-relaxed text-muted-foreground">The best productivity framework is the one you'll actually use consistently. Consider your work style, goals, and preferences when selecting a system. Many successful people combine elements from multiple frameworks to create their own personalized approach.</p>
        </section>
      </div>
    `,
  },
  "plannerflow-focus-study": {
    title: "How PlannerFlow Users Increased Focus by 40%",
    excerpt:
      "Real user data reveals significant improvements in focus and productivity after implementing PlannerFlow templates.",
    author: "Dr. Emily Watson",
    date: "January 5, 2025",
    readTime: "6 min read",
    category: "Case Study",
    comments: 18,
    image: "/focus-and-concentration-study-with-brain-activity-.png",
    content: `
      <div class="space-y-8">
        <div class="prose-intro">
          <p class="text-xl leading-relaxed text-muted-foreground">In our comprehensive 90-day study of 500 PlannerFlow users, we discovered remarkable improvements in focus and productivity. The results exceeded our expectations and provide compelling evidence for the effectiveness of structured digital planning.</p>
        </div>
        
        <section class="space-y-6">
          <h2 class="text-3xl font-bold text-foreground border-b border-border pb-3">Study Methodology</h2>
          <p class="text-lg leading-relaxed text-muted-foreground">We tracked 500 participants over 90 days, measuring their focus duration, task completion rates, and overall productivity metrics. Participants used various PlannerFlow templates including OKR planning, daily goal tracking, and habit formation tools.</p>
          
          <div class="bg-card border border-border rounded-lg p-6">
            <h3 class="text-2xl font-semibold text-foreground mb-4">Key Metrics Measured:</h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                <span class="w-3 h-3 bg-primary rounded-full"></span>
                <span class="text-muted-foreground">Average focus session duration</span>
              </div>
              <div class="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                <span class="w-3 h-3 bg-primary rounded-full"></span>
                <span class="text-muted-foreground">Task completion rates</span>
              </div>
              <div class="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                <span class="w-3 h-3 bg-primary rounded-full"></span>
                <span class="text-muted-foreground">Goal achievement percentages</span>
              </div>
              <div class="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                <span class="w-3 h-3 bg-primary rounded-full"></span>
                <span class="text-muted-foreground">Self-reported productivity scores</span>
              </div>
            </div>
          </div>
        </section>
        
        <section class="space-y-6">
          <h2 class="text-3xl font-bold text-foreground border-b border-border pb-3">Remarkable Results</h2>
          <p class="text-lg leading-relaxed text-muted-foreground">The data revealed significant improvements across all measured categories:</p>
          
          <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6 text-center">
              <div class="text-4xl font-bold text-primary mb-2">40%</div>
              <h3 class="text-xl font-semibold text-foreground mb-3">Increase in Focus Duration</h3>
              <p class="text-muted-foreground">Average focus session increased from 23 to 32 minutes</p>
            </div>
            
            <div class="bg-gradient-to-br from-green-100/50 to-green-50/50 border border-green-200 rounded-lg p-6 text-center">
              <div class="text-4xl font-bold text-green-700 mb-2">35%</div>
              <h3 class="text-xl font-semibold text-foreground mb-3">Better Task Completion</h3>
              <p class="text-muted-foreground">Completion rates rose from 64% to 86%</p>
            </div>
            
            <div class="bg-gradient-to-br from-blue-100/50 to-blue-50/50 border border-blue-200 rounded-lg p-6 text-center">
              <div class="text-4xl font-bold text-blue-700 mb-2">28%</div>
              <h3 class="text-xl font-semibold text-foreground mb-3">Goal Achievement</h3>
              <p class="text-muted-foreground">Quarterly objectives reached: 78% vs 61%</p>
            </div>
          </div>
        </section>
        
        <section class="space-y-6">
          <h2 class="text-3xl font-bold text-foreground border-b border-border pb-3">What Made the Difference?</h2>
          <p class="text-lg leading-relaxed text-muted-foreground mb-6">Several factors contributed to these impressive improvements:</p>
          
          <div class="space-y-6">
            <div class="bg-card border border-border rounded-lg p-6">
              <h3 class="text-2xl font-semibold text-foreground mb-4">Visual Progress Tracking</h3>
              <p class="text-muted-foreground leading-relaxed">The visual representation of progress through charts and completion percentages provided powerful motivation and helped users stay on track.</p>
            </div>
            
            <div class="bg-card border border-border rounded-lg p-6">
              <h3 class="text-2xl font-semibold text-foreground mb-4">Structured Templates</h3>
              <p class="text-muted-foreground leading-relaxed">Pre-designed templates eliminated decision fatigue and provided proven frameworks for different types of planning.</p>
            </div>
            
            <div class="bg-card border border-border rounded-lg p-6">
              <h3 class="text-2xl font-semibold text-foreground mb-4">Regular Review Cycles</h3>
              <p class="text-muted-foreground leading-relaxed">Built-in review prompts encouraged users to reflect on their progress and adjust their strategies accordingly.</p>
            </div>
          </div>
        </section>
        
        <section class="bg-muted/30 rounded-lg p-8 space-y-6">
          <h2 class="text-3xl font-bold text-foreground border-b border-border pb-3">Implications for Digital Planning</h2>
          <p class="text-lg leading-relaxed text-muted-foreground">This study demonstrates that well-designed digital planning tools can have a measurable impact on productivity and focus. The key is combining proven methodologies with intuitive digital interfaces that encourage consistent use.</p>
        </section>
      </div>
    `,
  },
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    return {
      title: "Post Not Found | PlannerFlow Blog",
    }
  }

  return {
    title: `${post.title} | PlannerFlow Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://plannerflow.shop/blog/${params.slug}`,
      images: [post.image],
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <article className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Link href="/blog">
                <Button variant="ghost" className="mb-8 hover:bg-muted hover:text-foreground cursor-pointer">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>

              {/* Article Header */}
              <header className="mb-8">
                <Badge variant="secondary" className="bg-primary/10 text-primary mb-4">
                  {post.category}
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-balance mb-6">{post.title}</h1>
                <div className="flex items-center gap-6 text-muted-foreground mb-6">
                  <span>By {post.author}</span>
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    {post.comments} comments
                  </div>
                </div>
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-64 lg:h-96 object-cover rounded-lg"
                />
              </header>

              {/* Article Content */}
              <div
                className="prose prose-lg max-w-none 
                  [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mb-6 [&_h2]:mt-12
                  [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mb-4 [&_h3]:mt-8
                  [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-6
                  [&_ul]:text-muted-foreground [&_li]:mb-2
                  [&_.prose-intro_p]:text-xl [&_.prose-intro_p]:leading-relaxed [&_.prose-intro_p]:text-muted-foreground [&_.prose-intro_p]:mb-8
                  [&_section]:mb-12
                  [&_.bg-card]:bg-card [&_.border-border]:border-border [&_.text-foreground]:text-foreground [&_.text-muted-foreground]:text-muted-foreground [&_.text-primary]:text-primary [&_.text-primary-foreground]:text-primary-foreground [&_.bg-primary]:bg-primary [&_.bg-background]:bg-background [&_.bg-muted]:bg-muted"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Comments Section */}
              <section className="mt-16 pt-8 border-t border-border">
                <h3 className="text-2xl font-bold mb-6">Comments ({post.comments})</h3>
                <div className="space-y-6">
                  <Card className="border-border bg-card">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-sm font-medium text-primary">JM</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-card-foreground">Jessica Martinez</span>
                            <span className="text-sm text-muted-foreground">2 days ago</span>
                          </div>
                          <p className="text-muted-foreground">
                            This article perfectly captures my experience! I've been using PlannerFlow templates for 3
                            months and my productivity has dramatically improved. The structured approach really works.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-card">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-sm font-medium text-green-700">DK</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-card-foreground">David Kim</span>
                            <span className="text-sm text-muted-foreground">3 days ago</span>
                          </div>
                          <p className="text-muted-foreground">
                            As someone with ADHD, the structured approach of digital planning has been life-changing.
                            The visual progress tracking keeps me motivated and on track.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-card">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-sm font-medium text-blue-700">AL</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-card-foreground">Anna Lopez</span>
                            <span className="text-sm text-muted-foreground">1 week ago</span>
                          </div>
                          <p className="text-muted-foreground">
                            Great insights! I'd love to see more detailed case studies like this. The data-driven
                            approach really helps validate the effectiveness of these methods.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
