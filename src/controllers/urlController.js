const urlService = require("../services/urlService");

async function shortenUrl(req, res) {

  try {

    const { original_url } = req.body;

    if (!original_url) {
      return res.status(400).json({
        error: "original_url is required"
      });
    }

    const result = await urlService.createShortUrl(original_url);

    res.json({
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

    res.json({
      qr_code: qr
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Internal server error"
    });

  }

}

module.exports = {
  shortenUrl,
  redirectUrl,
  getStats,
  getQRCode
};