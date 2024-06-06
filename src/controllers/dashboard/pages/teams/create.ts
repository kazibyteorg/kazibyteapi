import { Request, Response, NextFunction } from "express";
import Team from '@/models/dashboard/pages/teams/Teams'
import { teamSchemas } from '@/schemas/dashboard/pages/Teams/teamSchemas'

const createTeams = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // validate request body
    const parsedBody = teamSchemas.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body",
        errors: parsedBody.error.errors,
      });
    }

    // Check if question & answer already exists
    const existingTeam = await Team.findOne({
      name: parsedBody.data.name,
    });
    if (existingTeam) {
      return res.status(400).json({
        success: false,
        message: "FAQ already exists",
      });
    }

    // Create new Team

    const newFAQ = await Team.create({
      ...parsedBody.data,
    });

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Team created successfully",
      newFAQ,
    });
  } catch (error) {
    next(error);
  }
};

export default createTeams;
