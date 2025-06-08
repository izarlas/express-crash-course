import express from "express";
import cards from "./apis/cards";
import index from "./apis/index";
import { logger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";
import path from "path";

const port = process.env.PORT || 8000;

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// Setup static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", index);
app.use("/api/cards", cards);

// Catch all middleware
app.use(notFound);
// Error handler middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
