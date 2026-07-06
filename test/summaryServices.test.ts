import assert from "node:assert/strict";
import test from "node:test";
import { createInboxSummary } from "../src/services/summaryServices.js";
import type { ClassifiedGmailMessage } from "../src/services/summaryServices.js";

function classifiedMessage(
  id: string,
  classification: ClassifiedGmailMessage["classification"],
): ClassifiedGmailMessage {
  return {
    id,
    threadId: `thread-${id}`,
    from: "sender@example.com",
    subject: `Subject ${id}`,
    date: "2026-07-06",
    snippet: "",
    labelIds: [],
    classification,
  };
}

test("summarizes category, importance, action counts, and label plan", () => {
  const summary = createInboxSummary([
    classifiedMessage("security-1", {
      category: "security",
      importance: "high",
      recommendedAction: "review_manually",
      reason: "Security alert.",
    }),
    classifiedMessage("job-1", {
      category: "job",
      importance: "medium",
      recommendedAction: "label_as_job",
      reason: "Job alert.",
    }),
    classifiedMessage("promotion-1", {
      category: "promotion",
      importance: "low",
      recommendedAction: "label_as_promotion",
      reason: "Promotional offer.",
    }),
  ]);

  assert.equal(summary.total, 3);
  assert.deepEqual(summary.byCategory, {
    security: 1,
    job: 1,
    promotion: 1,
  });
  assert.deepEqual(summary.byImportance, {
    high: 1,
    medium: 1,
    low: 1,
  });
  assert.deepEqual(summary.byRecommendedAction, {
    review_manually: 1,
    label_as_job: 1,
    label_as_promotion: 1,
  });
  assert.deepEqual(summary.suggestedActions, {
    review_manually: ["security-1"],
    label_as_job: ["job-1"],
    label_as_promotion: ["promotion-1"],
  });
});

test("keeps priority messages focused on urgent, job, and manual-review work", () => {
  const summary = createInboxSummary([
    classifiedMessage("payment-1", {
      category: "payment",
      importance: "high",
      recommendedAction: "keep_in_inbox",
      reason: "Payment due.",
    }),
    classifiedMessage("job-1", {
      category: "job",
      importance: "medium",
      recommendedAction: "label_as_job",
      reason: "Recruiter message.",
    }),
    classifiedMessage("newsletter-1", {
      category: "newsletter",
      importance: "low",
      recommendedAction: "archive_later",
      reason: "Newsletter.",
    }),
  ]);

  assert.deepEqual(
    summary.priorityMessages.map((message) => message.id),
    ["payment-1", "job-1"],
  );
  assert.match(summary.recommendedNextSteps.join(" "), /Keep 1 payment/);
  assert.match(summary.recommendedNextSteps.join(" "), /Check 1 job/);
});

test("returns a calm default next step when there is no urgent work", () => {
  const summary = createInboxSummary([]);

  assert.equal(summary.total, 0);
  assert.deepEqual(summary.priorityMessages, []);
  assert.deepEqual(summary.recommendedNextSteps, [
    "No urgent action needed for these emails.",
  ]);
});
