# Gmail Cleaner Agent

An HTTP agent (Express + Google APIs) that:

1. Authenticates with Gmail through OAuth2.
2. Reads the latest messages from `INBOX`.
3. Classifies each email with keyword-based local rules.
4. Builds an inbox summary and suggested actions.
5. Uses AI for inbox analysis when the AI endpoint is called.
6. Optionally applies Gmail labels from both local rules and AI review classifications.

## Endpoints (base: `/gmail`)

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
  "count": 10,
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
  "count": 10,
  "inboxSummary": { "...": "..." }
}
```

### `GET /gmail/actions/preview`

Returns only `suggestedActions`, keyed by action with Gmail `messageId` arrays.

### `GET /gmail/ai-summary`

Generates an AI analysis of the current inbox summary.

This endpoint:

- Reads the latest 10 messages from `INBOX`.
- Classifies each message with local rules.
- Builds `inboxSummary`.
- Sends the summary to AI to produce `overview`, `priorityLevel`, `priorityReason`, `suggestedPlan`, and `safetyNote`.
- Sends messages marked as `review_manually` to AI for a second opinion under `aiReviewClassifications`.

The AI classification is returned as analysis. This endpoint does not apply labels or modify Gmail, but `POST /gmail/actions/apply-labels` reuses the same AI classification flow to label ambiguous messages.

Response (JSON):

```json
{
  "status": "success",
  "count": 10,
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

### `POST /gmail/actions/apply-labels`

Applies Gmail labels for supported local-rule actions and also labels ambiguous messages using AI-suggested categories.

Note: the request body is not used. The endpoint reads Gmail at call time, recalculates `suggestedActions`, and runs AI classification for messages marked as `review_manually`.

Response:

```json
{
  "status": "success",
  "count": 10,
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
  "aiReviewClassifications": []
}
```

## Local Setup

### Requirements

- Node.js (`pnpm` is used)
- A Google Cloud project with OAuth2 credentials
- Gmail access for the account you authorize

### Files / Environment Variables

The project uses `.env`:

```env
PORT=3000
GOOGLE_CREDENTIALS_PATH=./credentials.json
GOOGLE_TOKEN_PATH=./token.json
GROQ_API_KEY=...
```

`credentials.json` (OAuth Client) must include this redirect URI:
`http://localhost:3000/gmail/callback`

The OAuth flow creates or updates `token.json`, including the refresh token.

`GROQ_API_KEY` is required for `GET /gmail/ai-summary` and `POST /gmail/actions/apply-labels`. Non-AI endpoints can start without it.

### Run

```bash
pnpm install
pnpm dev
```

Then:

1. Visit `GET http://localhost:3000/gmail/auth`.
2. Open the returned `url` in the browser and complete Google consent.
3. Call `GET http://localhost:3000/gmail/messages`.

## Module Walkthrough

### `src/app.ts`

Initializes Express, enables CORS, and mounts:

- `app.use("/gmail", gmailRoutes)`

It also defines `GET /health`.

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
- `classifyReviewMessagesWithAi(messages)`: gives a second opinion for ambiguous messages marked as `review_manually`.

The AI client is created on demand. If `GROQ_API_KEY` is missing, only endpoints that call AI fail.

## Gmail Label Execution

`POST /gmail/actions/apply-labels` uses this deterministic mapping:

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

## Side Effects

The endpoints `GET /gmail/messages`, `GET /gmail/summary`, `GET /gmail/actions/preview`, and `GET /gmail/ai-summary` do not write local files. `POST /gmail/actions/apply-labels` modifies Gmail labels.

## Credential Notes

- `credentials.json` contains `client_secret`; keep it out of public repositories.
- `token.json` contains OAuth tokens; keep it out of public repositories.
- `.env`, `credentials.json`, `token.json`, `node_modules/`, `dist/`, and `src/test.json` are excluded in `.gitignore`.
- `token.json` can fail with `invalid_grant` if it expires or is revoked. If that happens:
  - delete `token.json`
  - rerun the flow with `GET /gmail/auth` and confirm consent again
