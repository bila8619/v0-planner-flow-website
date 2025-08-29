import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Ready to Transform Your Planning?</h2>
        <p className="text-lg text-primary-foreground/90 text-pretty max-w-2xl mx-auto mb-8">
          Join thousands of users who have already improved their productivity with PlannerFlow
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/pricing">
            <Button
              size="lg"
              variant="secondary"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 cursor-pointer"
            >
              Get Started Today
            </Button>
          </Link>
          <Link href="/templates">
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-white hover:text-primary bg-transparent cursor-pointer"
            >
              Browse Templates
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
