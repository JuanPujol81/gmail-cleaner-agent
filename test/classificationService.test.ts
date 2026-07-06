import assert from "node:assert/strict";
import test from "node:test";
import { classifyEmail } from "../src/services/classificationService.js";
import type { GmailMessageSummary } from "../src/types/gmailMessage.js";

function message(overrides: Partial<GmailMessageSummary>): GmailMessageSummary {
  return {
    id: "message-1",
    threadId: "thread-1",
    from: "sender@example.com",
    subject: "",
    date: "2026-07-06",
    snippet: "",
    labelIds: [],
    ...overrides,
  };
}

test("classifies security emails as high priority manual review", () => {
  const classification = classifyEmail(
    message({
      subject: "Security alert: new login",
      snippet: "We detected a new login attempt.",
    }),
  );

  assert.equal(classification.category, "security");
  assert.equal(classification.importance, "high");
  assert.equal(classification.recommendedAction, "review_manually");
});

test("keeps critical financial emails in the inbox", () => {
  const classification = classifyEmail(
    message({
      from: "Credibom <billing@credibom.pt>",
      subject: "Prestacao mensal pendente",
      snippet: "Existe um valor em divida.",
    }),
  );

  assert.equal(classification.category, "financial_critical");
  assert.equal(classification.importance, "high");
  assert.equal(classification.recommendedAction, "keep_as_financial_critical");
});

test("labels job emails without treating them as destructive actions", () => {
  const classification = classifyEmail(
    message({
      subject: "Frontend developer interview",
      snippet: "A recruiter reviewed your application.",
    }),
  );

  assert.equal(classification.category, "job");
  assert.equal(classification.importance, "medium");
  assert.equal(classification.recommendedAction, "label_as_job");
});

test("uses Gmail promotion labels as low priority promotion signals", () => {
  const classification = classifyEmail(
    message({
      subject: "Weekend offer",
      labelIds: ["CATEGORY_PROMOTIONS"],
    }),
  );

  assert.equal(classification.category, "promotion");
  assert.equal(classification.importance, "low");
  assert.equal(classification.recommendedAction, "label_as_promotion");
});

test("keeps unclear automatic senders in manual review", () => {
  const classification = classifyEmail(
    message({
      from: "no-reply@example.com",
      subject: "Your account",
      snippet: "Please check this message.",
    }),
  );

  assert.equal(classification.category, "review");
  assert.equal(classification.importance, "low");
  assert.equal(classification.recommendedAction, "review_manually");
});
