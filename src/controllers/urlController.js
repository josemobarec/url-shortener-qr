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

module.exports = {
  shortenUrl
};