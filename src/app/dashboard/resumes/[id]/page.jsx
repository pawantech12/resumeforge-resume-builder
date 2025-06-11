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
import { LinkIcon } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";

export default function ResumePage() {
  const {
    register: modalRegister,
    handleSubmit: handleModalSubmit,
    formState: { errors: modalErrors, isSubmitting: isModalSubmitting },
    reset: resetModalForm,
  } = useForm();

  const params = useParams();
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareLink, setShareLink] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);

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
    const fetchExistingShare = async () => {
      try {
        const res = await axios.get(`/api/share/${params.id}`);
        if (res.data?.success) {
          const link = `${window.location.origin}/shared/${res.data.share.shareId}`;
          setShareLink(link);
          setExpiresAt(res.data.share.expiresAt);
        }
      } catch (error) {
        console.log("No existing share link or it expired.");
      }
    };

    fetchExistingShare();

    fetchResumeData();
  }, [params.id]);

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

  const onPasswordSubmit = async ({ password, expiresAt }) => {
    try {
      const { data } = await axios.post(`/api/share`, {
        resumeId: params.id,
        expiresAt: new Date(expiresAt), // optional
        password: password, // optional, could be added via modal
      });

      const generatedUrl = `${window.location.origin}/shared/${data.shareId}`;
      setShareLink(generatedUrl);
      setExpiresAt(data.expiresAt);
      await navigator.clipboard.writeText(generatedUrl);

      toast.success("Shareable link copied to clipboard.");
      setIsModalOpen(false);
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
            onClick={() => {
              if (shareLink && new Date() < new Date(expiresAt)) {
                navigator.clipboard.writeText(shareLink);
                toast.success("Link copied to clipboard.");
              } else {
                setIsModalOpen(true);
              }
            }}
            disabled={isLoading}
            title={
              shareLink && new Date() < new Date(expiresAt)
                ? "Copy Link"
                : "Generate shareable link"
            }
          >
            <LinkIcon className="h-4 w-4" />
            {isModalSubmitting
              ? "Getting link..."
              : shareLink && new Date() < new Date(expiresAt)
              ? "Copy Link"
              : "Share"}
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Set Password and Expiry</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleModalSubmit(onPasswordSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Set a strong password"
                {...modalRegister("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
              />
              {modalErrors.password && (
                <p className="text-sm text-red-500">
                  {modalErrors.password.message}
                </p>
              )}

              <Input
                type="date"
                {...modalRegister("expiresAt", {
                  required: "Expiry time is required",
                  valueAsDate: true,
                })}
              />
              {modalErrors.expiresAt && (
                <p className="text-sm text-red-500">
                  {modalErrors.expiresAt.message}
                </p>
              )}
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsModalOpen(false);
                  resetModalForm();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isModalSubmitting}>
                {isModalSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
