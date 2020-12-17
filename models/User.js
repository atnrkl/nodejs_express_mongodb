const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  nameSurname: {
    type: String,
    required: true,
    min: 4,
    max: 256,
  },
  username: {
    type: String,
    required: true,
    min: 4,
    max: 128,
  },
  email: {
    type: String,
    required: true,
    min: 4,
    max: 256,
  },
  cellNo: {
    type: String,
    required: true,
    min: 10,
    max: 13,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userLevel: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("user", userSchema);
