# Gmail Cleaner Agent

An HTTP agent (Express + Google APIs) that:

1. Authenticates with Gmail through OAuth2.
2. Reads the latest messages from `INBOX`.
3. Classifies each email with keyword-based local rules.
4. Builds an inbox summary and suggested actions.
5. Uses AI for inbox analysis when the AI endpoint is called.
6. Optionally applies Gmail labels from both local rules and AI review classifications.
7. Stores processed email metadata in PostgreSQL through Prisma.
8. Provides a Vite + React frontend console.

## Interview Summary

I built a Gmail AI Cleaner as a local-first email operations tool. It connects to Gmail through OAuth, reads recent inbox messages, classifies them with deterministic safety-focused rules, and stores processed email metadata in PostgreSQL using Prisma. For ambiguous emails, it uses Groq AI as a second-pass reviewer instead of blindly automating decisions. I also built a React dashboard where users can inspect summaries, review classifications, and apply safe Gmail labels. The project intentionally avoids destructive actions like deleting or archiving emails without explicit confirmation.

## v1 Status

v1 is complete.

- Professional README: this document.
- Environment template: `.env.example`.
- Frontend screenshot: [`docs/screenshots/frontend-console.png`](docs/screenshots/frontend-console.png).
- Demo GIF: [`docs/demo/frontend-workflow.gif`](docs/demo/frontend-workflow.gif).
- Endpoints documented below.
- PostgreSQL persistence runs through Prisma.
- Frontend displays processed emails saved in the database.
- Groq AI behavior is documented in the AI section.
- Credential-free backend tests cover deterministic classification and inbox summary behavior.
- Safety rule: no destructive email actions without explicit confirmation.
- `.env`, `token.json`, and `credentials.json` are ignored by Git.

## Screenshots

![Frontend console showing processed emails](docs/screenshots/frontend-console.png)

## Demo

![Frontend workflow demo](docs/demo/frontend-workflow.gif)

## Frontend

The React frontend lives in `frontend/`.

Run the backend and frontend in separate terminals:

```bash
pnpm run dev
pnpm run dev:frontend
```

Then open:

```text
http://127.0.0.1:5173
```

The frontend proxies `/api/*` to the backend at `http://localhost:3000`.

## For Reviewers

This project requires personal Gmail OAuth credentials and a Groq API key. Those credentials are intentionally not included.

You can still review:

- The source code.
- The automated tests in `test/`.
- The API documentation below.
- The database schema and Prisma migrations.
- The frontend screenshot and demo GIF.
- The architecture notes in [`ARCHITECTURE.md`](ARCHITECTURE.md).

To run it end to end, use your own Google OAuth client, your own Groq API key, and the local PostgreSQL service from `docker-compose.yml`.

## Endpoints

### Root

- `GET /` returns app status.
- `GET /health` returns uptime.

### Gmail Routes (base: `/gmail`)

### `GET /gmail/auth`

Returns a URL for authorizing Gmail access.

Response (JSON):

```json
{
  "message": "Open this URL to authorize Gmail access",
  "url": "https://accounts.google.com/o/oauth2/..."
}
```

### `GET /gmail/callback`

Google OAuth callback.

Cases:

- If `error` is present in the query string (`?error=access_denied`), returns `400`.
- If `code` is present (`?code=...`), saves `token.json` and returns success.

### `GET /gmail/messages`

Lists and classifies messages.

Response (JSON):

```json
{
  "status": "success",
  "count": 100,
  "savedCount": 100,
  "persistenceError": null,
  "inboxSummary": { "...": "..." },
  "messages": [
    {
      "id": "...",
      "from": "...",
      "subject": "...",
      "classification": {
        "category": "job",
        "importance": "medium",
        "recommendedAction": "label_as_job",
        "reason": "..."
      }
    }
  ]
}
```

### `GET /gmail/summary`

Same as `/messages`, but returns only the summary.

Response (JSON):

```json
{
  "status": "success",
  "count": 100,
  "savedCount": 100,
  "persistenceError": null,
  "inboxSummary": { "...": "..." }
}
```

### `GET /gmail/actions/preview`

Returns only `suggestedActions`, keyed by action with Gmail `messageId` arrays.

### `GET /gmail/ai-summary`

Generates an AI analysis of the current inbox summary.

This endpoint:

- Reads the latest 100 messages from `INBOX`.
- Classifies each message with local rules.
- Builds `inboxSummary`.
- Sends the summary to AI to produce `overview`, `priorityLevel`, `priorityReason`, `suggestedPlan`, and `safetyNote`.
- Sends messages marked as `review_manually` to AI for a second opinion under `aiReviewClassifications`.
- Saves processed email rows, including AI metadata when available.

The AI classification is returned as analysis. This endpoint does not apply labels or modify Gmail, but `GET/POST /gmail/actions/apply-labels` reuses the same AI classification flow to label ambiguous messages.

Response (JSON):

