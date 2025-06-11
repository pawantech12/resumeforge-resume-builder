"use client";
export const dynamic = "force-dynamic";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateResumeForm from "@/components/create-resume-form";
import { Suspense } from "react";

export default function CreateResumePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-3xl max-sm:text-2xl font-bold">
          Create New Resume
        </h1>
      </div>
      <Suspense fallback={<div>Loading form...</div>}>
        <CreateResumeForm />
      </Suspense>
    </div>
  );
}
