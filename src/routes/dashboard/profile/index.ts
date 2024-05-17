import express from "express";
const router = express.Router();
import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  getAllProfiles,
} from "@/controllers/dashboard";

router.get("/profile", getAllProfiles);

router.post("/profile", createProfile);
router.get("/profile/:id", getProfile);
router.put("/profile/:id", updateProfile);
router.delete("/profile/:id", deleteProfile);

export default router;
