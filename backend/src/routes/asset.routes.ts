import { Router } from "express";
import {
  getAssets,
  removeAsset,
  uploadAsset,
} from "../controllers/asset.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import upload from "../middleware/upload.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getAssets);

router.post(
  "/upload",
  upload.single("file"),
  uploadAsset
);

router.delete("/:id", removeAsset);

export default router;