const db = require("../database/db");

function generateShortCode(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

async function createShortUrl(originalUrl) {

  const shortCode = generateShortCode();

  const query = `
    INSERT INTO urls (original_url, short_code)
    VALUES ($1, $2)
    RETURNING short_code
  `;

  const values = [originalUrl, shortCode];

  const result = await db.query(query, values);

  return result.rows[0];
}

async function getOriginalUrl(shortCode) {

  const query = `
    SELECT original_url
    FROM urls
    WHERE short_code = $1
  `;

  const result = await db.query(query, [shortCode]);

  return result.rows[0];
}

async function incrementClicks(shortCode) {

  const query = `
    UPDATE urls
    SET clicks = clicks + 1
    WHERE short_code = $1
  `;

  await db.query(query, [shortCode]);

}

async function getStats(shortCode) {

  const query = `
    SELECT original_url, short_code, clicks, created_at
    FROM urls
    WHERE short_code = $1
  `;

  const result = await db.query(query, [shortCode]);

  return result.rows[0];

}

module.exports = {
  createShortUrl,
  getOriginalUrl,
  incrementClicks,
  getStats
};