import { useEffect, useState } from "react";
import io from "socket.io-client";

interface User {
  username: string;
  score: number;
}

const socket = io("http://localhost:5000"); // Cập nhật URL nếu cần

const Scoreboard = () => {
  const [scores, setScores] = useState<User[]>([]);

  // Gọi API lấy top 10 ban đầu
  const fetchScores = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/scores");
      const data = await response.json();
      setScores(data);
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  };

  useEffect(() => {
    fetchScores(); // Lấy dữ liệu khi trang load lần đầu

    // Lắng nghe sự kiện "scoreUpdate" từ WebSocket
    socket.on("scoreUpdate", (updatedScores: User[]) => {
      setScores(updatedScores);
    });

    return () => {
      socket.off("scoreUpdate"); // Xóa event listener khi unmount
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🏆 Top 10 Scoreboard 🏆</h1>
      <ul className="list-disc pl-6">
        {scores.map((user, index) => (
          <li key={index} className="text-lg">
            {index + 1}. {user.username} - {user.score} points
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;
