import { Request, Response, NextFunction } from "express";
import User from "@/models/auth/User";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch all users from the database
    const users = await User.find().select("-password");

    // Return the list of users
    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default getAllUsers;
