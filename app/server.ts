import express from "express";
import { stashRequestMetadata } from "$/middleware/stash-request-meta";
import { healthRouter } from "$/routers/health";
import { attachLogger } from "$/middleware/attach-logger";
import { requestLogger } from "$/middleware/request-logger";
import { toNodeHandler } from "better-auth/node";
import { auth } from "$/utils/auth";

export const app = express();
app.use(stashRequestMetadata, attachLogger, requestLogger);
app.all("/api/auth/*", toNodeHandler(auth));
app.disable("x-powered-by");

app.use(express.json());

app.use(healthRouter);
