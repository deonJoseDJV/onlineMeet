import "dotenv/config";
import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";

import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

const PORT = process.env.PORT || 8000;

// Allow all origins by default, or restrict via CORS_ORIGIN (comma-separated).
const corsOrigin = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : "*";

app.set("port", PORT);
// app.use(cors({ origin: corsOrigin }));
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// Health check / root — useful for uptime monitors and platform health checks.
app.get("/", (req, res) => {
  res.json({ status: "ok", service: "meetly-backend", time: new Date().toISOString() });
});

app.use("/api/v1/users", userRoutes);

const start = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error(
      "\n❌ MONGO_URI is not set. Create a backend/.env file (see .env.example) " +
        "with your MongoDB connection string before starting the server.\n"
    );
    process.exit(1);
  }

  try {
    const connectionDb = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB connected: ${connectionDb.connection.host}`);

    server.listen(PORT, () => {
      console.log(`🚀 Meetly server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

start();

export default app;
