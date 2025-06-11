"use client";
export const dynamic = "force-dynamic";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TemplateCard } from "@/components/template-card";

export default function TemplatesPage() {
  // Mock data for templates
  const templates = [
    {
      id: "1",
      name: "Professional",
      description:
        "A clean and professional template suitable for corporate roles.",
      thumbnail: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "2",
      name: "Modern",
      description:
        "A contemporary design with a fresh layout and modern typography.",
      thumbnail: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "3",
      name: "Creative",
      description:
        "A bold and creative template perfect for design and creative roles.",
      thumbnail: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "4",
      name: "Minimal",
      description:
        "A minimalist design focusing on content with clean typography.",
      thumbnail: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "5",
      name: "Executive",
      description:
        "An elegant template designed for senior positions and executives.",
      thumbnail: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "6",
      name: "Technical",
      description:
        "Optimized for technical roles with sections for skills and projects.",
      thumbnail: "/placeholder.svg?height=400&width=300",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-3xl max-sm:text-2xl font-bold">Resume Templates</h1>
      </div>
      <p className="text-muted-foreground">
        Choose from our collection of professionally designed templates to
        create your resume.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}
