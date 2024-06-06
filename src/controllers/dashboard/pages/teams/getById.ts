import { Request, Response, NextFunction } from "express";
import Team from "@/models/dashboard/pages/teams/Teams";
import mongoose from "mongoose";

// Controller to handle fetching an Team by its ID
const getByIdTeam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Team ID format",
      });
    }

    // Find the Team by ID
    const team = await Team.findById(id);

    // If the Team does not exist, return a 404 response
    if (!Team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    // Return the Team data
    return res.status(200).json({
      success: true,
      message: "Team retrieved successfully",
      Team,
    });
  } catch (error) {
    // Pass any unexpected errors to the next middleware
    next(error);
  }
};

export default getByIdTeam;
