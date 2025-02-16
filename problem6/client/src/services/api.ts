import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Đổi port nếu server khác 5000

export const getTopScores = async () => {
  try {
    const response = await axios.get(`${API_URL}/scores`);
    return response.data;
  } catch (error) {
    console.error("Error fetching scores:", error);
    return [];
  }
};

export const updateScore = async (username: string, score: number) => {
  try {
    const response = await axios.post(`${API_URL}/update`, { username, score });
    return response.data;
  } catch (error) {
    console.error("Error updating score:", error);
  }
};
