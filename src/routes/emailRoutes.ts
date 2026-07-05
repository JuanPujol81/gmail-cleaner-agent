import { Router, type Request, type Response } from "express";
import {
  countProcessedEmails,
  findProcessedEmails,
} from "../services/emailRepository.js";

const router: Router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const emails = await findProcessedEmails();
    return res.json({
      status: "success",
      count: emails.length,
      emails,
    });
  } catch (error) {
    console.error("Error in GET /email:", error);
    return res.status(500).json({
      status: "error",
      error: "Failed to find processed emails",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

router.get("/stats", async (_req: Request, res: Response) => {
  try {
    const total = await countProcessedEmails();

    return res.json({
      status: "success",
      total,
    });
  } catch (error) {
    console.error("Error in GET /emails/stats:", error);

    return res.status(500).json({
      status: "error",

      error: "Failed to fetch email stats",

      details: error instanceof Error ? error.message : String(error),
    });
  }
});

export default router;
