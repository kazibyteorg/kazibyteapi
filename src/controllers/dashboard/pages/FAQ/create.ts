import { Request, Response, NextFunction } from "express";
import FAQ from "@/models/dashboard/pages/FAQ/FAQ";
import { FAQSchemas } from "@/schemas/dashboard/pages/FAQ/FAQSchemas";

const createFAQ = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // validate request body
    const parsedBody = FAQSchemas.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body",
        errors: parsedBody.error.errors,
      });
    }

    // Check if question & answer already exists
    const existingFAQ = await FAQ.findOne({
      question: parsedBody.data.question,
      answer: parsedBody.data.answer,
    });
    if (existingFAQ) {
      return res.status(400).json({
        success: false,
        message: "FAQ already exists",
      });
    }

    // Create new FAQ

    const newFAQ = await FAQ.create({
      ...parsedBody.data,
    });

    // Return success response
    return res.status(200).json({
      success: true,
      message: "FAQ created successfully",
      newFAQ,
    });
  } catch (error) {
    next(error);
  }
};

export default createFAQ;
