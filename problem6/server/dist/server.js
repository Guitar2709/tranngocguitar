"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const scoreRoutes_1 = __importDefault(require("./routes/scoreRoutes"));
const http_1 = __importDefault(require("http"));
const socket_1 = require("./socket"); // Import WebSocket
dotenv_1.default.config();
(0, database_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Khởi tạo HTTP server
const server = http_1.default.createServer(app);
(0, socket_1.initializeSocket)(server); // Khởi tạo WebSocket
// Sử dụng router
app.use("/api", scoreRoutes_1.default);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
