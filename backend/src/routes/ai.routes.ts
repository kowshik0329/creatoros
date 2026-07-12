import { Router } from "express";
import { createCaption } from "../controllers/ai.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/caption",
  authMiddleware,
  createCaption
);

export default router;