const User = require("../models/User");

//crerate session
const create = async (req, res) => {
  try {
    const { title, time, treeType } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newSession = {
      title,
      time,
      tree: { type: treeType },
      completed: false,
      date: new Date(),
    };

    user.session.push(newSession);
    await user.save();

    res.status(201).json(newSession);
  } catch (error) {}
};
