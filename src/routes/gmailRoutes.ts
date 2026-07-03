import { getRecentMessages } from "../services/gmailService.js";
import { Router, type Request, type Response } from "express";
import { getAuthUrl, saveTokenFromCode } from "../auth/googleAuth.js";
import { classifyEmail } from "../services/classificationService.js";
import { createInboxSummary } from "../services/summaryServices.js";
import {
  getOrCreateLabel,
  applyLabelToMessages,
} from "../services/gmailService.js";
import {
  classifyReviewMessagesWithAi,
  generateInboxAiSummary,
} from "../services/aiService.js";
const router: Router = Router();

// Local rule actions become informational Gmail labels only.
const labelActionMap: Record<string, string> = {
  keep_in_inbox: "AI/Keep-In-Inbox",
  review_manually: "AI/Review",
  keep_as_financial_critical: "AI/Financial-Critical",
  label_as_job: "AI/Job",
  label_as_notification: "AI/Notification",
  label_as_promotion: "AI/Promotion",
  archive_later: "AI/Archive-Later",
  trash_candidate: "AI/Trash-Candidate",
};

// AI review categories are merged into the same label plan.
const aiCategoryLabelMap: Record<string, string> = {
  important: "AI/Important",
  job: "AI/Job",
  payment: "AI/Payment",
  security: "AI/Security",
  promotion: "AI/Promotion",
  newsletter: "AI/Newsletter",
  notification: "AI/Notification",
  review: "AI/Review",
};

type LabelPlan = Record<string, Set<string>>;

function addMessageToLabelPlan(
  labelPlan: LabelPlan,
  labelName: string,
  messageId: string,
) {
  const messageIds = labelPlan[labelName] ?? new Set<string>();
  messageIds.add(messageId);
  labelPlan[labelName] = messageIds;
}