```json
{
  "status": "success",
  "count": 100,
  "savedCount": 100,
  "persistenceError": null,
  "inboxSummary": { "...": "..." },
  "aiSummary": {
    "overview": "...",
    "priorityLevel": "medium",
    "priorityReason": "...",
    "suggestedPlan": ["..."],
    "safetyNote": "...",
    "deterministicSuggestedPlan": ["..."]
  },
  "aiReviewClassifications": [
    {
      "messageId": "...",
      "sender": "...",
      "subject": "...",
      "suggestedCategory": "review",
      "suggestedImportance": "medium",
      "confidence": 0.7,
      "reason": "..."
    }
  ]
}
```

### `GET /gmail/actions/apply-labels`

Runs the same operation as `POST /gmail/actions/apply-labels`. This exists so the operation can be triggered from a browser during local development.

### `POST /gmail/actions/apply-labels`

Applies Gmail labels for supported local-rule actions and also labels ambiguous messages using AI-suggested categories.

Note: the request body is not used. The endpoint reads Gmail at call time, recalculates `suggestedActions`, and runs AI classification for messages marked as `review_manually`.

Response:

```json
{
  "status": "success",
  "method": "POST",
  "count": 100,
  "savedCount": 100,
  "persistenceError": null,
  "applied": {
    "AI/Job": 2,
    "AI/Promotion": 1,
    "AI/Review": 1,
    "AI/Keep-In-Inbox": 3
  },
  "deterministicLabels": {
    "AI/Job": 2,
    "AI/Promotion": 1,
    "AI/Keep-In-Inbox": 3
  },
  "aiLabels": { "AI/Review": 1 },
  "skipped": {},
  "aiReviewClassifications": [],
  "aiClassificationError": null
}
```

### Processed Email Routes (base: `/emails`)

#### `GET /emails`

Returns processed email records from PostgreSQL, ordered by newest processed rows first.

#### `GET /emails/stats`

Returns the total number of processed email records.

## Local Setup

### Requirements

- Node.js (`pnpm` is used)
- Docker Desktop
- A Google Cloud project with OAuth2 credentials
- Gmail access for the account you authorize
- A Groq API key

### Files / Environment Variables

Copy `.env.example` to `.env` and fill in local values:

```env
PORT=3000
GOOGLE_CREDENTIALS_PATH=./credentials.json
GOOGLE_TOKEN_PATH=./token.json
GROQ_API_KEY=replace_with_your_groq_api_key
DATABASE_URL="postgresql://gmail_user:gmail_password@localhost:5432/gmail_cleaner?schema=public"
```

`credentials.json` (OAuth Client) must include this redirect URI:
`http://localhost:3000/gmail/callback`

The OAuth flow creates or updates `token.json`, including the refresh token.

`GROQ_API_KEY` is required for AI classification in `GET /gmail/ai-summary` and `GET/POST /gmail/actions/apply-labels`. If AI fails, ambiguous emails remain marked for manual review and the API returns `aiClassificationError`.

`DATABASE_URL` is required for Prisma persistence.

### Google OAuth Setup

Create your own OAuth credentials. Do not reuse another developer's `credentials.json`.

1. Create a Google Cloud project.
2. Enable the Gmail API.
3. Configure the OAuth consent screen.
4. Create an OAuth client.
5. Add this redirect URI:

```text
http://localhost:3000/gmail/callback
```

6. Download the OAuth client JSON and save it in the project root as:

```text
credentials.json
```

7. Start the backend and open:

```text
http://localhost:3000/gmail/auth
```

After consent, the app creates `token.json` locally.

### Database Setup

Start PostgreSQL:

```bash
docker compose up -d
```

Apply Prisma migrations:

```bash
pnpm prisma migrate dev
```

Optional: inspect data in Prisma Studio:

```bash
pnpm prisma studio
```

### Run

```bash
pnpm install
docker compose up -d
pnpm prisma migrate dev
pnpm run dev
```

Then:

1. Visit `GET http://localhost:3000/gmail/auth`.
2. Open the returned `url` in the browser and complete Google consent.
3. Call `GET http://localhost:3000/gmail/messages`.

For the frontend:

```bash
pnpm run dev:frontend
```

Open:

```text
http://127.0.0.1:5173
```

## Tests

The backend test suite is intentionally credential-free so reviewers can run it without Gmail OAuth credentials, a Groq API key, or PostgreSQL.

Run:

```bash
pnpm test
```

Current coverage focuses on the portfolio-critical agent behavior:

- `test/classificationService.test.ts` verifies safety-oriented classification for security, critical financial, job, promotion, and unclear automatic emails.
- `test/summaryServices.test.ts` verifies inbox counts, priority-message selection, recommended next steps, and suggested label actions.

These tests protect the core promise of the project: the agent can prioritize and label email conservatively while avoiding destructive actions.

## Module Walkthrough

### `src/app.ts`

Creates the configured Express app by mounting Gmail and processed-email routes through `createApp`.

### `src/createApp.ts`

Initializes Express, enables CORS and JSON parsing, defines `GET /` and `GET /health`, and optionally mounts:

- `app.use("/gmail", gmailRoutes)`
- `app.use("/emails", emailRoutes)`

