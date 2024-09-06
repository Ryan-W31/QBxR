import mongoose from "mongoose";

export interface ScoreDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  qbxr_score: number;
  web_reaction: number;
  web_playid: number;
  web_defense: number;
  web_crit: number;
  vr_reaction: number;
  vr_playid: number;
  vr_defense: number;
  vr_crit: number;
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
    web_reaction: {
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
    vr_reaction: {
      type: Number,
    },
    vr_playid: {
      type: Number,
    },
    vr_defense: {
      type: Number,
    },
    vr_crit: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Score = mongoose.model<ScoreDocument>("Score", scoreSchema);
export default Score;
