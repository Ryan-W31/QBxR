const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const scoreSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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
  { collection: "Scores" }
);

module.exports = mongoose.model("Score", scoreSchema);
