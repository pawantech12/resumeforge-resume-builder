"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Download, Eye, Loader2, Save } from "lucide-react";
import { useRef } from "react";
import html2pdf from "html2pdf.js";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { ResumePreview } from "@/components/resume-preview";
import { Edit } from "lucide-react";
import { toast } from "sonner";
import { LinkIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function EditResumePage() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    control,
    formState: { isSubmitting, isDirty, isSubmitted, errors },
  } = useForm({
    defaultValues: {
      resumeName: "",
      template: "",
      personalInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        summary: "",
      },
      education: [
        {
          school: "",
          degree: "",
          field: "",
          graduationDate: "",
        },
      ],
      experience: [
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false, // 👈 ADD THIS

          responsibilities: "",
        },
      ],
      skills: "",
      languages: "",
      certifications: "",
    },
  });
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experience",
  });

  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareLink, setShareLink] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const resumeRef = useRef();
  // New state to toggle preview vs edit form
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/resume/${params.id}`);
        const resume = res.data.resume;
        console.log("resume", resume);

        // Convert ISO date strings to "YYYY-MM-DD"
        const formattedEducation =
          resume.education?.map((edu) => ({
            ...edu,
            graduationDate: edu.graduationDate
              ? new Date(edu.graduationDate).toISOString().split("T")[0]
              : "",
          })) || [];

        const formattedExperience =
          resume.experience?.map((exp) => ({
            ...exp,
            startDate: exp.startDate
              ? new Date(exp.startDate).toISOString().split("T")[0]
              : "",
            endDate: exp.endDate
              ? new Date(exp.endDate).toISOString().split("T")[0]
              : "",
          })) || [];

        // Populate form values
        reset({
          resumeName: resume.resumeName || "",
          template: resume.template || "",
          personalInfo: resume.personalInfo || {},
          education: formattedEducation,
          experience: formattedExperience,
          skills: resume.skills || "",
          languages: resume.languages || "",
          certifications: resume.certifications || "",
        });
      } catch (err) {
        console.error("Failed to fetch resume:", err);
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
    fetchResume();
  }, [params.id, setValue]);

  const onSubmit = async (data) => {
    // Convert experience date strings to Date objects
    data.education = data.education.map((edu) => ({
      ...edu,
      graduationDate: new Date(edu.graduationDate),
    }));

    data.experience = data.experience.map((exp) => ({
      ...exp,
      startDate: exp.startDate ? new Date(exp.startDate) : null,
      endDate:
        exp.currentlyWorking || !exp.endDate ? null : new Date(exp.endDate),
    }));
    try {
      const res = await axios.put(`/api/resume/${params.id}`, data);
      if (res.data.success) {
        toast.success("Resume updated successfully.");
        reset(res.data.resume);
      }
    } catch (err) {
      console.error("Failed to update resume:", err);
    }
  };

  // Watch all form data to send to preview in real-time
  const formData = watch();

  const handleDownloadPDF = () => {
    if (!resumeRef.current) return;

    const opt = {
      margin: 0.5,
      filename: `${formData.resumeName || "resume"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(resumeRef.current).set(opt).save();
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
          <p className="mt-4 text-lg font-medium">Loading Resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-5">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl max-sm:text-2xl font-bold">Edit Resume</h1>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            onClick={() => setShowPreview((prev) => !prev)}
            className="flex items-center"
          >
            {showPreview ? (
              <Edit className=" h-4 w-4" />
            ) : (
              <Eye className=" h-4 w-4" />
            )}
            {showPreview ? "Edit" : "Preview"}
          </Button>
          <Button
            variant="outline"
            onClick={handleDownloadPDF}
            disabled={isDirty || !showPreview}
            title={
              isDirty
                ? "Please save your changes before downloading"
                : !showPreview
                ? "Switch to preview to download"
                : "Download PDF"
            }
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
            {isSubmitting
              ? "Getting link..."
              : shareLink && new Date() < new Date(expiresAt)
              ? "Copy Link"
              : "Share"}
          </Button>
        </div>
      </div>

      {showPreview ? (
        <div ref={resumeRef}>
          <ResumePreview data={formData} template={formData.template} />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resume-name">Resume Name</Label>
                <Input
                  id="resume-name"
                  {...register("resumeName", { required: true })}
                />
              </div>
            </div>
          </Card>

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="space-y-4 pt-4">
              <Card className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input
                      id="first-name"
                      {...register("personalInfo.firstName")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input
                      id="last-name"
                      {...register("personalInfo.lastName")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("personalInfo.email")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" {...register("personalInfo.phone")} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" {...register("personalInfo.address")} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea
                      id="summary"
                      {...register("personalInfo.summary")}
                      rows={4}
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="education" className="space-y-4 pt-4">
              <Card className="p-6 space-y-6">
                {educationFields.map((field, index) => (
                  <div key={field.id} className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`education.${index}.school`}>
                        School/University
                      </Label>
                      <Input
                        id={`education.${index}.school`}
                        {...register(`education.${index}.school`)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`education.${index}.degree`}>
                        Degree
                      </Label>
                      <Input
                        id={`education.${index}.degree`}
                        {...register(`education.${index}.degree`)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`education.${index}.field`}>
                        Field of Study
                      </Label>
                      <Input
                        id={`education.${index}.field`}
                        {...register(`education.${index}.field`)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`education.${index}.graduationDate`}>
                        Graduation Date
                      </Label>
                      <Input
                        id={`education.${index}.graduationDate`}
                        type="date"
                        {...register(`education.${index}.graduationDate`)}
                      />
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="text-red-500 "
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    appendEducation({
                      school: "",
                      degree: "",
                      field: "",
                      graduationDate: "",
                    })
                  }
                >
                  + Add Another Education
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-4 pt-4">
              <Card className="p-6">
                <div className="space-y-6">
                  {experienceFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid gap-6 md:grid-cols-2 border-b pb-6"
                    >
                      <div className="space-y-2">
                        <Label htmlFor={`experience.${index}.company`}>
                          Company
                        </Label>
                        <Input
                          id={`experience.${index}.company`}
                          {...register(`experience.${index}.company`)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`experience.${index}.position`}>
                          Position
                        </Label>
                        <Input
                          id={`experience.${index}.position`}
                          {...register(`experience.${index}.position`)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`experience.${index}.startDate`}>
                          Start Date
                        </Label>
                        <Input
                          id={`experience.${index}.startDate`}
                          type="date"
                          {...register(`experience.${index}.startDate`)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`experience.${index}.endDate`}>
                          End Date
                        </Label>
                        <Input
                          id={`experience.${index}.endDate`}
                          type="date"
                          {...register(`experience.${index}.endDate`)}
                          disabled={watch(
                            `experience.${index}.currentlyWorking`
                          )}
                        />
                        <div className="space-y-2">
                          <Label
                            htmlFor={`experience.${index}.currentlyWorking`}
                          >
                            <input
                              type="checkbox"
                              id={`experience.${index}.currentlyWorking`}
                              {...register(
                                `experience.${index}.currentlyWorking`
                              )}
                              className="mr-2"
                            />
                            Currently working here
                          </Label>
                        </div>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`experience.${index}.responsibilities`}>
                          Responsibilities & Achievements
                        </Label>
                        <Textarea
                          id={`experience.${index}.responsibilities`}
                          {...register(`experience.${index}.responsibilities`)}
                          rows={4}
                        />
                      </div>
                      <div className="md:col-span-2 flex justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => removeExperience(index)}
                          className="text-red-500"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      appendExperience({
                        company: "",
                        position: "",
                        startDate: "",
                        endDate: "",
                        responsibilities: "",
                      })
                    }
                  >
                    + Add Another Experience
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4 pt-4">
              <Card className="p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills (comma separated)</Label>
                    <Textarea id="skills" {...register("skills")} rows={4} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="languages">Languages</Label>
                    <Input id="languages" {...register("languages")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certifications">Certifications</Label>
                    <Textarea
                      id="certifications"
                      {...register("certifications")}
                      rows={2}
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Set Password and Expiry</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Set a strong password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}

              <Input
                type="date"
                {...register("expiresAt", {
                  required: "Expiry time is required",
                  valueAsDate: true,
                })}
              />
              {errors.expiresAt && (
                <p className="text-sm text-red-500">
                  {errors.expiresAt.message}
                </p>
              )}
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsModalOpen(false);
                  reset();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
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
    </div>
  );
}
