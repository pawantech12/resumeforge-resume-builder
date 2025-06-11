"use client";
export const dynamic = "force-dynamic";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Download, Pencil, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumePreview } from "@/components/resume-preview";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { LinkIcon } from "lucide-react";
import { toast } from "sonner";

export default function ResumePage() {
  const params = useParams();
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);
  const resumeRef = useRef();
  useEffect(() => {
    // Simulate fetching resume data
    const fetchResumeData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/resume/${params.id}`);
        const resume = res.data.resume;
        console.log("resume", resume);

        setResumeData(resume);
      } catch (error) {
        console.log("Error fetching resume data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumeData();
  }, [params.id]);

  const handleDownloadPDF = () => {
    if (!resumeRef.current) return;

    const opt = {
      margin: 0.5,
      filename: `${resumeData.resumeName || "resume"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(resumeRef.current).set(opt).save();
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`/api/resume/${resumeData._id}`);
      if (res.data.success) {
        toast.success("Your resume has been deleted successfully.");
        setShowDeleteDialog(false);
        router.push("/dashboard"); // Refresh the dashboard after deletion
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

  const handleShareResume = async () => {
    try {
      const { data } = await axios.post(`/api/share`, {
        resumeId: params.id,
        expiresInHours: 24, // optional
        password: "", // optional, could be added via modal
      });

      const shareUrl = `${window.location.origin}/shared/${data.shareId}`;
      await navigator.clipboard.writeText(shareUrl);

      toast.success("Shareable link copied to clipboard.");
    } catch (err) {
      toast.error("Failed to generate shareable link.");
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-emerald-500"></div>
          <p className="mt-4 text-lg font-medium">Loading resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-5">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/resumes">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl max-sm:text-2xl font-bold">
            {resumeData.resumeName}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setShowDeleteDialog(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(`/dashboard/edit/${params.id}`)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={handleDownloadPDF}
            title="Download PDF"
          >
            <Download className="h-4 w-4 " />
            Download PDF
          </Button>
          <Button
            variant="outline"
            onClick={handleShareResume}
            title="Generate shareable link"
          >
            <LinkIcon className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto flex">
        <div className="flex-shrink-0">
          <div ref={resumeRef} className=" bg-white shadow-md">
            <ResumePreview data={resumeData} template={resumeData.template} />
          </div>
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
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
