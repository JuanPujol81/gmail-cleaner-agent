import fs from "fs";
import path from "path";
import { google } from "googleapis";
const SCOPES = ["https://www.googleapis.com/auth/gmail.modify"];
const credentialsPath = process.env.GOOGLE_CREDENTIALS_PATH || "./credentials.json";
const tokenPath = process.env.GOOGLE_TOKEN_PATH || "./token.json";
function loadCredentials() {
    const fullPath = path.resolve(credentialsPath);
    const content = fs.readFileSync(fullPath, "utf-8");
    return JSON.parse(content);
}
export function createOAuthClient() {
    const credentials = loadCredentials();
    const clientConfig = credentials.web || credentials.installed;
    if (!clientConfig) {
        throw new Error("Invalid credentials.json: missing web or installed config");
    }
    const { client_id, client_secret, redirect_uris } = clientConfig;
    const redirectUri = redirect_uris[0];
    return new google.auth.OAuth2(client_id, client_secret, redirectUri);
}
export function getAuthUrl() {
    const oauth2Client = createOAuthClient();
    return oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
        prompt: "consent",
    });
}
export async function saveTokenFromCode(code) {
    const oauth2Client = createOAuthClient();
    const { tokens } = await oauth2Client.getToken(code);
    if (!tokens.refresh_token) {
        console.warn("No refresh_token in OAuth response. Revoke app access in Google Account and authorize again with prompt=consent.");
    }
    fs.writeFileSync(path.resolve(tokenPath), JSON.stringify(tokens, null, 2));
    return tokens;
}
export function getAuthorizedClient() {
    const oauth2Client = createOAuthClient();
    const fullTokenPath = path.resolve(tokenPath);
    if (!fs.existsSync(fullTokenPath)) {
        throw new Error("Token not found. Visit /gmail/auth first.");
    }
    const tokenContent = fs.readFileSync(fullTokenPath, "utf-8");
    const tokens = JSON.parse(tokenContent);
    oauth2Client.setCredentials(tokens);
    return oauth2Client;
}
//# sourceMappingURL=googleAuth.js.map