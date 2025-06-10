import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    resumeName: { type: String, required: true },
    template: { type: String, default: "default" },
    personalInfo: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      address: String,
      summary: String,
    },
    education: [
      {
        school: String,
        degree: String,
        field: String,
        graduationDate: Date,
      },
    ],
    experience: [
      {
        company: String,
        position: String,
        startDate: Date,
        endDate: Date,
        currentlyWorking: Boolean,
        responsibilities: String,
      },
    ],
    skills: String,
    languages: String,
    certifications: String,
  },
  { timestamps: true }
);

export default mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);
