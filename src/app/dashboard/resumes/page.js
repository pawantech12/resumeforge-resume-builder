"use client";
export const dynamic = "force-dynamic";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ResumeCard } from "@/components/resume-card";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ResumesPage() {
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResumes = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/resume"); // Adjust the endpoint if needed
        const data = response.data;

        setResumes(data.resumes);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumes();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-emerald-500"></div>
          <p className="mt-4 text-lg font-medium">Loading Resumes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl max-sm:text-2xl font-bold">My Resumes</h1>
        <Link href="/dashboard/templates">
          <Button className="bg-emerald-500 hover:bg-emerald-600">
            <Plus className="h-4 w-4" />
            Create
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resumes.map((resume) => (
          <ResumeCard key={resume._id} resume={resume} />
        ))}
        <Link href="/dashboard/templates" className="block h-full">
          <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center transition-colors hover:bg-muted/50">
            <div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-800">
              <Plus className="h-6 w-6 text-emerald-600 dark:text-emerald-50" />
            </div>
            <p className="mt-4 font-medium">Create New Resume</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose from multiple templates
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
