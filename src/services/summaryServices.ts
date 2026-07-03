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

function incrementCounter(counter: Record<string, number>, key: string) {
  counter[key] = (counter[key] || 0) + 1;
}

function addSuggestedActions(
  suggestedActions: SuggestedActions,
  action: string,
  messageID: string,
) {
  if (!suggestedActions[action]) {
    suggestedActions[action] = [];
  }
  suggestedActions[action].push(messageID);
}

function isPriorityMessage(message: ClassifiedGmailMessage): boolean {
  const { category, importance, recommendedAction } = message.classification;
  return (
    message.classification.importance === "high" ||
    message.classification.category === "job" ||
    (message.classification.recommendedAction === "review_manually" &&
      message.classification.importance !== "low")
  );
}

function toPriorityMessage(message: ClassifiedGmailMessage): PriorityMessage {
  return {
    id: message.id ?? "",
    from: message.from ?? "",
    subject: message.subject ?? "",
    date: message.date ?? "",
    category: message.classification.category,
    importance: message.classification.importance,
    recommendedAction: message.classification.recommendedAction,
    reason: message.classification.reason,
  };
}

function createRecommendedNextSteps(
  summary: Omit<InboxSummary, "recommendedNextSteps">,
): string[] {
  const steps: string[] = [];

  const securityCount = summary.byCategory.security || 0;
  const paymentCount = summary.byCategory.payment || 0;
  const importantCount = summary.byCategory.important || 0;
  const jobCount = summary.byCategory.job || 0;
  const promotionCount = summary.byCategory.promotion || 0;
  const notificationCount = summary.byCategory.notification || 0;
  const newsletterCount = summary.byCategory.newsletter || 0;
  const reviewCount = summary.byCategory.review || 0;
  const financialCriticalCount = summary.byCategory.financial_critical || 0;

  if (securityCount > 0) {
    steps.push(
      `Review ${securityCount} security-related email${securityCount > 1 ? "s" : ""} first.`,
    );
  }
  if (paymentCount > 0) {
    steps.push(
      `Keep ${paymentCount} payment-related email${paymentCount > 1 ? "s" : ""} in the inbox.`,
    );
  }
  if (financialCriticalCount > 0) {
    steps.push(
      `Review ${financialCriticalCount} critical financial email${
        financialCriticalCount > 1 ? "s" : ""
      } first.`,
    );
  }
  if (importantCount > 0) {
    steps.push(
      `Review ${importantCount} important email${importantCount > 1 ? "s" : ""} today.`,
    );
  }
  if (jobCount > 0) {
    steps.push(
      `Check ${jobCount} job-related email${jobCount > 1 ? "s" : ""} when you have time.`,
    );
  }
  if (notificationCount > 0) {
    steps.push(
      `Label ${notificationCount} notification email${notificationCount > 1 ? "s" : ""} as notification.`,
    );
  }
  if (promotionCount > 0) {
    steps.push(
      `Label ${promotionCount} promotional email${promotionCount > 1 ? "s" : ""} as promotion.`,
    );
  }
  if (newsletterCount > 0) {
    steps.push(
      `Archive ${newsletterCount} newsletter email${newsletterCount > 1 ? "s" : ""} later.`,
    );
  }
  if (reviewCount > 0) {
    steps.push(
      `Manually review ${reviewCount} email${reviewCount > 1 ? "s" : ""} that did not match a strong rule.`,
    );
  }
  if (steps.length === 0) {
    steps.push("No urgent action needed for these emails.");
  }
  return steps;
}

export function createInboxSummary(
  messages: ClassifiedGmailMessage[],
): InboxSummary {
  const summaryWithoutSteps: Omit<InboxSummary, "recommendedNextSteps"> = {
    total: messages.length,

    byCategory: {},

    byImportance: {},

    byRecommendedAction: {},

    priorityMessages: [],

    suggestedActions: {},
  };

  for (const message of messages) {
    incrementCounter(
      summaryWithoutSteps.byCategory,
      message.classification.category,
    );

    incrementCounter(
      summaryWithoutSteps.byImportance,
      message.classification.importance,
    );

    incrementCounter(
      summaryWithoutSteps.byRecommendedAction,

      message.classification.recommendedAction,
    );

    if (message.id) {
      addSuggestedActions(
        summaryWithoutSteps.suggestedActions,
        message.classification.recommendedAction,
        message.id,
      );
    }

    if (isPriorityMessage(message)) {
      summaryWithoutSteps.priorityMessages.push(toPriorityMessage(message));
    }
  }

  return {
    ...summaryWithoutSteps,

    recommendedNextSteps: createRecommendedNextSteps(summaryWithoutSteps),
  };
}
