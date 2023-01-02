const express = require("express");
const packController = require("../controllers/packController");

const router = express.Router();

router.route("/").get(packController.getAllPacks);

module.exports = router;
