import express from "express";
const router = express.Router();
import {
  createFAQ,
  getByIdFAQ,
  getAllFAQs,
  updateFAQ,
  deleteFAQ,
} from "@/controllers/dashboard/pages/index";

router.get("/faqs", getAllFAQs);
router.get("/faq/:id", getByIdFAQ);

router.post("/faq", createFAQ);

router.put("/faq/:id", updateFAQ);

router.delete("/faq/:id", deleteFAQ);

export default router;
