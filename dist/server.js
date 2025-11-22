"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const referralRoutes_1 = __importDefault(require("./routes/referralRoutes"));
const transactionsRoutes_1 = __importDefault(require("./routes/transactionsRoutes"));
const lojaRoutes_1 = __importDefault(require("./routes/lojaRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        "https://repsol-ag.netlify.app",
        "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/dashboard", dashboardRoutes_1.default);
app.use("/api/products", productRoutes_1.default);
app.use("/api/referral", referralRoutes_1.default);
app.use("/api/transactions", transactionsRoutes_1.default);
app.use("/api/loja", lojaRoutes_1.default);
app.get("/", (_req, res) => {
    res.json({ status: "ok", app: "Repsol Backend Running" });
});
const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
    console.log(`Backend iniciado na porta ${PORT}`);
});
