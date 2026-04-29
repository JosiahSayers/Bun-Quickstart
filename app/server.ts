import express from "express";
import { stashRequestMetadata } from "./middleware/stash-request-meta";
import { healthRouter } from "./routers/health";

export const app = express();
app.use(stashRequestMetadata);
app.disable("x-powered-by");

app.use(healthRouter);
