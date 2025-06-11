"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
const CreateResumeForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting },
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
  const searchParams = useSearchParams();
  const selectedTemplate = searchParams.get("template") || "default";

  const onSubmit = async (data) => {
    data.template = selectedTemplate;

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
      const res = await axios.post("/api/resume", data);

      console.log("response", res);

      if (res.data.success) {
        toast.success("Resume created successfully.");
        router.push(`/dashboard/edit/${res.data.resume._id}`);
      }
      // router.push("/dashboard/edit/new-resume");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resume-name">Resume Name</Label>
              <Input
                id="resume-name"
                placeholder="e.g., Software Engineer Resume"
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
                    placeholder="John"
                    {...register("personalInfo.firstName")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    placeholder="Doe"
                    {...register("personalInfo.lastName")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("personalInfo.email")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="(123) 456-7890"
                    {...register("personalInfo.phone")}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St, City, State, ZIP"
                    {...register("personalInfo.address")}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    placeholder="A brief summary of your professional background and goals"
                    rows={4}
                    {...register("personalInfo.summary")}
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
                    <Label htmlFor={`education.${index}.degree`}>Degree</Label>
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
                        type="date" // 👈 ADD THIS
                        {...register(`experience.${index}.startDate`)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`experience.${index}.endDate`}>
                        End Date
                      </Label>
                      <Input
                        id={`experience.${index}.endDate`}
                        type="date" // 👈 ADD THIS
                        {...register(`experience.${index}.endDate`)}
                        disabled={watch(`experience.${index}.currentlyWorking`)}
                      />
                      <div className="space-y-2">
                        <Label htmlFor={`experience.${index}.currentlyWorking`}>
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
                  <Textarea
                    id="skills"
                    placeholder="JavaScript, React, Node.js, TypeScript, HTML, CSS"
                    rows={4}
                    {...register("skills")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="languages">Languages</Label>
                  <Input
                    id="languages"
                    placeholder="English (Native), Spanish (Intermediate)"
                    {...register("languages")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certifications">Certifications</Label>
                  <Textarea
                    id="certifications"
                    placeholder="AWS Certified Developer, Google Cloud Professional"
                    rows={2}
                    {...register("certifications")}
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
                Creating...
              </>
            ) : (
              "Create Resume"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateResumeForm;
