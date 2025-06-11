"use client";

import { useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { ResumePreview } from "@/components/resume-preview";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ResumeErrorMessage from "@/components/resume-error-message";
import { set } from "mongoose";

export default function SharedResumePage() {
  const { shareId } = useParams();
  const [resume, setResume] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(`/api/share/${shareId}`, {
        password: data.password,
      });
      setResume(res.data.resume);
      setIsModalOpen(false);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load resume");
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-8">
      {/* Show error component if there's a global error */}
      {error && !resume && <ResumeErrorMessage message={error} />}
      {/* Password Modal */}
      {!resume && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[450px] rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
            <DialogHeader className="mb-2">
              <DialogTitle className="text-xl font-semibold text-center text-zinc-900 dark:text-zinc-100">
                🔒 Enter Password to View Resume
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="rounded-md border border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters required",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 transition-colors text-white font-medium py-2 rounded-md"
                >
                  {loading ? "Verifying..." : "Submit"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Resume Display */}
      {resume && <ResumePreview data={resume} template={resume.template} />}
    </div>
  );
}
