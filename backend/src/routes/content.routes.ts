import { Router } from "express";
import {
  addContent,
  editContent,
  getContents,
  removeContent,
} from "../controllers/content.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/", addContent);
router.get("/", getContents);
router.put("/:id", editContent);
router.delete("/:id", removeContent);

export default router;