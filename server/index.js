import "dotenv/config";
import express from "express";
import { checkDatabaseConnection, pool } from "./database.js";

const app = express();
const port = Number(process.env.PORT) || 3001;

app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.get("/api/health/db", async (_request, response) => {
  try {
    const database = await checkDatabaseConnection();
    response.json({ status: "ok", database });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    response.status(503).json({
      status: "error",
      message: "Database is unavailable.",
    });
  }
});

const server = app.listen(port, "127.0.0.1", () => {
  console.log(`API server listening at http://127.0.0.1:${port}`);
});

async function shutdown(signal) {
  console.log(`${signal} received; shutting down.`);
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
