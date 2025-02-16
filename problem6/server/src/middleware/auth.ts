import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Định nghĩa interface mở rộng Request để TypeScript nhận diện `user`
export interface AuthRequest extends Request {
  user?: JwtPayload | string;
}

// Middleware xác thực JWT
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1]; // Lấy token từ header

  if (!token) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = decoded; // Gán user vào request
    next(); // Tiếp tục middleware, không return response ở đây
  } catch (error) {
    res.status(403).json({ error: "Forbidden: Invalid token" });
  }
};
