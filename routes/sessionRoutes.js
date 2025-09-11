const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { create } = require("../controllers/sessionControllers");
const { getAll } = require("../controllers/sessionControllers");
const { getOne } = require("../controllers/sessionControllers");
const { cancelSession } = require("../controllers/sessionControllers");
const secureRoute = require("../middleware/secureRoute");

router.post("/new", secureRoute, create);
router.get("/", secureRoute, getAll);
router.get("/:sessionId", secureRoute, getOne);
router.delete("/:sessionId", secureRoute, cancelSession);

module.exports = router;
