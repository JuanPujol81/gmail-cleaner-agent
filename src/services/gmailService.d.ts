export declare function getRecentMessages(maxResults?: number): Promise<{
    id: string | null | undefined;
    threadId: string | null | undefined;
    from: string;
    subject: string;
    date: string;
    snippet: string | null | undefined;
    labelIds: string[];
}[]>;
export declare function getOrCreateLabel(labelName: string): Promise<string>;
export declare function applyLabelToMessage(messageId: string, labelId: string): Promise<void>;
export declare function applyLabelToMessages(messageIds: string[], labelId: string): Promise<number>;
//# sourceMappingURL=gmailService.d.ts.map