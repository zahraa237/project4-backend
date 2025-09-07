const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { create } = require("../controllers/sessionControllers");
const secureRoute = require("../middleware/secureRoute");

router.post("/new", secureRoute, create);

module.exports = router;