This split keeps the runtime server behavior unchanged while making app construction easier to test without loading Gmail or database dependencies.

### `src/auth/googleAuth.ts`

OAuth functions:

- `getAuthUrl()`: generates the authorization URL.
- `saveTokenFromCode(code)`: exchanges `code` for tokens and writes `token.json`.
- `getAuthorizedClient()`: loads `token.json` and configures the OAuth client.

Current scopes:

- `googleAuth.ts` uses `gmail.modify` so the app can modify labels.

### `src/services/gmailService.ts`

Gmail functions:

- `getRecentMessages(maxResults)`: lists `INBOX`, then calls `messages.get` with `format: "metadata"` for `From`, `Subject`, and `Date`.
- `getOrCreateLabel(labelName)`: finds a label by name or creates it.
- `applyLabelToMessages(messageIds, labelId)`: applies the label to each message with `users.messages.modify`.

### `src/services/classificationService.ts`

`classifyEmail(message)`:

1. Normalizes `from`, `subject`, and `snippet` to lowercase.
2. Builds `combinedText = from + subject + snippet`.
3. Applies rules based on:
   - keywords (category arrays)
   - Gmail labels (`CATEGORY_PROMOTIONS`, `CATEGORY_SOCIAL`, `CATEGORY_UPDATES`)
4. Returns:
   - `category`
   - `importance` (`high|medium|low`)
   - `recommendedAction`
   - `reason`

### `src/services/summaryServices.ts`

`createInboxSummary(classifiedMessages)`:

- Builds counters:
  - `byCategory`
  - `byImportance`
  - `byRecommendedAction`
- Creates:
  - `priorityMessages` (high-importance messages, `job` messages, or non-low `review_manually` messages)
  - `recommendedNextSteps` (text suggestions derived from `byCategory`)
  - `suggestedActions`: `Record<recommendedAction, messageIds[]>`

### `src/services/aiService.ts`

AI functions:

- `generateInboxAiSummary(inboxSummary)`: analyzes inbox statistics and priority with Groq through the OpenAI-compatible SDK.
- `classifyReviewMessagesWithAi(messages)`: gives a second opinion for ambiguous messages marked as `review_manually`, in batches of 10.

The AI client is created on demand. If `GROQ_API_KEY` is missing, only endpoints that call AI fail.

Groq is used through the OpenAI-compatible SDK with:

- `baseURL: https://api.groq.com/openai/v1`
- `model: openai/gpt-oss-20b`

If Groq returns no usable classification, ambiguous emails stay in manual review and the response includes `aiClassificationError`.

## Gmail Label Execution

`GET/POST /gmail/actions/apply-labels` uses this deterministic mapping:

- `keep_in_inbox` -> `AI/Keep-In-Inbox`
- `review_manually` -> `AI/Review`
- `label_as_job` -> `AI/Job`
- `label_as_notification` -> `AI/Notification`
- `label_as_promotion` -> `AI/Promotion`
- `keep_as_financial_critical` -> `AI/Financial-Critical`
- `archive_later` -> `AI/Archive-Later`
- `trash_candidate` -> `AI/Trash-Candidate`

For `review_manually` messages, it also calls AI and applies labels based on `suggestedCategory`:

- `important` -> `AI/Important`
- `job` -> `AI/Job`
- `payment` -> `AI/Payment`
- `security` -> `AI/Security`
- `promotion` -> `AI/Promotion`
- `newsletter` -> `AI/Newsletter`
- `notification` -> `AI/Notification`
- `review` -> `AI/Review`

Any unknown `recommendedAction` or AI category is reported in `skipped`.

For now, the agent only applies labels. It does not archive, delete, or move emails even when the applied label is `AI/Archive-Later`, `AI/Trash-Candidate`, or `AI/Keep-In-Inbox`.

## Safety And Side Effects

- `GET /gmail/messages`, `GET /gmail/summary`, `GET /gmail/actions/preview`, and `GET /gmail/ai-summary` write processed email records to PostgreSQL.
- `GET/POST /gmail/actions/apply-labels` writes processed email records and modifies Gmail labels.
- The agent only applies labels. It does not archive, delete, trash, or move emails.
- No destructive actions are performed without explicit confirmation.

## Dependency Security

The root `package.json` uses `pnpm.overrides` to pin patched transitive dependencies:

- `qs@6.15.3`
- `@hono/node-server@1.19.13`
- `esbuild@0.28.1`

Verify with:

```bash
pnpm audit --audit-level moderate
```

## Credential Notes

- `credentials.json` contains `client_secret`; keep it out of public repositories.
- `token.json` contains OAuth tokens; keep it out of public repositories.
- `.env`, `credentials.json`, `token.json`, `node_modules/`, `dist/`, and `src/test.json` are excluded in `.gitignore`.
- Commit `.env.example`, but never commit `.env`.
- `token.json` can fail with `invalid_grant` if it expires or is revoked. If that happens:
  - delete `token.json`
  - rerun the flow with `GET /gmail/auth` and confirm consent again
