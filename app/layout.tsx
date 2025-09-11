import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { AuthProvider } from "@/components/auth-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "PlannerFlow - Digital Planning Templates | Create. Focus. Repeat.",
  description:
    "Transform your productivity with PlannerFlow's 45+ interactive digital planning templates. Goal tracking, progress analytics, and proven frameworks for modern productivity.",
  keywords:
    "digital planning, productivity templates, goal tracking, OKR planning, GTD, time management, planning templates, digital planner",
  authors: [{ name: "PlannerFlow Team" }],
  creator: "PlannerFlow",
  publisher: "PlannerFlow",
  metadataBase: new URL("https://plannerflow.shop"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "PlannerFlow - Digital Planning Templates",
    description: "Transform your productivity with 45+ interactive digital planning templates. Create. Focus. Repeat.",
    url: "https://plannerflow.shop",
    siteName: "PlannerFlow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PlannerFlow Digital Planning Templates",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlannerFlow - Digital Planning Templates",
    description: "Transform your productivity with 45+ interactive digital planning templates.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} min-h-screen flex flex-col`}>
        <AuthProvider>
          <div className="flex-1 flex flex-col">{children}</div>
        </AuthProvider>
      </body>
    </html>
  )
}
