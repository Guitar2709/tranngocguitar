import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User";
import bcrypt from "bcryptjs";

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    await User.deleteMany(); // Xóa toàn bộ dữ liệu cũ

    const users = [];

    for (let i = 1; i <= 15; i++) {
      users.push({
        username: `user${i}`,
        password: await bcrypt.hash("password123", 10),
        score: Math.floor(Math.random() * 1000),
      });
    }

    await User.insertMany(users);
    console.log("Seed data inserted successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedUsers();
