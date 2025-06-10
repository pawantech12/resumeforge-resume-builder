// app/models/share.js

import mongoose from "mongoose";

const shareSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    shareId: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    expiresAt: Date,
    userId: {
      type: String, // Clerk user ID
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Share || mongoose.model("Share", shareSchema);
