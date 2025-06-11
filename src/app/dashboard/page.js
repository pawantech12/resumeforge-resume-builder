"use client";

import Link from "next/link";
import { FileText, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResumeCard } from "@/components/resume-card";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardPage() {
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
          <p className="mt-4 text-lg font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold max-sm:text-2xl">Dashboard</h1>
        <Link href="/dashboard/templates">
          <Button className="bg-emerald-500 hover:bg-emerald-600">
            <Plus className=" h-4 w-4" />
            Create
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to ResumeForge</CardTitle>
            <CardDescription>
              Create, edit, and manage your professional resumes all in one
              place.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-800">
                  <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-50" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    You have {resumes.length} resumes
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {resumes.length > 0 &&
                      `Last updated on ${new Date(
                        resumes[0].updatedAt
                      ).toLocaleDateString()}`}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/templates">
              <Button variant="outline">Browse Templates</Button>
            </Link>
          </CardFooter>
        </Card>

        <h2 className="text-2xl font-bold">Your Resumes</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resumes.map((resume) => (
            <ResumeCard key={resume._id} resume={resume} />
          ))}
          <Link href="/dashboard/templates" className="block h-full">
            <Card className="flex h-full flex-col items-center justify-center p-6 transition-colors hover:bg-muted/50">
              <div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-800">
                <Plus className="h-6 w-6 text-emerald-600 dark:text-emerald-50" />
              </div>
              <p className="mt-4 font-medium">Create New Resume</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
