import express from "express";
const router = express.Router();
import { registering } from "@/controllers/auth";

router.post("/register", registering);

export default router;
