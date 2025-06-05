import express from "express";
import homeRouter from "./apis/home";
import { serverPort } from "./constants";

const app = express();
app.use("/", homeRouter);

app.listen(serverPort, () =>
  console.log(`Server is running on port ${serverPort}`)
);
