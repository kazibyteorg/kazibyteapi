import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import User from "@/models/auth/User";

// Define the schema for validating the request parameters
const UserIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"), // MongoDB ObjectId format
});

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate request parameters
    const parsedParams = UserIdSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request parameters",
        errors: parsedParams.error.errors,
      });
    }

    // Extract the user ID from the validated parameters
    const { id } = parsedParams.data;

    // Fetch the user from the database
    const user = await User.findById(id).select("-password"); // Exclude password field
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return the user data
    return res.status(200).json({
      success: true,
      message: "User found successfully",
      user,
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default getUserById;
