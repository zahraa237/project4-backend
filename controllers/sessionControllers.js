const { get } = require("mongoose");
const { User } = require("../models/User");

//crerate session
const create = async (req, res) => {
  try {
    const { title, time, treeType } = req.body;
    const userId = req.user.id;
    console.log(userId);

    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + time * 60000); // time is in minutes

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newSession = {
      title,
      time,
      tree: { type: treeType },
      completed: false,
      date: new Date(),
      startTime,
      endTime,
    };

    user.sessions.push(newSession);
    await user.save();

    //getting the created session id
    const createdSession = user.sessions[user.sessions.length - 1];

    res.status(201).json({ session: createdSession });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//getting all sessions
const getAll = async (req, res) => {
  try {
    const user = req.user.id;
    res.status(200).json({
      sessions: user.sessions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//cancel session
const cancelSession = async (req, res) => {
  try {
    const user = req.user.id;
    const sessionId = req.params.sessionId;
    const session = user.sessions.id(sessionId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//get one session
const getOne = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log("user id: " + user);
    const sessionId = req.params.sessionId;
    const session = user.sessions.id(sessionId);
    res.status(200).json({
      session,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAll,
  cancelSession,
  getOne,
};
