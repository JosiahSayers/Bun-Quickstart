import { logger } from "$/utils/logger";
import { app } from "./app/server";

app.listen(Bun.env.PORT, (err) => {
  if (err) {
    console.error(err);
  }

  logger.info(`Ready to accept connections`);
});
