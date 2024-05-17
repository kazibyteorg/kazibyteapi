import { Request, Response, NextFunction } from "express";
import Profile from "@/models/dashboard/profile/Profile";

const getAllProfiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Find all profiles
    const profiles = await Profile.find();

    // Return profiles
    return res.status(200).json({
      success: true,
      message: "Profiles found successfully, count: " + profiles.length,
      profiles,
    });
  } catch (error) {
    next(error);
  }
};

export default getAllProfiles;
