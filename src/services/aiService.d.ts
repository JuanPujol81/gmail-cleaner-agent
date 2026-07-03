import "dotenv/config";
import type { InboxSummary } from "../services/summaryServices.js";
export type AiInboxSummary = {
    overview: string;
    priorityLevel: "high" | "medium" | "low";
    priorityReason: string;
    suggestedPlan: string[];
    safetyNote: string;
};
export type AiReviewClassification = {
    messageId: string;
    sender: string;
    subject: string;
    suggestedCategory: "important" | "job" | "payment" | "security" | "promotion" | "newsletter" | "notification" | "review";
    suggestedImportance: "high" | "medium" | "low";
    confidence: number;
    reason: string;
};
export type ReviewMessageInput = {
    id: string;
    from: string;
    subject: string;
    snippet?: string;
    reason: string;
};
export declare function generateInboxAiSummary(inboxSummary: InboxSummary): Promise<AiInboxSummary>;
export declare function classifyReviewMessagesWithAi(messages: ReviewMessageInput[]): Promise<AiReviewClassification[]>;
//# sourceMappingURL=aiService.d.ts.map