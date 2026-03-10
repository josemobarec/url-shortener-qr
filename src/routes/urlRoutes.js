const express = require("express");
const router = express.Router();

const urlController = require("../controllers/urlController");
const shortenLimiter = require("../middleware/rateLimiter");

router.post("/shorten", shortenLimiter, urlController.shortenUrl);

router.get("/stats/:short_code", urlController.getStats);

router.get("/:short_code", urlController.redirectUrl);

router.get("/qr/:short_code", urlController.getQRCode);

module.exports = router;