import React from "react";
import { Separator } from "./ui/separator";

const ProfessionalResume = ({ data }) => {
  const {
    personalInfo,
    education,
    experience,
    skills,
    languages,
    certifications,
  } = data;

  return (
    <div className="mx-auto max-w-[800px] p-4  overflow-hidden font-sans text-gray-800">
      {/* Header */}
      <header className="mb-10 text-center border-b pb-6">
        <h1 className="text-4xl font-bold tracking-tight">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="mt-2 text-sm text-gray-600">{personalInfo.address}</p>
        <p className="text-sm text-gray-600">
          {personalInfo.phone} &bull; {personalInfo.email}
        </p>
      </header>

      {/* Summary */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold uppercase tracking-widest text-gray-800">
          Professional Summary
        </h2>
        <Separator className="my-3 bg-gray-300" />
        <p className="leading-relaxed text-gray-700 text-justify">
          {personalInfo.summary}
        </p>
      </section>

      {/* Experience */}
      {experience?.filter(
        (exp) =>
          exp.company?.trim() &&
          exp.position?.trim() &&
          exp.responsibilities?.trim() &&
          (exp.currentlyWorking || exp.startDate) &&
          (exp.currentlyWorking || exp.endDate)
      ).length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold uppercase tracking-widest text-gray-800">
            Experience
          </h2>
          <Separator className="my-3 bg-gray-300" />
          {experience
            .filter(
              (exp) =>
                exp.company?.trim() &&
                exp.position?.trim() &&
                exp.responsibilities?.trim() &&
                (exp.currentlyWorking || exp.startDate) &&
                (exp.currentlyWorking || exp.endDate)
            )
            .map((exp, index) => (
              <div className="space-y-2" key={index}>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{exp.position}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(exp.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    –{" "}
                    {exp.currentlyWorking
                      ? "Present"
                      : new Date(exp.endDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600">
                  {exp.company}
                </p>
                <p className="mt-2 whitespace-pre-line text-sm text-gray-700 leading-relaxed">
                  {exp.responsibilities}
                </p>
              </div>
            ))}
        </section>
      )}

      {/* Education */}
      {education?.filter(
        (edu) =>
          edu.school?.trim() &&
          edu.degree?.trim() &&
          edu.field?.trim() &&
          edu.graduationDate
      ).length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold uppercase tracking-widest text-gray-800">
            Education
          </h2>
          <Separator className="my-3 bg-gray-300" />
          {education
            .filter(
              (edu) =>
                edu.school?.trim() &&
                edu.degree?.trim() &&
                edu.field?.trim() &&
                edu.graduationDate
            )
            .map((edu, index) => (
              <div className="space-y-2" key={index}>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{edu.school}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(edu.graduationDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-700">
                  {edu.degree} in {edu.field}
                </p>
              </div>
            ))}
        </section>
      )}

      {/* Skills, Languages, Certifications */}
      <section>
        <h2 className="text-xl font-semibold uppercase tracking-widest text-gray-800">
          Skills & Additional Information
        </h2>
        <Separator className="my-3 bg-gray-300" />
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase">
              Technical Skills
            </h3>
            <p className="mt-1 text-sm text-gray-600">{skills}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase">
              Languages
            </h3>
            <p className="mt-1 text-sm text-gray-600">{languages}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 uppercase">
            Certifications
          </h3>
          <p className="mt-1 text-sm text-gray-600">{certifications}</p>
        </div>
      </section>
    </div>
  );
};

export default ProfessionalResume;
