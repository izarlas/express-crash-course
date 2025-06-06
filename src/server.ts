import { serverPort } from "./constants";
import express from "express";
import cards from "./apis/cards";
import home from "./apis/home";

const app = express();
const port = process.env.PORT || serverPort;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/home", home);
app.use("/api/cards", cards);

app.listen(port, () => console.log(`Server is running on port ${port}`));
