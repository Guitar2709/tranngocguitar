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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("./models/User"));
dotenv_1.default.config();
// Kết nối đến MongoDB
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));
// Tạo danh sách user mẫu
const sampleUsers = [
    { username: "Alice", score: 120 },
    { username: "Bob", score: 95 },
    { username: "Charlie", score: 130 },
    { username: "David", score: 110 },
    { username: "Emma", score: 85 },
    { username: "Frank", score: 105 },
    { username: "Grace", score: 140 },
    { username: "Hank", score: 90 },
    { username: "Ivy", score: 100 },
    { username: "Jack", score: 125 },
    { username: "Karen", score: 80 },
    { username: "Leo", score: 135 },
    { username: "Mia", score: 75 },
    { username: "Nathan", score: 145 },
    { username: "Olivia", score: 115 }
];
// Chèn dữ liệu vào MongoDB
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.deleteMany({}); // Xóa dữ liệu cũ (nếu có)
        yield User_1.default.insertMany(sampleUsers);
        console.log("Seed data inserted successfully!");
        mongoose_1.default.connection.close();
    }
    catch (error) {
        console.error("Error seeding database:", error);
    }
});
seedDatabase();
