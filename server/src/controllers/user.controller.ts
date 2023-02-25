import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import asyncHandler from "express-async-handler";

const createToken = (id: string) => {
  const { JWT_SECRET = "" } = process.env;
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "3d" });
};

// @desc Login User
// @route POST  /api/users/login
// @access Public
const signupUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw Error("All fields must be field");
  }

  if (!validator.isEmail(email)) {
    res.status(400);
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    res.status(400);
    throw Error("Password not strong enough");
  }

  const exists = await User.findOne({ email });

  if (exists) {
    res.status(400);
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await User.create({ email, password: hash });

  // Create token
  const token = createToken(user.id);

  res.status(200).json({ email, token });
});

// @desc Login User
// @route POST  /api/users/login
// @access Public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw Error("All fields must be field");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw Error("Incorect Email");
  }

  const match = await bcrypt.compare(password, user.password as string);

  if (!match) {
    res.status(401);
    throw Error("Incorrect Password");
  }

  // Create token
  const token = createToken(user.id);

  res.status(200).json({ email, token });
});

// @desc Get User Data
// @route GET  /api/users/me
// @access Private
const getMe = asyncHandler(async (req: any, res) => {
  const { id, email } = (await User.findById(req.user.id)) as any;
  res.status(200).json({ id, email });
});

export { loginUser, signupUser, getMe };
