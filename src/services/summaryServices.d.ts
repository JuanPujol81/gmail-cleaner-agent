import type { GmailMessageSummary } from "../types/gmailMessage.js";
import type { EmailClassification } from "./classificationService.js";
export type ClassifiedGmailMessage = GmailMessageSummary & {
    classification: EmailClassification;
};
export type SuggestedActions = Record<string, string[]>;
export type PriorityMessage = {
    id: string;
    from: string;
    subject: string;
    date: string;
    category: string;
    importance: string;
    recommendedAction: string;
    reason: string;
};
export type InboxSummary = {
    total: number;
    byCategory: Record<string, number>;
    byImportance: Record<string, number>;
    byRecommendedAction: Record<string, number>;
    priorityMessages: PriorityMessage[];
    recommendedNextSteps: string[];
    suggestedActions: SuggestedActions;
};
export declare function createInboxSummary(messages: ClassifiedGmailMessage[]): InboxSummary;
//# sourceMappingURL=summaryServices.d.ts.map