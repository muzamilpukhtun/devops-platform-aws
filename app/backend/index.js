const express = require('express');
const { Pool } = require('pg');

const app = express();
app.disable('x-powered-by');
app.use(express.json());

const port = process.env.PORT || 3000;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on('error', (err) => {
  console.error('idle db client error', err.message);
});

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (err) {
    console.error('health check failed', err.message);
    res.status(503).json({ status: 'unhealthy' });
  }
});

app.get('/notes', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, text, created_at FROM notes ORDER BY id'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
});

app.post('/notes', async (req, res) => {
  const text = req.body && req.body.text;
  if (typeof text !== 'string' || text.trim() === '' || text.length > 500) {
    return res.status(400).json({ error: 'text required (max 500 chars)' });
  }
  try {
    const { rows } = await pool.query(
      'INSERT INTO notes (text) VALUES ($1) RETURNING *',
      [text.trim()]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
});

app.delete('/notes/:id', async (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'invalid id' });
  }
  try {
    const result = await pool.query('DELETE FROM notes WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'not found' });
    }
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
});

async function start() {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS notes (
       id SERIAL PRIMARY KEY,
       text TEXT NOT NULL,
       created_at TIMESTAMPTZ DEFAULT now()
     )`
  );
  app.listen(port, () => console.log(`listening on ${port}`));
}

start().catch((err) => {
  console.error('startup failed', err);
  process.exit(1);
});
