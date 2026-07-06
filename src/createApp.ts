import express, { type Express, type Router } from "express";
import cors from "cors";

type CreateAppOptions = {
  gmailRoutes?: Router;
  emailRoutes?: Router;
};

export function createApp(options: CreateAppOptions = {}): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  if (options.gmailRoutes) {
    app.use("/gmail", options.gmailRoutes);
  }

  if (options.emailRoutes) {
    app.use("/emails", options.emailRoutes);
  }

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

  return app;
}
