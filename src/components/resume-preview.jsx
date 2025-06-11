import { Separator } from "@/components/ui/separator";
import ProfessionalResume from "./professional-resume";
import ModernResume from "./modern-resume";

export function ResumePreview({ template, data }) {
  const {
    personalInfo,
    experience,
    education,
    skills,
    languages,
    certifications,
  } = data;
  // Professional Template
  if (template === "Professional") {
    return <ProfessionalResume data={data} />;
  }

  // Modern Template
  if (template === "Modern") {
    return <ModernResume data={data} />;
  }

  // Creative Template
  return (
    <div className="mx-auto max-w-[800px] overflow-hidden font-sans text-gray-800">
      <div className="flex flex-col bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-white">
        <h1 className="text-4xl font-bold">
          {personalInfo.firstName}{" "}
          <span className="font-light">{personalInfo.lastName}</span>
        </h1>
        <p className="mt-2 text-lg font-light">Senior Software Engineer</p>
        <div className="mt-6 grid grid-cols-1 gap-2 text-sm md:grid-cols-3">
          <p>{personalInfo.phone}</p>
          <p>{personalInfo.email}</p>
          <p>{personalInfo.address}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-3">
        <div className="md:col-span-2">
          {experience?.filter(
            (exp) =>
              exp.company?.trim() &&
              exp.position?.trim() &&
              exp.responsibilities?.trim() &&
              (exp.currentlyWorking || exp.startDate) &&
              (exp.currentlyWorking || exp.endDate)
          ).length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-emerald-600">
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
                    <div
                      className="relative border-l-2 border-emerald-200 pl-4"
                      key={index}
                    >
                      <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-emerald-500" />
                      <h3 className="text-lg font-semibold">{exp.position}</h3>
                      <p className="text-emerald-600">{exp.company}</p>
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
                      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-700">
                        {exp.responsibilities}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {education?.filter(
            (edu) =>
              edu.school?.trim() &&
              edu.degree?.trim() &&
              edu.field?.trim() &&
              edu.graduationDate
          ).length > 0 && (
            <div>
              <h2 className="mb-4 mt-10 text-xl font-semibold text-emerald-600">
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
                    <div
                      className="relative border-l-2 border-emerald-200 pl-4"
                      key={index}
                    >
                      <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-emerald-500" />
                      <h3 className="text-lg font-semibold">{edu.school}</h3>
                      <p className="text-sm text-gray-500">
                        {edu.degree} in {edu.field}
                      </p>
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
                  ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <section className="mb-6">
            <h2 className="mb-3 text-xl font-semibold text-emerald-600">
              About Me
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {personalInfo.summary}
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-3 text-xl font-semibold text-emerald-600">
              Skills
            </h2>
            <ul className="space-y-2 text-sm text-gray-700">
              {skills.split(",").map((skill, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>{skill.trim()}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-emerald-600">
              Languages
            </h2>
            <p className="text-sm text-gray-700">{languages}</p>

            <h2 className="mb-3 mt-4 text-xl font-semibold text-emerald-600">
              Certifications
            </h2>
            <p className="text-sm text-gray-700">{certifications}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
