import { Request, Response, NextFunction } from "express";
import FAQ from "@/models/dashboard/pages/FAQ/FAQ";
import mongoose from "mongoose";

// Controller to handle deleting an FAQ by its ID
const deleteFAQ = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid FAQ ID format",
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

    // Delete the FAQ
    await FAQ.findByIdAndDelete(id);

    // Return a success response
    return res.status(200).json({
      success: true,
      message: "FAQ deleted successfully",
    });
  } catch (error) {
    // Pass any unexpected errors to the next middleware
    next(error);
  }
};

export default deleteFAQ;
