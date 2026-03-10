const express = require("express");
const router = express.Router();

const urlController = require("../controllers/urlController");

router.post("/shorten", urlController.shortenUrl);

router.get("/stats/:short_code", urlController.getStats);

router.get("/:short_code", urlController.redirectUrl);

module.exports = router;