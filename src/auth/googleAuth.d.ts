import { Auth } from "googleapis";
export declare function createOAuthClient(): Auth.OAuth2Client;
export declare function getAuthUrl(): string;
export declare function saveTokenFromCode(code: string): Promise<Auth.Credentials>;
export declare function getAuthorizedClient(): Auth.OAuth2Client;
//# sourceMappingURL=googleAuth.d.ts.map