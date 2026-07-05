import { prisma } from "../lib/prisma.js";
import type { AiReviewClassification } from "./aiService.js";
import type { EmailClassification } from "./classificationService.js";
import type { GmailMessageSummary } from "../types/gmailMessage.js";

export type ProcessedEmailInput = GmailMessageSummary & {
  classification: EmailClassification;
  aiClassification?: AiReviewClassification;
  labelApplied?: boolean;
};

async function upsertProcessedEmail(message: ProcessedEmailInput) {
  if (!message.id) {
    throw new Error("Cannot save a processed email without a Gmail message id.");
  }

  const data = {
    gmailMessageId: message.id,
    threadId: message.threadId,
    sender: message.from,
    subject: message.subject,
    date: message.date,
    snippet: message.snippet,
    category: message.classification.category,
    importance: message.classification.importance,
    recommendedAction: message.classification.recommendedAction,
    classificationReason: message.classification.reason,
  };

  return prisma.processedEmail.upsert({
    where: {
      gmailMessageId: message.id,
    },
    create: {
      ...data,
      threadId: data.threadId ?? null,
      snippet: data.snippet ?? null,
      aiCategory: message.aiClassification?.suggestedCategory ?? null,
      aiConfidence: message.aiClassification?.confidence ?? null,
      aiReason: message.aiClassification?.reason ?? null,
      labelApplied: message.labelApplied ?? false,
    },
    update: {
      ...data,
      threadId: data.threadId ?? null,
      snippet: data.snippet ?? null,
      ...(message.aiClassification
        ? {
            aiCategory: message.aiClassification.suggestedCategory,
            aiConfidence: message.aiClassification.confidence,
            aiReason: message.aiClassification.reason,
          }
        : {}),
      ...(message.labelApplied !== undefined
        ? {
            labelApplied: message.labelApplied,
          }
        : {}),
    },
  });
}

export async function saveProcessedEmails(messages: ProcessedEmailInput[]) {
  return Promise.all(messages.map((message) => upsertProcessedEmail(message)));
}

export async function findProcessedEmails() {
  return prisma.processedEmail.findMany({
    orderBy: {
      processedAt: "desc",
    },
  });
}

export async function countProcessedEmails() {
  return prisma.processedEmail.count();
}

export function saveProcessedEmail(
  message: ProcessedEmailInput,
): ReturnType<typeof upsertProcessedEmail>;
export function saveProcessedEmail(
  message: ProcessedEmailInput[],
): ReturnType<typeof saveProcessedEmails>;
export async function saveProcessedEmail(
  message: ProcessedEmailInput | ProcessedEmailInput[],
) {
  if (Array.isArray(message)) {
    return saveProcessedEmails(message);
  }

  return upsertProcessedEmail(message);
}
