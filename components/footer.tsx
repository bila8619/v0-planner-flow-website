import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo-white.png"
                alt="PlannerFlow - Create. Focus. Repeat."
                width={180}
                height={60}
                className="h-10 w-auto" // increased from h-8 to h-10 for bigger logo
              />
            </div>
            <p className="text-sm text-background/80">
              Create. Focus. Repeat. Transform your productivity with digital planning tools designed for modern life.
            </p>
            <div className="text-sm text-background/60">
              <p>442 5th Ave. Ste. 1913</p>
              <p>New York, NY 10018</p>
              <p>support@plannerflow.shop</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="/templates" className="hover:text-background transition-colors">
                  Templates
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-background transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-background transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="/about" className="hover:text-background transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-background transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="mailto:support@plannerflow.shop" className="hover:text-background transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="/privacy-policy" className="hover:text-background transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="hover:text-background transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/refund-policy" className="hover:text-background transition-colors">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="/cookie-policy" className="hover:text-background transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/60">
          <p>&copy; 2024 PlannerFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
