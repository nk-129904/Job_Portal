import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // ✅ important fix
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  },
  coverLetter: {
    type: String,
  },
  resume: {
    type: String, // Cloudinary URL
  },
  resumeOriginalName: {
    type: String, // Original file name
  }
}, { timestamps: true });

// ✅ prevent duplicate applications
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

export const Application = mongoose.model("Application", applicationSchema);