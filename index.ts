import { logger } from "$/utils/logger";
import { app } from "$/server";

console.log("hi");

app.listen(Bun.env.PORT, (err) => {
  if (err) {
    console.error(err);
  }

  logger.info(`Ready to accept connections`);
});
