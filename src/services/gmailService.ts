import { google } from "googleapis";
import { getAuthorizedClient } from "../auth/googleAuth.js";
type GmailHeader = {
  name?: string | null;
  value?: string | null;
};
function getHeader(headers: GmailHeader[] = [], name: string) {
  return (
    headers.find((header) => header.name?.toLowerCase() === name.toLowerCase())
      ?.value || ""
  );
}

function getGmailClient() {
  const auth = getAuthorizedClient();

  return google.gmail({
    version: "v1",
    auth,
  });
}

export async function getRecentMessages(maxResults = 10) {
  const gmail = getGmailClient();

  const listResponse = await gmail.users.messages.list({
    userId: "me",
    maxResults,
    labelIds: ["INBOX"],
  });
  const messages = listResponse.data.messages || [];
  const detailedMessages = await Promise.all(
    messages.map(async (message) => {
      const messageResponse = await gmail.users.messages.get({
        userId: "me",
        id: message.id || "",
        format: "metadata",
        metadataHeaders: ["From", "Subject", "Date"],
      });
      const payload = messageResponse.data.payload;
      const headers = payload?.headers || [];

      return {
        id: messageResponse.data.id,
        threadId: messageResponse.data.threadId,
        from: getHeader(headers, "From"),
        subject: getHeader(headers, "Subject"),
        date: getHeader(headers, "Date"),
        snippet: messageResponse.data.snippet,
        labelIds: messageResponse.data.labelIds || [],
      };
    }),
  );
  return detailedMessages;
}

export async function getOrCreateLabel(labelName: string): Promise<string> {
  const gmail = getGmailClient();

  const labelsResponse = await gmail.users.labels.list({
    userId: "me",
  });

  const labels = labelsResponse.data.labels || [];

  const existingLabel = labels.find((label) => label.name === labelName);

  if (existingLabel?.id) {
    return existingLabel.id;
  }

  const createdLabel = await gmail.users.labels.create({
    userId: "me",
    requestBody: {
      name: labelName,
      labelListVisibility: "labelShow",
      messageListVisibility: "show",
    },
  });

  if (!createdLabel.data.id) {
    throw new Error(`Failed to create label: ${labelName}`);
  }

  return createdLabel.data.id;
}

export async function applyLabelToMessage(
  messageId: string,
  labelId: string,
): Promise<void> {
  const gmail = getGmailClient();

  await gmail.users.messages.modify({
    userId: "me",
    id: messageId,
    requestBody: {
      addLabelIds: [labelId],
    },
  });
}

export async function applyLabelToMessages(
  messageIds: string[],
  labelId: string,
): Promise<number> {
  for (const messageId of messageIds) {
    await applyLabelToMessage(messageId, labelId);
  }

  return messageIds.length;
}
