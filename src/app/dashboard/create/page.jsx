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
      <Suspense
        fallback={
          <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-emerald-500"></div>
              <p className="mt-4 text-lg font-medium">Loading Resume Form...</p>
            </div>
          </div>
        }
      >
        <CreateResumeForm />
      </Suspense>
    </div>
  );
}
