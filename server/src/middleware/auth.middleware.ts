import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import asyncHandler from "express-async-handler";

interface JwtPayload {
  id: string;
}

export default asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(" ")[1];

        const { JWT_SECRET = "" } = process.env;

        // Verify token
        const { id } = jwt.verify(token, JWT_SECRET) as JwtPayload;

        // Get User from token
        req.user = await User.findOne({ id }).select("id");

        next();
      } catch (err) {
        res.status(401);
        throw new Error("Not Authorized");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not Authorized, No Token");
    }
  }
);
