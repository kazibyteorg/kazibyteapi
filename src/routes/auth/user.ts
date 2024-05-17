import { Router } from "express";
import {
  getUser,
  deleteUserById,
  updateUserById,
  getAllUsers,
} from "@/controllers/auth";

// Define route handlers

const router = Router();

// Define routes
router.get("/user", getAllUsers);
router.get("/user/:id", getUser);
router.delete("/user/:id", deleteUserById);
router.put("/user/:id", updateUserById);

export default router;
