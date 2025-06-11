"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Download, MoreHorizontal, Pencil, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import axios from "axios";
import { Eye } from "lucide-react";
import { ResumePreview } from "./resume-preview";

export function ResumeCard({ resume, onDelete }) {
  const router = useRouter();
  console.log("resume", resume);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resumeRef = useRef();

  const handleDownloadPDF = async () => {
    try {
      if (!resumeRef.current) return;

      // ✅ Dynamically import only in the browser
      const html2pdf = (await import("html2pdf.js")).default;

      const opt = {
        margin: 0.5,
        filename: `${resume.resumeName || "resume"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      await html2pdf().from(resumeRef.current).set(opt).save();
    } catch (err) {
      console.error("Failed to download PDF:", err);
      toast.error("Failed to download resume PDF.");
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`/api/resume/${resume._id}`);
      if (res.data.success) {
        toast.success("Your resume has been deleted successfully.");
        setShowDeleteDialog(false);
        onDelete(resume._id);
      } else {
        toast.error("Failed to delete resume.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Something went wrong while deleting.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <CardTitle className="truncate text-lg">
              {resume?.resumeName}
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => router.push(`/dashboard/edit/${resume._id}`)}
                >
                  <Pencil className="h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    router.push(`/dashboard/resumes/${resume._id}`)
                  }
                >
                  <Eye className=" h-4 w-4" />
                  <span>Preview</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownloadPDF}>
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-red-600"
                >
                  <Trash className=" h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
            <div className="m-4 h-full rounded-md bg-white p-4 shadow-sm dark:bg-gray-950">
              <div className="space-y-2">
                <div className="h-4 w-24 rounded-md bg-emerald-200 dark:bg-emerald-800" />
                <div className="h-3 w-32 rounded-md bg-gray-200 dark:bg-gray-800" />
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-2 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
                <div className="h-2 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
                <div className="h-2 w-2/3 rounded-md bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4">
          <div className="text-xs text-muted-foreground">
            <span>Template: {resume.template}</span>
            <div>
              Updated: {new Date(resume.updatedAt).toLocaleDateString()}
            </div>
          </div>
          <Link href={`/dashboard/edit/${resume._id}`}>
            <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
              <Pencil className="mr-2 h-3 w-3" />
              Edit
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <div style={{ display: "none" }}>
        <div ref={resumeRef}>
          <ResumePreview data={resume} template={resume.template} />
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your resume. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
