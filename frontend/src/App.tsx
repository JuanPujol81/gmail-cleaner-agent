import { useEffect, useMemo, useState } from "react";
import "./App.css";

type RequestState = "idle" | "loading" | "success" | "error";

type ApiResult = {
  title: string;
  status: RequestState;
  data?: unknown;
  error?: string;
};

type ProcessedEmail = {
  id: number;
  sender: string;
  subject: string;
  category: string;
  importance: string;
  recommendedAction: string;
  aiCategory: string | null;
  aiConfidence: number | null;
  aiReason: string | null;
  labelApplied: boolean;
  date: string | null;
  updatedAt: string;
};

type ProcessedEmailsResponse = {
  status: string;
  count: number;
  emails: ProcessedEmail[];
};

type StatsResponse = {
  status: string;
  total: number;
};

const apiActions = [
  {
    label: "Authorize Gmail",
    description: "Get the Google OAuth URL.",
    method: "GET",
    path: "/api/gmail/auth",
  },
  {
    label: "Load Messages",
    description: "Fetch, classify, and save the latest 100 inbox emails.",
    method: "GET",
    path: "/api/gmail/messages",
  },
  {
    label: "AI Summary",
    description: "Run AI summary and classify ambiguous review messages.",
    method: "GET",
    path: "/api/gmail/ai-summary",
  },
  {
    label: "Preview Labels",
    description: "See the planned Gmail labels without modifying Gmail.",
    method: "GET",
    path: "/api/gmail/actions/preview",
  },
  {
    label: "Apply Labels",
    description: "Apply Gmail labels and save processed metadata.",
    method: "POST",
    path: "/api/gmail/actions/apply-labels",
  },
] as const;

async function requestJson<T>(path: string, method = "GET"): Promise<T> {
  const response = await fetch(path, { method });
  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const detail =
      body && typeof body === "object" && "details" in body
        ? String(body.details)
        : response.statusText;
    throw new Error(detail);
  }

  return body as T;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function formatConfidence(value: number | null) {
  return value === null ? "No AI" : `${Math.round(value * 100)}%`;
}

function App() {
  const [result, setResult] = useState<ApiResult>({
    title: "Ready",
    status: "idle",
  });
  const [emails, setEmails] = useState<ProcessedEmail[]>([]);
  const [stats, setStats] = useState<StatsResponse | null>(null);

  const aiClassifiedCount = useMemo(
    () => emails.filter((email) => email.aiCategory).length,
    [emails],
  );

  async function runAction(action: (typeof apiActions)[number]) {
    setResult({ title: action.label, status: "loading" });

    try {
      const data = await requestJson<unknown>(action.path, action.method);
      setResult({ title: action.label, status: "success", data });
      await refreshProcessedEmails();
    } catch (error) {
      setResult({
        title: action.label,
        status: "error",
        error: getErrorMessage(error),
      });
    }
  }

  async function refreshProcessedEmails() {
    const [emailResponse, statsResponse] = await Promise.all([
      requestJson<ProcessedEmailsResponse>("/api/emails"),
      requestJson<StatsResponse>("/api/emails/stats"),
    ]);

    setEmails(emailResponse.emails);
    setStats(statsResponse);
  }

  useEffect(() => {
    refreshProcessedEmails().catch((error) => {
      setResult({
        title: "Processed emails",
        status: "error",
        error: getErrorMessage(error),
      });
    });
  }, []);

  return (
    <main className="app-shell">
      <section className="topbar">
        <div>
          <p className="eyebrow">Gmail Cleaner Agent</p>
          <h1>Email operations console</h1>
        </div>
        <button className="secondary-button" onClick={refreshProcessedEmails}>
          Refresh
        </button>
      </section>

      <section className="metrics-grid" aria-label="Email metrics">
        <div className="metric">
          <span>Total processed</span>
          <strong>{stats?.total ?? emails.length}</strong>
        </div>
        <div className="metric">
          <span>AI classified</span>
          <strong>{aiClassifiedCount}</strong>
        </div>
        <div className="metric">
          <span>Labels applied</span>
          <strong>{emails.filter((email) => email.labelApplied).length}</strong>
        </div>
      </section>

      <section className="action-grid">
        {apiActions.map((action) => (
          <button
            key={action.path}
            className="action-card"
            onClick={() => void runAction(action)}
            disabled={result.status === "loading"}
          >
            <span>{action.method}</span>
            <strong>{action.label}</strong>
            <small>{action.description}</small>
          </button>
        ))}
      </section>

      <section className="split-layout">
        <div className="panel">
          <div className="panel-header">
            <h2>Last response</h2>
            <span className={`status-pill ${result.status}`}>
              {result.status}
            </span>
          </div>
          <h3>{result.title}</h3>
          {result.error ? <p className="error-text">{result.error}</p> : null}
          <pre>{JSON.stringify(result.data ?? {}, null, 2)}</pre>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Processed emails</h2>
            <span>{emails.length} rows</span>
          </div>
          <div className="email-list">
            {emails.length === 0 ? (
              <p className="empty-state">
                No processed emails yet. Run Load Messages or AI Summary.
              </p>
            ) : (
              emails.slice(0, 25).map((email) => (
                <article className="email-row" key={email.id}>
                  <div>
                    <strong>{email.subject || "(No subject)"}</strong>
                    <span>{email.sender}</span>
                  </div>
                  <div className="email-tags">
                    <span>{email.category}</span>
                    <span>{email.importance}</span>
                    <span>AI {email.aiCategory ?? "none"}</span>
                    <span>{formatConfidence(email.aiConfidence)}</span>
                  </div>
                  {email.aiReason ? <p>{email.aiReason}</p> : null}
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
