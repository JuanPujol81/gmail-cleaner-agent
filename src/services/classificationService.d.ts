import type { GmailMessageSummary } from "../types/gmailMessage.js";
export type EmailCategory = "important" | "job" | "payment" | "financial_critical" | "security" | "promotion" | "newsletter" | "notification" | "review" | "probable_trash";
export type RecommendedAction = "keep_in_inbox" | "review_manually" | "label_as_job" | "label_as_promotion" | "label_as_notification" | "keep_as_financial_critical" | "archive_later" | "trash_candidate";
export type EmailClassification = {
    category: EmailCategory;
    importance: "high" | "medium" | "low";
    recommendedAction: RecommendedAction;
    reason: string;
};
export declare function classifyEmail(message: GmailMessageSummary): EmailClassification;
//# sourceMappingURL=classificationService.d.ts.map