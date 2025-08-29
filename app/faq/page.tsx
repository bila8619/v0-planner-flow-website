import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | PlannerFlow",
  description:
    "Find answers to common questions about PlannerFlow digital planning templates, pricing, features, and support. Get help with templates and subscriptions.",
  keywords:
    "plannerflow faq, digital planning help, template questions, pricing questions, support, how to use templates",
  openGraph: {
    title: "PlannerFlow FAQ - Get Your Questions Answered",
    description: "Find answers to common questions about our digital planning templates and features.",
    url: "https://plannerflow.shop/faq",
  },
}

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I access my templates after purchase?",
      answer:
        "After completing your purchase, you'll receive an email with your login credentials and direct links to all your templates. You can also access them anytime through your PlannerFlow dashboard at plannerflow.shop/dashboard.",
    },
    {
      question: "Can I use PlannerFlow on mobile devices?",
      answer:
        "All PlannerFlow templates are fully responsive and optimized for mobile, tablet, and desktop use. You can plan on-the-go and your progress syncs automatically across all devices.",
    },
    {
      question: "Is there a subscription option?",
      answer:
        "Yes! We offer a monthly subscription at $14.99/month that includes access to all templates, monthly new releases, premium analytics, and priority support. You can also choose from our one-time purchase options: Starter ($49), Professional ($69), or Elite ($89).",
    },
    {
      question: "How often do you update templates?",
      answer:
        "We release new templates monthly and regularly update existing ones based on user feedback. Subscribers get immediate access to all new releases, while one-time purchasers receive updates for templates in their tier.",
    },
    {
      question: "Can I customize templates?",
      answer:
        "Yes! All templates include customization options like themes, colors, and layouts. Professional and Elite tiers offer advanced customization features, while our Premium subscription includes full design flexibility.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are secured with industry-standard encryption.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "Yes, we offer a 30-day money-back guarantee on all purchases. If you're not completely satisfied with PlannerFlow, contact our support team within 30 days for a full refund.",
    },
    {
      question: "How does auto-save work?",
      answer:
        "Your progress is automatically saved every few seconds as you work. All data is stored securely in the cloud and synced across your devices, so you never lose your planning work.",
    },
    {
      question: "Can I export my data?",
      answer:
        "Professional and Elite users can export their data in multiple formats including PDF, CSV, and JSON. This ensures you always have access to your planning data, even outside of PlannerFlow.",
    },
    {
      question: "Is there customer support available?",
      answer:
        "Yes! We provide email support for all users, with priority support for Professional, Elite, and subscription customers. Our typical response time is within 24 hours, often much faster.",
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
              <h1 className="text-4xl lg:text-5xl font-bold text-balance mb-6">Frequently Asked Questions</h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Find answers to common questions about PlannerFlow templates and features
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
                    <AccordionTrigger className="text-left hover:no-underline py-6">
                      <span className="text-lg font-medium text-foreground">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
              <p className="text-muted-foreground mb-8">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <Card className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      support@plannerflow.shop
                    </div>
                    <div className="h-4 w-px bg-border" />
                    <div>Response within 24 hours</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
