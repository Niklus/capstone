import { Request, Response, NextFunction } from "express";

export default (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode).json({
    error: error.message,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  });
};
