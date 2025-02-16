import express from "express";
import { getTopScores, updateUserScore } from "../controllers/scoreController";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.get("/scores", getTopScores);
router.post("/scores/update", authenticateToken, updateUserScore);

export default router;
