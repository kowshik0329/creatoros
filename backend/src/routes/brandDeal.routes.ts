import { Router } from "express";
import {
  addBrandDeal,
  getBrandDeals,
  removeBrandDeal,
} from "../controllers/brandDeal.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/", addBrandDeal);
router.get("/", getBrandDeals);
router.delete("/:id", removeBrandDeal);

export default router;