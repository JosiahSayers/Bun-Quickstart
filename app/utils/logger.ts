import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { version: (await Bun.file("./version").text())?.trim() },
  exitOnError: false,
  transports: [
    //
    // - Write all logs with importance level of `error` or higher to `error.log`
    //   (i.e., error, fatal, but not other levels)
    //
    new winston.transports.File({
      filename: `${Bun.env.LOG_FOLDER}/error.log`,
      level: "error",
      handleExceptions: true,
    }),
    //
    // - Write all logs with importance level of `info` or higher to `combined.log`
    //   (i.e., fatal, error, warn, and info, but not trace)
    //
    new winston.transports.File({
      filename: `${Bun.env.LOG_FOLDER}/combined.log`,
    }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}
