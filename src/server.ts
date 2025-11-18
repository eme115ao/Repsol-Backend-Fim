import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import productRoutes from "./routes/productRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/products", productRoutes);

// health
app.get("/", (_req, res) => res.json({ status: "ok" }));

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
