const mongoose = require("mongoose");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const nonplayerSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    school_organization: {
      type: String,
    },
  },
  { collection: "Nonplayers" }
);

nonplayerSchema.methods.createHash = async function (password) {
  this.salt = crypto.randomBytes(10).toString("hex");
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

nonplayerSchema.methods.verifyPassword = async function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.password === hash;
};

module.exports = mongoose.model("NonPlayer", nonplayerSchema);
