import dotenv from "dotenv";
import type { Express } from "express";
import gmailRoutes from "./routes/gmailRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import { createApp } from "./createApp.js";

dotenv.config();
const app: Express = createApp({ gmailRoutes, emailRoutes });

export default app;
