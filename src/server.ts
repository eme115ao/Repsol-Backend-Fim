import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import productRoutes from "./routes/productRoutes";

dotenv.config();

const app = express();

// CORS CONFIG – EXIGIDO PARA NETLIFY + RENDER
app.use(
  cors({
    origin: [
      "https://repsol-ag.netlify.app",    // frontend oficial
      "http://localhost:5173"             // dev local
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ROTAS PRINCIPAIS
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/products", productRoutes);

// HEALTH CHECK
app.get("/", (_req, res) => {
  res.json({ status: "ok", app: "Repsol Backend Running" });
});

// PORTA
const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Backend iniciado na porta ${PORT}`);
});
