import cron from "node-cron";
import { gerarRendimentosDiarios } from "../services/yieldService";

cron.schedule("0 0 * * *", async () => {
  console.log("⏳ Gerando rendimentos diários...");
  await gerarRendimentosDiarios();
  console.log("✅ Rendimentos gerados");
});
