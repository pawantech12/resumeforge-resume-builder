"use client";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ResumeErrorMessage({ message }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800 text-center space-y-4">
        <div className="flex justify-center">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Something went wrong
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">{message}</p>
        <Button
          onClick={() => window.location.reload()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white mt-4"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
