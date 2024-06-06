import { Request, Response, NextFunction } from "express";
import  Team  from '@/models/dashboard/pages/teams/Teams';
import mongoose from "mongoose";

// Controller to handle deleting an Team by its ID
const deleteTeam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Team ID format",
      });
    }

    // Check if the Team exists
    const existingTeam = await Team.findById(id);
    if (!existingTeam) {
      // If the Team does not exist, return a 404 response
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    // Delete the Team
    await Team.findByIdAndDelete(id);

    // Return a success response
    return res.status(200).json({
      success: true,
      message: "Team deleted successfully",
    });
  } catch (error) {
    // Pass any unexpected errors to the next middleware
    next(error);
  }
};

export default deleteTeam;
