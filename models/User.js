const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const treeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    default: "",
  },
  status: {
    type: String,
    default: "dead",
  },
});

const sessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: Number,
    required: true,
  },
  endTime: {
    type: Date,
  },
  tree: {
    type: treeSchema,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username already taken please pick another username"],
  },
  passwordHash: {
    type: String,
    required: [true, "password is required"],
  },
  sessions: [sessionSchema],
});

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.passwordHash);
};

const User = mongoose.model("User", userSchema);
const Session = mongoose.model("Session", sessionSchema);

module.exports = {
  User,
};
