import express from "express";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth.routes";
import contentRoutes from "./routes/content.routes";
import aiRoutes from "./routes/ai.routes";
import brandDealRoutes from "./routes/brandDeal.routes";
import assetRoutes from "./routes/asset.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

app.get("/", (req, res) => {
  res.send("🚀 CreatorOS Backend is Running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/brand-deals", brandDealRoutes);
app.use("/api/assets", assetRoutes);

export default app;