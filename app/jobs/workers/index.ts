import { exampleWorker } from "$/jobs/workers/example";
import type { Worker } from "bullmq";

const workers: Worker[] = [exampleWorker];

workers.forEach((worker) => worker.run());

process.on("SIGINT", async () => {
  console.log("Gracefully stopping workers...");
  await Promise.allSettled(workers.map((worker) => worker.close()));
  process.exit();
});
