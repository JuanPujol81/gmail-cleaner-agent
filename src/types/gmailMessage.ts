export type GmailMessageSummary = {
  id: string | null | undefined;
  threadId: string | null | undefined;
  from: string;
  subject: string;
  date: string;
  snippet: string | null | undefined;
  labelIds: string[];
};
