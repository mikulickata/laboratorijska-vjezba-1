import express from 'express';
import pool from './database'; // Uvoz pool-a iz database.ts

const app = express();
const port = 4000;

// Rute, middleware itd.
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Definiraj neku rutu koja koristi bazu podataka
app.get('/tickets', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tickets'); // Upit prema bazi
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error retrieving tickets');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
