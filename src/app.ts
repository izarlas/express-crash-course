import express from "express";
import cards from "./apis/cards";
import { logger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";

const app = express();
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// Routes
app.use("/api/cards", cards);

// Catch all middleware
app.use(notFound);
// Error handler middleware
app.use(errorHandler);

export default app;
