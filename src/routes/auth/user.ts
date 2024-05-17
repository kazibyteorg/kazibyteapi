import { Router } from "express";
import { getUser } from "@/controllers/auth";

// Define route handlers

const router = Router();

// Define routes
router.get("/user/:id", getUser);

export default router;
