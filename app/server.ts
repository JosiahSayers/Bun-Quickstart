import express from "express";
import { stashRequestMetadata } from "$/middleware/stash-request-meta";
import { healthRouter } from "$/routers/health";
import { attachLogger } from "$/middleware/attach-logger";
import { requestLogger } from "$/middleware/request-logger";

export const app = express();
app.use(stashRequestMetadata, attachLogger, requestLogger);
app.disable("x-powered-by");

app.use(healthRouter);
