import { Request, Response, NextFunction } from "express";
import Profile from "@/models/dashboard/profile/Profile";

const updateProfileById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Find profile by ID and update
    const updatedProfile = await Profile.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Run validators on update
    });

    // Check if profile exists
    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Return updated profile data
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    next(error);
  }
};

export default updateProfileById;
