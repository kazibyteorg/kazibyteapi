import { Request, Response, NextFunction } from "express";
import  Team  from '@/models/dashboard/pages/teams/Teams';
import { teamSchemas } from '@/schemas/dashboard/pages/Teams/teamSchemas'
import mongoose from "mongoose";

// Controller to handle updating an Team by its ID
const updateTeam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Team ID format",
      });
    }

    // Validate request body using Zod
    const parsedBody = teamSchemas.safeParse(req.body);
    if (!parsedBody.success) {
      // If validation fails, return a 400 response with error details
      return res.status(400).json({
        success: false,
        message: "Invalid request body",
        errors: parsedBody.error.errors,
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

    // Update the Team with new data
    const updatedTeam = await Team.findByIdAndUpdate(id, parsedBody.data, {
      new: true,
    });

    // Return the updated Team data
    return res.status(200).json({
      success: true,
      message: "Team updated successfully",
      updatedTeam,
    });
  } catch (error) {
    // Pass any unexpected errors to the next middleware
    next(error);
  }
};

export default updateTeam;
