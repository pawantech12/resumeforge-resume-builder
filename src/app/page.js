"use client";
import Link from "next/link";
import { ArrowRight, FileText, Layers, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-emerald-500" />
            <span className="text-xl font-bold">ResumeForge</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link href="#features" className="text-base font-medium">
              Features
            </Link>
            <Link href="#templates" className="text-base font-medium">
              Templates
            </Link>
            <Link href="#pricing" className="text-base font-medium">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton variant="ghost">Log in</SignInButton>

              <SignUpButton className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-md text-base text-white">
                Sign up
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-md text-base text-white">
                  Dashboard
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-16 md:py-28 lg:py-36 bg-gradient-to-b from-white via-emerald-50 to-white dark:from-emerald-950 dark:via-gray-900 dark:to-black">
          <div className="container mx-auto px-4 md:px-10">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl xl:text-6xl">
                    Create Professional Resumes in Minutes
                  </h1>
                  <p className="max-w-[600px] text-lg text-muted-foreground">
                    Choose from beautiful templates, customize your content, and
                    download your resume as a PDF — all in just a few clicks.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#templates">
                    <Button size="lg" variant="outline">
                      View Templates
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Visual */}
              <div className="flex items-center justify-center">
                <div className="relative w-[300px] h-[400px] sm:w-[350px] sm:h-[450px] md:w-[400px] md:h-[500px] rounded-xl border shadow-lg overflow-hidden bg-white dark:bg-gray-950">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-gray-900" />
                  <div className="relative z-10 m-6 space-y-6 rounded-lg bg-white/90 p-6 shadow-inner backdrop-blur-md dark:bg-gray-900/80">
                    <div className="space-y-2">
                      <div className="h-6 w-32 rounded-md bg-emerald-300 dark:bg-emerald-800" />
                      <div className="h-4 w-48 rounded-md bg-gray-200 dark:bg-gray-700" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
                      <div className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
                      <div className="h-4 w-2/3 rounded-md bg-gray-200 dark:bg-gray-700" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-6 w-24 rounded-md bg-emerald-300 dark:bg-emerald-800" />
                      <div className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
                      <div className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full bg-gray-50 py-12 dark:bg-gray-950 md:py-24 lg:py-32"
        >
          <div className="px-4 md:px-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm dark:bg-emerald-800">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything you need to create the perfect resume
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our resume builder provides all the tools you need to create a
                  professional resume that stands out.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-800">
                  <Layers className="h-6 w-6 text-emerald-600 dark:text-emerald-50" />
                </div>
                <h3 className="text-xl font-bold">Multiple Templates</h3>
                <p className="text-center text-muted-foreground">
                  Choose from a variety of professionally designed templates to
                  match your style and industry.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-800">
                  <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-50" />
                </div>
                <h3 className="text-xl font-bold">Easy Editing</h3>
                <p className="text-center text-muted-foreground">
                  Our intuitive editor makes it simple to customize your resume
                  content and layout.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-800">
                  <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-50" />
                </div>
                <h3 className="text-xl font-bold">ATS Friendly</h3>
                <p className="text-center text-muted-foreground">
                  All our templates are optimized to pass through Applicant
                  Tracking Systems.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="templates"
          className="w-full py-16 md:py-24 lg:py-32 bg-muted/50"
        >
          <div className="px-4 md:px-10">
            <div className="text-center mb-12 space-y-4">
              <div className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-900 px-4 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-200">
                Templates
              </div>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Professional Resume Templates
              </h2>
              <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
                Choose from our collection of beautifully crafted, professional
                templates to make your resume stand out.
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card
                  key={i}
                  className="group relative overflow-hidden transition-shadow hover:shadow-xl"
                >
                  <CardHeader className="p-0">
                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                      <div className="m-4 h-full w-full rounded-md bg-white p-4 shadow-sm dark:bg-gray-950">
                        <div className="space-y-2">
                          <div className="h-4 w-24 rounded-md bg-emerald-300 dark:bg-emerald-800" />
                          <div className="h-3 w-32 rounded-md bg-gray-300 dark:bg-gray-700" />
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="h-2 w-full rounded-md bg-gray-300 dark:bg-gray-700" />
                          <div className="h-2 w-full rounded-md bg-gray-300 dark:bg-gray-700" />
                          <div className="h-2 w-2/3 rounded-md bg-gray-300 dark:bg-gray-700" />
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-500" />
            <span className="text-lg font-bold">ResumeForge</span>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} ResumeForge. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
