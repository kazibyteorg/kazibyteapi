import { Request, Response, NextFunction } from "express";
import { RegistrationSchema } from "@/schemas/auth/UserSchemas";
import User from "@/models/auth/User";
import bcrypt from "bcryptjs";
import RegistrationHistory from "@/models/auth/RegistrationHistory";

const Registration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate request body
    const parsedBody = RegistrationSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body",
        errors: parsedBody.error.errors,
      });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email: parsedBody.data.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(parsedBody.data.password, 10);

    // create Registration user history

    const userAgent =
      (req.headers["user-agent"] as string | undefined) || "unknown";
    const ipAddress =
      (req.headers["x-forwarded-for"] as string | undefined) ||
      req.socket.remoteAddress;

    await RegistrationHistory.create({
      email: parsedBody.data.email,
      action: "registration",
      userAgent: userAgent,
      ipAddress: ipAddress,
    });

    // send email

    console.log(userAgent, ipAddress);

    // create new user
    const user = await User.create({
      ...parsedBody.data,
      password: hashedPassword,
    });

    // Return success response with token
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export default Registration;
