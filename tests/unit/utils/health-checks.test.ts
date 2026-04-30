import { describe, it, expect, spyOn, afterEach, mock } from "bun:test";
import { HealthChecks } from "$/utils/health-checks";

describe("run", () => {
  it("returns the expected result when successful", async () => {
    expect(await HealthChecks.run()).toMatchInlineSnapshot(`
      {
        "database": "connected",
        "redis": "PONG",
      }
    `);
  });

  // Bun module mocking bug https://github.com/oven-sh/bun/issues/10428
  it.skip("returns the expected result when there is a failure", async () => {
    mock.module("$/utils/db", () => ({
      $queryRaw: () => {
        throw new Error();
      },
    }));
    expect(await HealthChecks.run()).toMatchInlineSnapshot(`
      {
        "database": "fail",
        "failures": [
          "database",
        ],
      }
    `);
  });
});
