import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Carrega variáveis de ambiente (.env)
dotenv.config();

// Import das rotas
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import investmentRoutes from "./routes/investmentRoutes";
import depositoRoutes from "./routes/depositoRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import rendimentoRoutes from "./routes/rendimentoRoutes";
import cronRoutes from "./routes/cronRoutes";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas principais
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/deposito", depositoRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/rendimento", rendimentoRoutes);
app.use("/api/cron", cronRoutes);

// Test route
app.get("/", (_, res) => res.send("Repsol Backend OK"));

// Porta dinâmica para Render (usa 3001 localmente)
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
