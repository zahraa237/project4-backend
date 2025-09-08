const express = require("express");
const { getDashboard } = require("../controllers/homeController");
const secureRoute = require("../middleware/secureRoute");

const router = express.Router();

router.get("/", secureRoute, getDashboard);

module.exports = router;
