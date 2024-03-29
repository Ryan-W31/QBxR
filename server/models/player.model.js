const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  school: {
    type: String,
  },
});

module.exports = mongoose.model("Player", playerSchema);
