const urlService = require("../services/urlService");

async function shortenUrl(req, res) {

  try {

    const original_url = req.body?.original_url;

    if (!original_url) {
      return res.status(400).json({
        error: "original_url is required"
      });
    }

    const result = await urlService.createShortUrl(original_url);

    const baseUrl = process.env.BASE_URL;

    res.json({
      short_url: `${baseUrl}/api/${result.short_code}`,
      short_code: result.short_code
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Internal server error"
    });

  }

}

async function redirectUrl(req, res) {

  try {

    const { short_code } = req.params;

    const result = await urlService.getOriginalUrl(short_code);

    if (!result) {
      return res.status(404).send("URL not found");
    }

    await urlService.incrementClicks(short_code);

    res.redirect(result.original_url);

  } catch (error) {

    console.error(error);

    res.status(500).send("Internal server error");

  }

}

async function getStats(req, res) {

  try {

    const { short_code } = req.params;

    const result = await urlService.getStats(short_code);

    if (!result) {
      return res.status(404).json({
        error: "URL not found"
      });
    }

    res.json(result);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Internal server error"
    });

  }

}

async function getQRCode(req, res) {

  try {

    const { short_code } = req.params;

    const qr = await urlService.generateQRCode(short_code);

    const img = qr.replace(/^data:image\/png;base64,/, "");

    const buffer = Buffer.from(img, "base64");

    res.set("Content-Type", "image/png");
    res.send(buffer);

  } catch (error) {

    console.error(error);

    res.status(500).send("Internal server error");

  }

}

module.exports = {
  shortenUrl,
  redirectUrl,
  getStats,
  getQRCode
};