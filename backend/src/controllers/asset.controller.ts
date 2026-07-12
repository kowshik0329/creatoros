import { Response } from "express";
import fs from "fs";
import path from "path";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createAsset,
  deleteAsset,
  findUserAsset,
  getUserAssets,
} from "../services/asset.service";

export const uploadAsset = async (
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

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a file",
      });
    }

    const asset = await createAsset({
      originalName: req.file.originalname,
      fileName: req.file.filename,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      fileUrl: `/uploads/${req.file.filename}`,
      userId,
    });

    return res.status(201).json({
      success: true,
      message: "Asset uploaded successfully",
      data: asset,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to upload asset",
    });
  }
};

export const getAssets = async (
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

    const assets = await getUserAssets(userId);

    return res.status(200).json({
      success: true,
      data: assets,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch assets",
    });
  }
};

export const removeAsset = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    const paramId = req.params.id;

    const assetId = Array.isArray(paramId)
      ? paramId[0]
      : paramId;

    if (!userId || !assetId) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }

    const asset = await findUserAsset(assetId, userId);

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: "Asset not found",
      });
    }

    const filePath = path.join(
      process.cwd(),
      "uploads",
      asset.fileName
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await deleteAsset(assetId);

    return res.status(200).json({
      success: true,
      message: "Asset deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete asset",
    });
  }
};
