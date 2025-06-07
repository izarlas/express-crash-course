import { serverPort } from "./constants";
import express from "express";
import cards from "./apis/cards";
import home from "./apis/home";
import { logger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
const port = process.env.PORT || serverPort;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// Routes
app.use("/api/home", home);
app.use("/api/cards", cards);

// Error handler middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
