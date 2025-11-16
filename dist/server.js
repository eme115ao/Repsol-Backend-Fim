"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Carrega variáveis de ambiente (.env)
dotenv_1.default.config();
// Import das rotas
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const investmentRoutes_1 = __importDefault(require("./routes/investmentRoutes"));
const depositoRoutes_1 = __importDefault(require("./routes/depositoRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const rendimentoRoutes_1 = __importDefault(require("./routes/rendimentoRoutes"));
const cronRoutes_1 = __importDefault(require("./routes/cronRoutes"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rotas principais
app.use("/api/auth", authRoutes_1.default);
app.use("/api/products", productRoutes_1.default);
app.use("/api/investments", investmentRoutes_1.default);
app.use("/deposito", depositoRoutes_1.default);
app.use("/api/dashboard", dashboardRoutes_1.default);
app.use("/api/rendimento", rendimentoRoutes_1.default);
app.use("/api/cron", cronRoutes_1.default);
// Test route
app.get("/", (_, res) => res.send("Repsol Backend OK"));
// Porta dinâmica para Render (usa 3001 localmente)
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
