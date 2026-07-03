import "dotenv/config";
import OpenAI from "openai";
function getOpenAiClient() {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        throw new Error("GROQ_API_KEY is missing. Add it to the .env file in the project root.");
    }
    return new OpenAI({
        apiKey,
        baseURL: "https://api.groq.com/openai/v1",
    });
}
function getSenderName(from) {
    const senderName = from.split("<")[0] ?? from;
    return senderName.replaceAll('"', "").trim();
}
export async function generateInboxAiSummary(inboxSummary) {
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
    const response = await getOpenAiClient().responses.create({
        model: "openai/gpt-oss-20b",
        input: [
            {
                role: "system",
                content: `You are an email productivity assistant.
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
            },
            {
                role: "user",
                content: JSON.stringify({
                    task: "Analyze this inbox summary and create a useful action plan.",
                    inbox: aiInput,
                }),
            },
        ],
    });
    const text = response.output_text;
    if (!text) {
        throw new Error("The AI returned an empty response");
    }
    const parsedSummary = JSON.parse(text);
    if (typeof parsedSummary !== "object" ||
        parsedSummary === null ||
        !("overview" in parsedSummary) ||
        !("priorityLevel" in parsedSummary) ||
        !("priorityReason" in parsedSummary) ||
        !("suggestedPlan" in parsedSummary) ||
        !("safetyNote" in parsedSummary)) {
        throw new Error("The AI returned an invalid summary structure");
    }
    return parsedSummary;
}
export async function classifyReviewMessagesWithAi(messages) {
    if (messages.length === 0) {
        return [];
    }
    const aiInput = messages.map((message) => ({
        messageId: message.id,
        sender: getSenderName(message.from),
        subject: message.subject,
        snippet: message.snippet ?? "",
        currentReason: message.reason,
    }));
    const response = await getOpenAiClient().responses.create({
        model: "openai/gpt-oss-20b",
        input: [
            {
                role: "system",
                content: `You classify ambiguous emails.

            Return only a valid JSON array.
            
            Each item must contain exactly:
            {
                "messageId": "string",
                "sender": "string",
                "subject": "string",
                "suggestedCategory": "important | job | payment | security | promotion | newsletter | notification | review",
                "suggestedImportance": "high | medium | low",
                "confidence": 0.0,
                "reason": "string"
            }
            
            Rules:
            - confidence must be between 0 and 1.
            - Keep category as review if there is insufficient information.
            - Discount offers and commercial offers are usually promotion.
            - Job alerts and vacancies are job.
            - Password resets, suspicious login attempts, and verification codes are security.
            - Invoices, receipts, charges, and payment confirmations are payment.
            - Personal or potentially sensitive messages may be important.
            - Do not invent message content.
            - Do not include Markdown or text outside the JSON array.`,
            },
            {
                role: "user",
                content: JSON.stringify({
                    task: "Classify these ambiguous emails.",
                    messages: aiInput,
                }),
            },
        ],
    });
    const text = response.output_text;
    if (!text) {
        throw new Error("The AI returned an empty classification response");
    }
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) {
        throw new Error("The AI classification response is not an array");
    }
    return parsed;
}
//# sourceMappingURL=aiService.js.map