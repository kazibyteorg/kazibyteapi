import { Request, Response, NextFunction } from "express";
import User from "@/models/auth/User";

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const field = req.query.field as string;

    let user = User as any | null;

    if (field) {
      user = await User.findById(id).select(field);
    }

    console.log(user);
  } catch (error) {
    next(error);
  }
};

export default getUserById;