router.get("/auth", (req: Request, res: Response) => {
  console.log("Gmail auth route called");
  const url = getAuthUrl();
  res.json({
    message: "Open this URL to authorize Gmail access",
    url,
  });
});
router.get("/callback", async (req: Request, res: Response) => {
  try {
    const oauthError = req.query.error;
    if (oauthError && typeof oauthError === "string") {
      const description =
        typeof req.query.error_description === "string"
          ? req.query.error_description
          : undefined;
      return res.status(400).json({
        error: "Google authorization was denied or failed",
        googleError: oauthError,
        googleErrorDescription: description,
        hint:
          oauthError === "access_denied"
            ? "Add your Google account as a test user in Google Cloud Console (OAuth consent screen), or use the same account that owns the project."
            : "Start again from GET /gmail/auth and complete the flow without refreshing this URL.",
      });
    }
    const code = req.query.code;
    if (!code || typeof code !== "string") {
      return res.status(400).json({
        error: "Missing authorization code",
        hint: "Open GET /gmail/auth, follow the url field in the browser, and let Google redirect you here automatically. Do not open /gmail/callback manually.",
      });
    }
    await saveTokenFromCode(code);
    return res.json({
      message: "Gmail authorization completed successfully",
      nextStep: "Now you can request /gmail/messages",
    });
  } catch (error) {
    console.error("Error in /gmail/callback:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    const isInvalidGrant = message.includes("invalid_grant");
    return res.status(500).json({
      error: "Failed to save Gmail token",
      details: message,
      hint: isInvalidGrant
        ? "The authorization code expired or was already used. Run GET /gmail/auth again and complete the flow once, without reloading this page."
        : "Check that credentials.json redirect URI matches exactly: http://localhost:3000/gmail/callback (localhost vs 127.0.0.1 must match everywhere).",
    });
  }
});
router.get("/messages", async (req: Request, res: Response) => {
  try {
    const messages = await getRecentMessages(10);
    const classifiedMessages = messages.map((message) => ({
      ...message,
      classification: classifyEmail(message),
    }));
    const inboxSummary = createInboxSummary(classifiedMessages);
    const payload = {
      status: "success" as const,
      count: classifiedMessages.length,
      inboxSummary,
      messages: classifiedMessages,
    };
    return res.json(payload);
  } catch (error) {
    console.error("Error in /gmail/messages:", error);
    return res.status(500).json({
      error: "Failed to get Gmail messages",
    });
  }
});
router.get("/summary", async (req: Request, res: Response) => {
  try {
    const messages = await getRecentMessages(10);
    const classifiedMessages = messages.map((message) => ({
      ...message,
      classification: classifyEmail(message),
    }));
    const inboxSummary = createInboxSummary(classifiedMessages);
    const payload = {
      status: "success" as const,
      count: classifiedMessages.length,
      inboxSummary,
    };
    return res.json(payload);
  } catch (error) {
    console.error("Error in /gmail/summary:", error);
    return res.status(500).json({
      error: "Failed to get Gmail summary",
    });
  }
});
router.get("/actions/preview", async (req: Request, res: Response) => {
  try {
    const messages = await getRecentMessages(10);
    const classifiedMessages = messages.map((message) => ({
      ...message,
      classification: classifyEmail(message),
    }));
    const inboxSummary = createInboxSummary(classifiedMessages);
    const payload = {
      status: "success" as const,
      count: classifiedMessages.length,
      suggestedActions: inboxSummary.suggestedActions,
    };
    return res.json(payload);
  } catch (error) {
    console.error("Error in /gmail/summary:", error);
    return res.status(500).json({
      error: "Failed to get Gmail summary",
    });
  }
});
router.post("/actions/apply-labels", async (req: Request, res: Response) => {
  try {
    const messages = await getRecentMessages(10);
    const classifiedMessages = messages.map((message) => ({
      ...message,
      classification: classifyEmail(message),
    }));
    const inboxSummary = createInboxSummary(classifiedMessages);
    const reviewMessages = classifiedMessages
      .filter(
        (message) =>
          message.classification.recommendedAction === "review_manually",
      )
      .map((message) => ({
        id: message.id ?? "",
        from: message.from ?? "",
        subject: message.subject ?? "",
        snippet: message.snippet ?? "",
        reason: message.classification.reason,
      }))
      .filter((message) => message.id);
    const aiReviewClassifications =
      await classifyReviewMessagesWithAi(reviewMessages);
    const labelPlan: LabelPlan = {};
    const deterministicLabels: Record<string, number> = {};
    const aiLabels: Record<string, number> = {};
    const applied: Record<string, number> = {};
    const skipped: Record<string, number> = {};
    for (const [action, messageIds] of Object.entries(
      inboxSummary.suggestedActions,
    )) {
      const labelName = labelActionMap[action];
      if (!labelName) {
        skipped[action] = messageIds.length;
        continue;
      }
      deterministicLabels[labelName] =
        (deterministicLabels[labelName] || 0) + messageIds.length;
      for (const messageId of messageIds) {
        addMessageToLabelPlan(labelPlan, labelName, messageId);
      }
    }
    for (const classification of aiReviewClassifications) {
      const labelName = aiCategoryLabelMap[classification.suggestedCategory];
      if (!labelName) {
        skipped[`ai_${classification.suggestedCategory}`] =
          (skipped[`ai_${classification.suggestedCategory}`] || 0) + 1;
        continue;
      }
      aiLabels[labelName] = (aiLabels[labelName] || 0) + 1;
      addMessageToLabelPlan(labelPlan, labelName, classification.messageId);
    }
    for (const [labelName, messageIds] of Object.entries(labelPlan)) {
      const labelId = await getOrCreateLabel(labelName);
      const appliedCount = await applyLabelToMessages(
        Array.from(messageIds),
        labelId,
      );
      applied[labelName] = appliedCount;
    }
    return res.json({
      status: "success",
      count: classifiedMessages.length,
      applied,
      deterministicLabels,
      aiLabels,
      skipped,
      aiReviewClassifications,
    });
  } catch (error) {
    console.error("Error in post: actions/apply-labels:", error);
    return res.status(500).json({
      error: "Failed to apply labels",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});
router.get("/ai-summary", async (_req: Request, res: Response) => {
  try {
    const messages = await getRecentMessages(10);
    const classifiedMessages = messages.map((message) => ({
      ...message,
      classification: classifyEmail(message),
    }));
    const inboxSummary = createInboxSummary(classifiedMessages);
    const reviewMessages = classifiedMessages
      .filter(
        (message) =>
          message.classification.recommendedAction === "review_manually",
      )
      .map((message) => ({
        id: message.id ?? "",
        from: message.from ?? "",
        subject: message.subject ?? "",
        snippet: message.snippet ?? "",
        reason: message.classification.reason,
      }))
      .filter((message) => message.id);
    const generatedAiSummary = await generateInboxAiSummary(inboxSummary);
    const aiReviewClassifications =
      await classifyReviewMessagesWithAi(reviewMessages);
    const aiSummary = {
      ...generatedAiSummary,
      deterministicSuggestedPlan: inboxSummary.recommendedNextSteps,
    };
    return res.json({
      status: "success",
      count: classifiedMessages.length,
      inboxSummary,
      aiSummary,
      aiReviewClassifications,
    });
  } catch (error) {
    console.error("Error in GET /gmail/ai-summary:", error);
    return res.status(500).json({
      status: "error",
      error: "Failed to generate AI inbox summary",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});
export default router;
