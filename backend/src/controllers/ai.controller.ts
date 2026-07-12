import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { generateCaption } from "../services/ai.service";

export const createCaption = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { topic, platform, tone } = req.body;

    if (!topic || !platform || !tone) {
      return res.status(400).json({
        success: false,
        message: "Topic, platform and tone are required",
      });
    }

    const caption = await generateCaption(
      topic,
      platform,
      tone
    );

    return res.status(200).json({
      success: true,
      message: "Caption generated successfully",
      data: {
        caption,
      },
    });
  } catch (error) {
    console.error("AI Caption Error:", error);

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to generate caption",
    });
  }
};