import "dotenv/config";
import OpenAI from "openai";
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
  suggestedCategory:
    | "important"
    | "job"
    | "payment"
    | "security"
    | "promotion"
    | "newsletter"
    | "notification"
    | "review";
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

type AiReviewClassificationResponse = {
  classifications: AiReviewClassification[];
};

const AI_REVIEW_BATCH_SIZE = 10;

function getOpenAiClient() {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY is missing. Add it to the .env file in the project root.",
    );
  }

  return new OpenAI({
    apiKey,
    baseURL: "https://api.groq.com/openai/v1",
  });
}

function getSenderName(from: string): string {
  const senderName = from.split("<")[0] ?? from;
  return senderName.replaceAll('"', "").trim();
}

function extractJsonText(text: string, preferredShape: "object" | "array"): string {
  const trimmed = text.trim();
  const withoutFence = trimmed
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  const objectStart = withoutFence.indexOf("{");
  const objectEnd = withoutFence.lastIndexOf("}");
  const arrayStart = withoutFence.indexOf("[");
  const arrayEnd = withoutFence.lastIndexOf("]");

  if (preferredShape === "array" && arrayStart !== -1 && arrayEnd > arrayStart) {
    return withoutFence.slice(arrayStart, arrayEnd + 1);
  }

  if (
    preferredShape === "object" &&
    objectStart !== -1 &&
    objectEnd > objectStart
  ) {
    return withoutFence.slice(objectStart, objectEnd + 1);
  }

  if (objectStart !== -1 && objectEnd > objectStart) {
    return withoutFence.slice(objectStart, objectEnd + 1);
  }

  if (arrayStart !== -1 && arrayEnd > arrayStart) {
    return withoutFence.slice(arrayStart, arrayEnd + 1);
  }

  return withoutFence;
}

async function createChatCompletionText(
  systemPrompt: string,
  userInput: unknown,
  options: { jsonObject?: boolean } = {},
) {
  const response = await getOpenAiClient().chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: JSON.stringify(userInput),
      },
    ],
    temperature: 0,
    ...(options.jsonObject
      ? {
          response_format: {
            type: "json_object" as const,
          },
        }
      : {}),
  });

  return response.choices[0]?.message?.content?.trim() ?? "";
}

function chunkArray<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

function createFallbackInboxAiSummary(
  inboxSummary: InboxSummary,
): AiInboxSummary {
  const highCount = inboxSummary.byImportance.high || 0;
  const mediumCount = inboxSummary.byImportance.medium || 0;
  const reviewCount = inboxSummary.byRecommendedAction.review_manually || 0;
  const priorityLevel =
    highCount > 0 ? "high" : mediumCount > 0 || reviewCount > 0 ? "medium" : "low";

  return {
    overview: `Found ${inboxSummary.total} recent email${inboxSummary.total === 1 ? "" : "s"}.`,
    priorityLevel,
    priorityReason:
      highCount > 0
        ? `${highCount} high-priority email${highCount === 1 ? "" : "s"} should be reviewed first.`
        : reviewCount > 0
          ? `${reviewCount} email${reviewCount === 1 ? "" : "s"} need manual review.`
          : "No high-priority email was detected by the local rules.",
    suggestedPlan: inboxSummary.recommendedNextSteps,
    safetyNote:
      "Do not delete, archive, or move emails without explicit confirmation.",
  };
}

