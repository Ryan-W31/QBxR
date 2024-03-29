const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const nonplayerSchema = new Schema({
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
  organization: {
    type: String,
  },
});

module.exports = mongoose.model("NonPlayer", nonplayerSchema);
