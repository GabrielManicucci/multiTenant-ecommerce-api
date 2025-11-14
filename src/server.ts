import { env } from "../env";
import { app } from "./app";

app.listen({ port: env.PORT, host: "0.0.0.0" }, (error: Error | null) => {
  if (error) {
    app.log.fatal({ error });
    console.log(error);
    process.exit(1);
  }

  console.log(`http server running in http://localhost:${env.PORT}`);
});
