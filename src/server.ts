import express from "express";
import cards from "./apis/cards";
import index from "./apis/index";
import { logger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import cors from "cors";

const serverPort = 8000;
const app = express();

// Enables cors for all routes
app.use(cors());

// Load openapi.yml file
const swaggerDocument = YAML.load(
  path.join(__dirname, "../openapi/openapi.yaml")
);

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
  console.log(
    `Swagger docs running at http://localhost:${serverPort}/api-docs`
  );
});
