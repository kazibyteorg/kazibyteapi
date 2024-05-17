import { Request, Response, NextFunction } from "express";
import Profile from "@/models/dashboard/profile/Profile";
import { ProfileSchema } from "@/schemas/dashboard/profile/ProfileSchemas";
import bcrypt from "bcryptjs";

const createProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate request body
    const parsedBody = ProfileSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body",
        errors: parsedBody.error.errors,
      });
    }

    // Check if user already exists
    const existingProfile = await Profile.findOne({
      email: parsedBody.data.email,
    });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(parsedBody.data.password, 10);

    // Create new profile

    const profile = await Profile.create({
      ...parsedBody.data,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });

    const newProfile = await Profile.findById(profile._id).select("-password");

    if (!newProfile) {
      return res.status(500).json({
        success: false,
        message: "Failed to create profile",
      });
    }

    // Return success response

    return res.status(200).json({
      success: true,
      message: "Profile created successfully",
      profile: newProfile,
    });
  } catch (error) {
    next(error);
  }
};

export default createProfile;
