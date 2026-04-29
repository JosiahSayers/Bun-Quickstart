import { app } from "./app/server";

app.listen(Bun.env.PORT, (err) => {
  if (err) {
    console.error(err);
  }

  console.log(`Ready to accept connections`);
});
