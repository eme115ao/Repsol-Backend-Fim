import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Repsol Backend OK" });
});

app.use("/", routes);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default app;
