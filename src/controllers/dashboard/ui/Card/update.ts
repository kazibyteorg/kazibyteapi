import { Request, Response, NextFunction } from "express";
import FAQ from "@/models/dashboard/pages/FAQ/FAQ";
import { FAQSchemas } from "@/schemas/dashboard/pages/FAQ/FAQSchemas";
import mongoose from "mongoose";

// Controller to handle updating an FAQ by its ID
const updateFAQ = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid FAQ ID format",
      });
    }

    // Validate request body using Zod
    const parsedBody = FAQSchemas.safeParse(req.body);
    if (!parsedBody.success) {
      // If validation fails, return a 400 response with error details
      return res.status(400).json({
        success: false,
        message: "Invalid request body",
        errors: parsedBody.error.errors,
      });
    }

    // Check if the FAQ exists
    const existingFAQ = await FAQ.findById(id);
    if (!existingFAQ) {
      // If the FAQ does not exist, return a 404 response
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    // Update the FAQ with new data
    const updatedFAQ = await FAQ.findByIdAndUpdate(id, parsedBody.data, {
      new: true,
    });

    // Return the updated FAQ data
    return res.status(200).json({
      success: true,
      message: "FAQ updated successfully",
      updatedFAQ,
    });
  } catch (error) {
    // Pass any unexpected errors to the next middleware
    next(error);
  }
};

export default updateFAQ;
