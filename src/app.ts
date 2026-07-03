import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import gmailRoutes from "./routes/gmailRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/gmail", gmailRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    message: "Gmail Cleaner Agent is running",
    status: "ok",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
