"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserScore = exports.getTopScores = void 0;
const User_1 = __importDefault(require("../models/User"));
const socket_1 = require("../socket"); // Import WebSocket instance
// API lấy danh sách top 10 người chơi có điểm cao nhất
const getTopScores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topScores = yield User_1.default.find().sort({ score: -1 }).limit(10);
        res.status(200).json(topScores);
    }
    catch (error) {
        console.error("Error fetching scores:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getTopScores = getTopScores;
// API cập nhật điểm số của người chơi
const updateUserScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, score } = req.body;
        // Kiểm tra dữ liệu đầu vào
        if (!username || typeof score !== "number") {
            res.status(400).json({ error: "Invalid input: username and score are required" });
            return;
        }
        // Cập nhật điểm số hoặc tạo mới nếu chưa tồn tại
        const user = yield User_1.default.findOneAndUpdate({ username }, { $inc: { score: score } }, // Tăng điểm số
        { new: true, upsert: true, runValidators: true }).exec(); // Thêm .exec() để tránh lỗi TypeScript
        if (!user) {
            res.status(500).json({ error: "Failed to update user score" });
            return;
        }
        // Lấy danh sách top 10 mới sau khi cập nhật
        const topScores = yield User_1.default.find().sort({ score: -1 }).limit(10);
        // Gửi danh sách top 10 mới tới tất cả client qua WebSocket
        socket_1.io.emit("scoreUpdate", topScores);
        res.status(200).json({ message: "Score updated successfully", user });
    }
    catch (error) {
        console.error("Error updating score:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateUserScore = updateUserScore;
