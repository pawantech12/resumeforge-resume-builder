"use client";
import dynamic from "next/dynamic";
import Link from "next/link";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PdfPreview = dynamic(() => import("@/components/scrollable-pdfpreview"), {
  ssr: false,
});

export function TemplateCard({ template }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <CardTitle>{template.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-hidden">
          <PdfPreview fileUrl={template.pdfUrl} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <p className="text-sm text-muted-foreground">{template.description}</p>
        <Link
          href={`/dashboard/create?template=${template.name}`}
          className="w-full"
        >
          <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
            Use Template
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
