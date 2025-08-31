import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AuthErrorPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-red-600">Authentication Error</CardTitle>
            <CardDescription>The authentication link is invalid or has expired.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600 text-center">This could happen if:</p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>The link has expired</li>
              <li>The link has already been used</li>
              <li>The link is malformed</li>
            </ul>
            <div className="flex flex-col space-y-2">
              <Button asChild>
                <Link href="/auth/forgot-password">Request New Reset Link</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/auth/login">Back to Login</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  )
}