export async function generateInboxAiSummary(
  inboxSummary: InboxSummary,
): Promise<AiInboxSummary> {
  const aiInput = {
    statistics: {
      total: inboxSummary.total,
      byCategory: inboxSummary.byCategory,
      byImportance: inboxSummary.byImportance,
      byRecommendedAction: inboxSummary.byRecommendedAction,
    },
    priorityMessages: inboxSummary.priorityMessages.map((message) => ({
      from: getSenderName(message.from),
      subject: message.subject,
      category: message.category,
      importance: message.importance,
      recommendedAction: message.recommendedAction,
      reason: message.reason,
    })),
    recommendedNextSteps: inboxSummary.recommendedNextSteps,
  };
  const text = await createChatCompletionText(
    `You are an email productivity assistant.
                        Return only valid JSON with exactly these properties:
                        {
                            "overview": "A short summary of the inbox",
                            "priorityLevel": "high, medium, or low",
                            "priorityReason": "A complete sentence explaining the priority level and which messages should be reviewed first",
                            "suggestedPlan": ["Action one", "Action two"],
                            "safetyNote": "A safety reminder"
                        }

                        Rules:
                        "Use the statistics exactly as provided. Never invent, alter, or omit counts. If byImportance contains 7 medium and 3 low, state exactly that."
                        - priorityLevel must be exactly "high", "medium", or "low".
                        - priorityReason must explain why that priority was selected.
                        - Do not recommend deleting or archiving emails without explicit user confirmation.
                        - Do not include Markdown.
                        - Do not include text outside the JSON object.
                        - When recommending a manual review, identify the email using its sender and subject.
                        - Mention the most relevant manual-review messages individually.
                        - Do not group all manual-review messages into one generic instruction.
                        - Do not recommend creating backups.
                        - The safety note must focus on requiring confirmation before deleting or archiving messages.
                        - suggestedPlan must cover every entry in recommendedNextSteps.
                        - Do not omit any category or recommended action with a count greater than zero.
                        - If job, review, and promotion actions are present, suggestedPlan must include all three.- Base priorityLevel on urgency, sensitivity, importance, and required manual attention.
                        - Do not base priority only on whether category counts are equal.
                        - If there are no high-importance messages but several medium-importance messages requiring attention, use medium.`,
    {
      task: "Analyze this inbox summary and create a useful action plan.",
      inbox: aiInput,
    },
  );

  if (!text) {
    return createFallbackInboxAiSummary(inboxSummary);
  }

  let parsedSummary: AiInboxSummary;

  try {
    parsedSummary = JSON.parse(extractJsonText(text, "object")) as AiInboxSummary;
  } catch {
    return createFallbackInboxAiSummary(inboxSummary);
  }

  if (
    typeof parsedSummary !== "object" ||
    parsedSummary === null ||
    !("overview" in parsedSummary) ||
    !("priorityLevel" in parsedSummary) ||
    !("priorityReason" in parsedSummary) ||
    !("suggestedPlan" in parsedSummary) ||
    !("safetyNote" in parsedSummary)
  ) {
    return createFallbackInboxAiSummary(inboxSummary);
  }

  return parsedSummary;
}

async function classifyReviewMessageBatch(
  messages: ReviewMessageInput[],
): Promise<AiReviewClassification[]> {
  const aiInput = messages.map((message) => ({
    messageId: message.id,
    sender: getSenderName(message.from),
    subject: message.subject,
    snippet: message.snippet ?? "",
    currentReason: message.reason,
  }));

  const text = await createChatCompletionText(
    `You classify ambiguous emails.

            Return only a valid JSON object with exactly this shape:
            {
              "classifications": [
                {
                  "messageId": "string",
                  "sender": "string",
                  "subject": "string",
                  "suggestedCategory": "important | job | payment | security | promotion | newsletter | notification | review",
                  "suggestedImportance": "high | medium | low",
                  "confidence": 0.0,
                  "reason": "string"
                }
              ]
            }
            
            Include one classification for every input message.
            
            Rules:
            - confidence must be between 0 and 1.
            - Keep category as review if there is insufficient information.
            - Discount offers and commercial offers are usually promotion.
            - Job alerts and vacancies are job.
            - Password resets, suspicious login attempts, and verification codes are security.
            - Invoices, receipts, charges, and payment confirmations are payment.
            - Personal or potentially sensitive messages may be important.
            - Do not invent message content.
            - Do not include Markdown or text outside the JSON object.`,
    {
      task: "Classify these ambiguous emails.",
      messages: aiInput,
    },
    {
      jsonObject: true,
    },
  );

  if (!text) {
    return [];
  }

  const parsed: unknown = JSON.parse(extractJsonText(text, "object"));
  const classifications = Array.isArray(parsed)
    ? parsed
    : (parsed as Partial<AiReviewClassificationResponse>).classifications;

  if (!Array.isArray(classifications)) {
    throw new Error("The AI classification response is missing classifications");
  }

  return classifications as AiReviewClassification[];
}

export async function classifyReviewMessagesWithAi(
  messages: ReviewMessageInput[],
): Promise<AiReviewClassification[]> {
  if (messages.length === 0) {
    return [];
  }

  const classifications: AiReviewClassification[] = [];

  for (const batch of chunkArray(messages, AI_REVIEW_BATCH_SIZE)) {
    classifications.push(...(await classifyReviewMessageBatch(batch)));
  }

  return classifications;
}
