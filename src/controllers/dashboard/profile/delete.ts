import { Request, Response, NextFunction } from "express";
import Profile from "@/models/dashboard/profile/Profile";

const deleteProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Find profile by ID and delete
    const deletedProfile = await Profile.findByIdAndDelete(id);

    // Check if profile exists
    if (!deletedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default deleteProfile;
