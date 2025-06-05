import express from "express";
import { serverPort } from "./constants";
import { staticMiddleware } from "./middlewares/static";

const app = express();

app.use(staticMiddleware);

app.listen(serverPort, () =>
  console.log(`Server is running on port ${serverPort}`)
);
