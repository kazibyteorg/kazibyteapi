import express from "express";
const router = express.Router();
import { dashboard } from "@/controllers/dashboard";
import authMiddleware from "@/middleware/authMiddleware";

router.get("/dashboard", authMiddleware, dashboard);

export default router;
