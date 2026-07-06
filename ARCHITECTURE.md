# Architecture

Gmail Cleaner Agent is a local-first email operations tool. It combines an Express API, Gmail OAuth, deterministic classification rules, Groq AI review, PostgreSQL persistence, and a Vite React frontend.

## System Overview

```text
Browser
  |
  | Vite dev server /api proxy
  v
React Frontend
  |
  | HTTP JSON
  v
Express API
  |------------- Gmail API
  |------------- Groq OpenAI-compatible API
  |------------- Prisma Client
                    |
                    v
                PostgreSQL
```

## Backend

The backend lives in `src/`.

- `src/app.ts` creates the configured Express app by passing Gmail and processed-email routes into `createApp`.
- `src/createApp.ts` owns Express app construction so basic app behavior can be exercised without starting the server or loading credential-dependent routes.
- `src/routes/gmailRoutes.ts` exposes Gmail workflows: auth, fetch, classify, AI summary, preview labels, and apply labels.
- `src/routes/emailRoutes.ts` exposes processed-email database reads.
- `src/services/gmailService.ts` wraps Gmail API calls.
- `src/services/classificationService.ts` contains deterministic keyword classification.
- `src/services/summaryServices.ts` builds counts, priority messages, next steps, and suggested actions.
- `src/services/aiService.ts` calls Groq through the OpenAI-compatible SDK.
- `src/services/emailRepository.ts` persists processed email metadata through Prisma.

## Frontend

The frontend lives in `frontend/`.

- Vite serves the React app.
- `frontend/vite.config.ts` proxies `/api/*` to `http://localhost:3000`.
- `frontend/src/App.tsx` provides the local operations console.
- The UI can authorize Gmail, load messages, run AI summary, preview labels, apply labels, and display saved processed emails.

## Database

PostgreSQL is managed locally with Docker Compose.

The core table is `ProcessedEmail`, defined in `prisma/schema.prisma`.

Important fields:

- `gmailMessageId`: unique Gmail message id.
- `category`, `importance`, `recommendedAction`, `classificationReason`: deterministic local classification.
- `aiCategory`, `aiConfidence`, `aiReason`: Groq review metadata for ambiguous emails.
- `labelApplied`: whether the app applied a Gmail label.
- `processedAt`, `updatedAt`: persistence timestamps.

## AI Flow

Only emails marked with `recommendedAction: "review_manually"` are sent to Groq for second-pass review.

Groq is used through:

```text
baseURL: https://api.groq.com/openai/v1
model: openai/gpt-oss-20b
```

AI review runs in batches of 10 to keep responses stable. If Groq fails or returns unusable output, the email stays marked for manual review and the API exposes `aiClassificationError`.

## Safety Model

The project is intentionally conservative:

- It applies Gmail labels only.
- It does not archive, delete, trash, or move emails.
- Destructive actions should require explicit confirmation before being added.
- Secrets are never committed: `.env`, `credentials.json`, and `token.json` are ignored.

## Testing Strategy

Tests use Node's built-in test runner through `tsx`, so the backend does not need an additional test framework.

The current suite is deliberately focused on credential-free logic:

- `test/classificationService.test.ts` covers deterministic rules for security, critical financial, job, promotion, and unclear automatic emails.
- `test/summaryServices.test.ts` covers aggregate counts, priority-message selection, recommended next steps, and suggested label actions.

This keeps the portfolio review path practical: the most important safety and prioritization behavior can be verified without Gmail OAuth, Groq, PostgreSQL, or private local files.

## Local Runtime Dependencies

- Node.js and pnpm.
- Docker Desktop for PostgreSQL.
- Google OAuth credentials with Gmail API enabled.
- Groq API key.
