import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";
import http from "http";
import { initializeSocket } from "./socket"; // Import WebSocket
import scoreRoutes from "./routes/scoreRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Khởi tạo HTTP server
const server = http.createServer(app);
initializeSocket(server); // Khởi tạo WebSocket

// Sử dụng router
app.use("/api", scoreRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
