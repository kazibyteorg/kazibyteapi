import { Request, Response, NextFunction } from "express";
import FAQ from "@/models/dashboard/pages/FAQ/FAQ";
import mongoose from "mongoose";

// Controller to handle fetching an FAQ by its ID
const getByIdFAQ = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid FAQ ID format",
      });
    }

    // Find the FAQ by ID
    const faq = await FAQ.findById(id);

    // If the FAQ does not exist, return a 404 response
    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    // Return the FAQ data
    return res.status(200).json({
      success: true,
      message: "FAQ retrieved successfully",
      faq,
    });
  } catch (error) {
    // Pass any unexpected errors to the next middleware
    next(error);
  }
};

export default getByIdFAQ;
