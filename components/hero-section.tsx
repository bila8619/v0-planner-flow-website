import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Prominent brand logo on homepage hero */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                Transform Your
                <br />
                Productivity with
                <br />
                <span className="text-primary">Digital Planning</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-lg">
                <span className="font-semibold text-primary">CREATE. FOCUS. REPEAT.</span>
                <br />
                Unlock your potential with PlannerFlow's complete digital planning suite. 45+ interactive templates,
                goal tracking, and productivity tools designed to help you achieve more.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/pricing">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 cursor-pointer"
                >
                  Start Planning Today
                </Button>
              </Link>

              {/* Desktop/Tablet (>= sm): Explore Templates */}
              <Link href="/templates" className="hidden sm:block">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border hover:bg-muted hover:text-foreground bg-transparent cursor-pointer"
                >
                  Explore Templates
                </Button>
              </Link>

              {/* Mobile (< sm): Sign In */}
              <Link href="/auth/login" className="sm:hidden">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border hover:bg-muted hover:text-foreground bg-transparent cursor-pointer"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">45+</div>
                <div className="text-sm text-muted-foreground font-medium">TEMPLATES</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground font-medium">USERS</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">99%</div>
                <div className="text-sm text-muted-foreground font-medium">SATISFACTION</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative space-y-4">
              {/* Floating background elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/5 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute top-1/2 -left-6 w-16 h-16 bg-primary/10 rounded-full blur-lg animate-pulse delay-1000"></div>

              {/* Main cards with staggered animations and varied sizes */}
              <div className="grid grid-cols-2 gap-3">
                {/* Daily Goals - Large card spanning full width */}
                <Card className="col-span-2 p-5 bg-gradient-to-br from-card to-card/80 border-border shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 animate-fade-in">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-primary rounded-sm"></div>
                      </div>
                      Daily Goals
                    </h3>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-200"></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-500"></div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">3 of 4 complete</div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-1000 ease-out animate-progress"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </Card>

                {/* Weekly Review - Medium card */}
                <Card className="p-4 bg-gradient-to-br from-card to-card/90 border-border shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-1 animate-fade-in delay-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-card-foreground text-sm">Weekly Review</h3>
                    <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                      Project A
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                      Meeting prep
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                      Health goals
                    </li>
                  </ul>
                </Card>

                {/* Habit Tracker - Medium card */}
                <Card className="p-4 bg-gradient-to-br from-card to-card/90 border-border shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-1 animate-fade-in delay-300">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-card-foreground text-sm">Habit Tracker</h3>
                    <div className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                      Tracking
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-4 h-4 rounded transition-all duration-300 hover:scale-110 ${
                          i < 5 ? "bg-primary shadow-sm" : "bg-muted"
                        }`}
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                </Card>
              </div>

              {/* Additional floating card */}
              <Card className="ml-8 p-3 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1 animate-fade-in delay-500 max-w-48">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-primary">Auto-saved</div>
                    <div className="text-xs text-muted-foreground">2 minutes ago</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
