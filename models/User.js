const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  forest: {
    type: forestSchema,
  },
});

const sessionSchema = new mongoose.Schema({
  title: String,
  time: {
    type: Number,
    required: true,
  },
  plnat: {
    type: String,
    required: true,
    default: "",
  },
});

const forest = new mongoose.Schema({
  sessions: [sessionSchema],
});

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.passwordHash);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
