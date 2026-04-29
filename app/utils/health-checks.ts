import { db } from "./db";

export class HealthChecks {
  private static CHECKS = [
    {
      name: "database",
      runner: async () => {
        await db.$queryRaw`SELECT 1`;
        return "connected";
      },
    },
  ] as const;

  static async run() {
    const output: Record<string, any> = {
      failures: [],
    };

    for await (const check of this.CHECKS) {
      let checkResult;
      try {
        checkResult = await check.runner();
      } catch (e) {
        checkResult = "fail";
        output.failures.push(check.name);
      } finally {
        output[check.name] = checkResult;
      }
    }

    if (output.failures.length === 0) {
      delete output.failures;
    }

    return output;
  }
}
