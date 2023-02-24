import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id: string) => {
  const { JWT_SECRET = "" } = process.env;
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "3d" });
};

const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw Error("All fields must be field");
    }

    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough");
    }

    const exists = await User.findOne({ email });
    if (exists) {
      throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({ email, password: hash });

    // Create token
    const token = createToken(user.id);

    res.status(200).json({ email, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw Error("All fields must be field");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw Error("Incorect Email");
    }

    const match = await bcrypt.compare(password, user.password as string);

    if (!match) {
      throw Error("Incorrect Password");
    }

    // Create token
    const token = createToken(user.id);

    res.status(200).json({ email, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export { loginUser, signupUser };
