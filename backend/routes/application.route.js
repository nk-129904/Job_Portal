import express from "express";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// apply job
router.route("/apply/:id").post(isAuthenticated, applyJob);

// get applied jobs (student)
router.route("/get").get(isAuthenticated, getAppliedJobs);

// get applicants (recruiter/admin)
router.route("/:id/applicants").get(isAuthenticated, getApplicants);

// update application status
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;