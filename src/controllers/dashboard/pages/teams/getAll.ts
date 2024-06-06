import { Request, Response, NextFunction } from "express";
import Team from "@/models/dashboard/pages/teams/Teams"

// Controller to handle fetching all Teams with pagination
const getAllTeams = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract query parameters for pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;

    // Calculate the starting index of the results for the current page
    const startIndex = (page - 1) * limit;

    // Fetch the total count of Teams for pagination calculation
    const totalTeams = await Team.countDocuments();

    // Fetch the Teams for the current page with the specified limit
    const Teams = await Team.find().skip(startIndex).limit(limit);

    // Calculate total number of pages
    const totalPages = Math.ceil(totalTeams / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;
    const nextPage = hasNextPage ? page + 1 : null;
    const previousPage = hasPreviousPage ? page - 1 : null;

    // Return paginated response
    return res.status(200).json({
      success: true,
      message: "Teams retrieved successfully",
      currentPage: page,
      totalPages,
      totalTeams,
      Teams,
      hasNextPage,
      hasPreviousPage,
      nextPage,
      previousPage,
    });
  } catch (error) {
    // Pass any unexpected errors to the next middleware
    next(error);
  }
};

export default getAllTeams;
