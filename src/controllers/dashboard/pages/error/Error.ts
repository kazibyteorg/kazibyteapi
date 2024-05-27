import { Request, Response, NextFunction } from "express";

const error = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(404).json({
      success: false,
      message: "Page not found",
    });
  } catch (error) {
    next(error);
  }
};

export default error;
