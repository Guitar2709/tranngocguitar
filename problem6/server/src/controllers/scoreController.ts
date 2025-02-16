import { Request, Response } from "express";
import User from "../models/User";
import { io } from "../socket";
import { AuthRequest } from "../types/express";

// API lấy danh sách top 10 người chơi có điểm cao nhất
export const getTopScores = async (req: Request, res: Response) => {
  try {
    const topScores = await User.find().sort({ score: -1 }).limit(10);
    res.status(200).json(topScores);
  } catch (error) {
    console.error("Error fetching scores:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// API cập nhật điểm số của người chơi
// API cập nhật điểm số của người chơi
export const updateUserScore = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { username, score } = req.body;
  
      // Kiểm tra dữ liệu đầu vào
      if (!username || typeof score !== "number") {
        res.status(400).json({ error: "Invalid input: username and score are required" });
        return;
      }
  
      // Cập nhật điểm số hoặc tạo mới nếu chưa tồn tại
      const user = await User.findOneAndUpdate(
        { username },
        { $inc: { score: score } }, // Tăng điểm số
        { new: true, upsert: true, runValidators: true }
      ).exec(); // Thêm `.exec()` để fix lỗi TypeScript
  
      if (!user) {
        res.status(500).json({ error: "Failed to update user score" });
        return;
      }
  
      // Lấy danh sách top 10 mới sau khi cập nhật
      const topScores = await User.find().sort({ score: -1 }).limit(10);
  
      // Gửi danh sách top 10 mới tới tất cả client qua WebSocket
      io.emit("scoreUpdate", topScores);
  
      res.status(200).json({ message: "Score updated successfully", user });
    } catch (error) {
      console.error("Error updating score:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
