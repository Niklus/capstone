import express from "express";
import { loginUser, signupUser, getMe } from "../controllers/user.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/me", requireAuth, getMe);

export default router;
