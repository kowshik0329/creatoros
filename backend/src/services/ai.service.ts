import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateCaption = async (
  topic: string,
  platform: string,
  tone: string
) => {
  const interaction = await ai.interactions.create({
    model: "gemini-3.5-flash",
    system_instruction:
      "You are an expert social media content creator. Generate engaging captions with suitable emojis and hashtags.",
    input: `
Create one social media caption.

Topic: ${topic}
Platform: ${platform}
Tone: ${tone}

Return only the final caption.
`,
  });

  const caption = interaction.output_text;

  if (!caption) {
    throw new Error("AI did not generate a caption");
  }

  return caption;
};