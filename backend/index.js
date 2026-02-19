const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
const port = 3000;

const pool = new Pool({
  host: process.env.DB_HOST || 'db', 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});

// 1. NEU: Die Health-Route für den Docker-Healthcheck
// Ohne diese Route antwortet Express mit 404, und der Container gilt als "unhealthy"
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json({
      message: "Grüße vom Backend!",
      data: result.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. WICHTIG: Auf '0.0.0.0' lauschen statt auf 'localhost'
// 'localhost' im Container bindet nur an das interne Loopback. 
// '0.0.0.0' macht den Port für das Docker-Netzwerk (und damit für dich) erst sichtbar.
app.listen(port, '0.0.0.0', () => {
  console.log(`Backend läuft auf allen Schnittstellen an Port ${port}`);
});
