import { Request, Response, NextFunction } from "express";
import Profile from "@/models/dashboard/profile/Profile";

const getProfileById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Find profile by ID
    const profile = await Profile.findById(id);

    // Check if profile exists
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Return profile data
    return res.status(200).json({
      success: true,
      message: "Profile found",
      profile,
    });
  } catch (error) {
    next(error);
  }
};

export default getProfileById;
