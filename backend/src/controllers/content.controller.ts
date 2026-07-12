import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createContent,
  deleteContent,
  getUserContents,
  updateContent,
} from "../services/content.service";

export const addContent = async (
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

    const {
      title,
      description,
      platform,
      contentDate,
      status,
    } = req.body;

    const content = await createContent({
      title,
      description,
      platform,
      contentDate,
      status,
      userId,
    });

    return res.status(201).json({
      success: true,
      message: "Content created successfully",
      data: content,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

export const getContents = async (
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

    const contents = await getUserContents(userId);

    return res.status(200).json({
      success: true,
      data: contents,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch content",
    });
  }
};

export const editContent = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    const paramId = req.params.id;

    const contentId = Array.isArray(paramId)
      ? paramId[0]
      : paramId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!contentId) {
      return res.status(400).json({
        success: false,
        message: "Content ID is required",
      });
    }

    const content = await updateContent(
      contentId,
      userId,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Content updated successfully",
      data: content,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

export const removeContent = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    const paramId = req.params.id;

    const contentId = Array.isArray(paramId)
      ? paramId[0]
      : paramId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!contentId) {
      return res.status(400).json({
        success: false,
        message: "Content ID is required",
      });
    }

    await deleteContent(contentId, userId);

    return res.status(200).json({
      success: true,
      message: "Content deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};