import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

// Middleware to validate request params using Zod schema
const validateRequest = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      next(error);
    }
  };
};

export { validateRequest };
