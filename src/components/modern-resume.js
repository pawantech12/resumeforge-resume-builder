import React from "react";

const ModernResume = ({ data }) => {
  const {
    personalInfo,
    education,
    experience,
    skills,
    languages,
    certifications,
  } = data;
  return (
    <div className="mx-auto max-w-[800px] overflow-hidden font-sans text-gray-800">
      <div className="flex flex-col bg-emerald-50 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-emerald-700">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="mt-1 text-lg font-medium text-emerald-600">
            Senior Software Engineer
          </p>
        </div>
        <div className="mt-4 text-sm md:mt-0 md:text-right text-gray-600">
          <p>{personalInfo.address}</p>
          <p>{personalInfo.phone}</p>
          <p>{personalInfo.email}</p>
        </div>
      </div>

      <div className="mt-8 px-6">
        <p className="text-base leading-relaxed text-gray-700">
          {personalInfo.summary}
        </p>
      </div>

      {experience?.filter(
        (exp) =>
          exp.company?.trim() &&
          exp.position?.trim() &&
          exp.responsibilities?.trim() &&
          (exp.currentlyWorking || exp.startDate) &&
          (exp.currentlyWorking || exp.endDate)
      ).length > 0 && (
        <section className="mt-10 px-6">
          <h2 className="text-xl font-semibold text-emerald-700 mb-4">
            Experience
          </h2>
          <div className="space-y-6">
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
                <div key={index}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <h3 className="font-semibold">{exp.position}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(exp.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      -{" "}
                      {exp.currentlyWorking
                        ? "Present"
                        : new Date(exp.endDate).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                    </p>
                  </div>
                  <p className="text-sm text-emerald-600">{exp.company}</p>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-700">
                    {exp.responsibilities}
                  </p>
                </div>
              ))}
          </div>
        </section>
      )}

      {education?.filter(
        (edu) =>
          edu.school?.trim() &&
          edu.degree?.trim() &&
          edu.field?.trim() &&
          edu.graduationDate
      ).length > 0 && (
        <section className="mt-10 px-6">
          <h2 className="text-xl font-semibold text-emerald-700 mb-4">
            Education
          </h2>
          <div className="space-y-4">
            {education
              .filter(
                (edu) =>
                  edu.school?.trim() &&
                  edu.degree?.trim() &&
                  edu.field?.trim() &&
                  edu.graduationDate
              )
              .map((edu, index) => (
                <div key={index}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <h3 className="font-semibold">{edu.school}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(edu.graduationDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  <p className="text-sm text-gray-700">
                    {edu.degree} in {edu.field}
                  </p>
                </div>
              ))}
          </div>
        </section>
      )}
      <section className="mt-10 px-6 pb-10">
        <h2 className="text-xl font-semibold text-emerald-700 mb-4">
          Skills & Expertise
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="font-medium">Technical Skills</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {skills.split(",").map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium">Languages & Certifications</h3>
            <p className="mt-2 text-sm">{languages}</p>
            <p className="mt-1 text-sm">{certifications}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModernResume;
