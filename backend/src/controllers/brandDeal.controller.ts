import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createBrandDeal,
  deleteBrandDeal,
  getUserBrandDeals,
} from "../services/brandDeal.service";

export const addBrandDeal = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { brandName, campaign, amount, status } = req.body;

    if (!brandName || !campaign || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: "Brand name, campaign and amount are required",
      });
    }

    const deal = await createBrandDeal({
      brandName,
      campaign,
      amount: Number(amount),
      status,
      userId,
    });

    return res.status(201).json({
      success: true,
      message: "Brand deal created successfully",
      data: deal,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to create brand deal",
    });
  }
};

export const getBrandDeals = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const deals = await getUserBrandDeals(userId);

    return res.status(200).json({
      success: true,
      data: deals,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch brand deals",
    });
  }
};

export const removeBrandDeal = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    const paramId = req.params.id;

    const dealId = Array.isArray(paramId)
      ? paramId[0]
      : paramId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!dealId) {
      return res.status(400).json({
        success: false,
        message: "Brand deal ID is required",
      });
    }

    await deleteBrandDeal(dealId, userId);

    return res.status(200).json({
      success: true,
      message: "Brand deal deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to delete brand deal",
    });
  }
};