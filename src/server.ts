import app from "./app";
import dotenv from "dotenv";
import "./cron/dailyYield";

dotenv.config();

const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
  console.log("Repsol backend running on port " + PORT);
});
