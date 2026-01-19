const express = require("express");
const feedController = require("../controllers/feed");

const router = express.Router();

router.get("/", feedController.getFeed);
router.post("/", feedController.createFeed);

module.exports = router;
