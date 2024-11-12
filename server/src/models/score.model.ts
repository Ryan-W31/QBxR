import mongoose from "mongoose";

export interface ScoreDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  qbxr_score: number;
  web_playid: number;
  web_defense: number;
  web_crit: number;
  vr_difficulty_1: number;
  vr_difficulty_2: number;
  vr_difficulty_3: number;
  createdAt: Date;
  updatedAt: Date;
}
// scoreSchema is used to store the user's scores.
const scoreSchema = new mongoose.Schema<ScoreDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    qbxr_score: {
      type: Number,
    },
    web_playid: {
      type: Number,
    },
    web_defense: {
      type: Number,
    },
    web_crit: {
      type: Number,
    },
    vr_difficulty_1: {
      type: Number,
    },
    vr_difficulty_2: {
      type: Number,
    },
    vr_difficulty_3: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Score = mongoose.model<ScoreDocument>("Score", scoreSchema);
export default Score;
