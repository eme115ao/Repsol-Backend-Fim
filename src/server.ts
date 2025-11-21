// src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import productRoutes from "./routes/productRoutes";
import referralRoutes from "./routes/referralRoutes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "https://repsol-ag.netlify.app",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/products", productRoutes);
app.use("/api/referral", referralRoutes);

app.get("/", (_req, res) =>
  res.json({ status: "ok", app: "Repsol Backend Running" })
);

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Backend iniciado na porta ${PORT}`);
});
