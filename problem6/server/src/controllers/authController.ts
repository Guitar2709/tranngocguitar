import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

// Định nghĩa kiểu dữ liệu cho response
type AuthResponse = Response<{ message?: string; token?: string; error?: string }>;

// API đăng ký người dùng
export const registerUser = async (
  req: Request<{}, {}, { username: string; password: string }>, 
  res: AuthResponse
): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!username || !password) {
      res.status(400).json({ error: "Username and password are required" });
      return;
    }

    // Kiểm tra username đã tồn tại chưa
    const existingUser = await User.findOne({ username }).exec();
    if (existingUser) {
      res.status(400).json({ error: "Username already exists" });
      return;
    }

    // Hash password trước khi lưu vào DB
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Tạo user mới
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// API đăng nhập người dùng
export const loginUser = async (
  req: Request<{}, {}, { username: string; password: string }>, 
  res: AuthResponse
): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!username || !password) {
      res.status(400).json({ error: "Username and password are required" });
      return;
    }

    // Kiểm tra user có tồn tại không
    const user = await User.findOne({ username }).exec();
    if (!user) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    // Kiểm tra biến môi trường JWT_SECRET
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined");
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Tạo JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username }, 
      JWT_SECRET, 
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
