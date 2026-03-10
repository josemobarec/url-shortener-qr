# URL Shortener API with QR Code

A RESTful URL shortener service built with **Node.js, Express, and PostgreSQL**.  
This API allows users to generate shortened URLs, redirect to original links, generate QR codes, and track usage statistics.

The project follows a **modular backend architecture** with controllers, services, middleware, and structured logging.

---

## Tech Stack

Backend

- Node.js
- Express.js

Database

- PostgreSQL

Libraries

- dotenv
- pg
- qrcode
- winston
- morgan
- express-rate-limit

---

## Features

- Create shortened URLs
- Redirect to original URLs using short codes
- Track click statistics
- Generate QR codes for shortened URLs
- URL validation
- Rate limiting protection
- Centralized error handling
- Structured logging

---

## Project Architecture
  Client \
  │
  ▼
  Express API \
  │
  ├── Controllers\
  ├── Services\
  ├── Routes\
  ├── Middleware\
  │
  ▼
  PostgreSQL Database\

---
  
## Project Structure
  
  src\
  │
  ├── controllers\
  │   urlController.js\
  │
  ├── services\
  │   urlService.js\
  │
  ├── routes\
  │   urlRoutes.js\
  │
  ├── database\
  │   db.js\
  │
  ├── middleware\
  │   errorHandler.js\
  │   rateLimiter.js\
  │
  ├── utils\
  │   logger.js\
  │   AppError.js\
  │
  └── app.js\
  
  logs\
  │
  ├── error.log\
  └── combined.log\
  
  package.json\
  README.md


  ---
  
## Installation

Clone the repository
```bash
git clone https://github.com/josemobarec/url-shortener-qr.git
cd url-shortener-qr
```
Install dependencies
```bash
npm install
```

  ---
  
## Environment Variables

Create a `.env` file in the project root.

Example:
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=url_shortener
```
  ---
  
## Database Setup

Create the database:
```sql
CREATE DATABASE url_shortener;
```
Create the table:
```sql
CREATE TABLE urls (
  id SERIAL PRIMARY KEY,
  original_url TEXT NOT NULL,
  short_code VARCHAR(10) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  clicks INTEGER DEFAULT 0
);
```

  ---
  
## Running the API

Start the server
```bash
node src/app.js
```
Server will run at

```
http://localhost:3000
```

   ---
  
## API Endpoints

Create Short URL

POST

`/api/shorten`


Request

```json
{
  "original_url": "https://google.com"
}
```

Response

```json
{
  "short_url": "http://localhost:3000/api/abc123",
  "short_code": "abc123"
}
```
  ---
  
## Redirect to Original URL

GET

`/api/:shortCode`

Example

`http://localhost:3000/api/abc123`


   ---



## Get URL Statistics
GET
`/api/stats/:shortCode`
Example response
```json
{
  "original_url": "https://google.com",
  "short_code": "abc123",
  "clicks": 10,
  "created_at": "2026-03-10T03:20:00.022Z"
}
```
   ---


## Generate QR Code
GET
`/api/qr/:shortCode`
Response
```json
{
  "qr_code": "data:image/png;base64,..."
}
```

   ---
## Logging
Logs are handled using Winston.

Log files are generated automatically:

`logs/error.log`
`logs/combined.log`
   ---

## Security Features
  Possible enhancements:
  
  - Redis caching for faster redirects
  
  - Docker containerization
  
  - Swagger API documentation
  
  - Automated tests with Jest

   ---
## Documentation

Full project documentation can be found here:

[Project Documentation](docs/url-shortener-report.pdf)

   ---
## Author

José LBM

Engineering student focused on Cybersecurity and Full-Stack Development

GitHub
[https://github.com/josemobarec](https://github.com/josemobarec)


  
