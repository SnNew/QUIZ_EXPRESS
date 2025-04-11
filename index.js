const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

//Persona

// Obtener todas las personas
app.get('/personas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM persona');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener una persona por ID
app.get('/personas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM persona WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear una nueva persona
app.post('/personas', async (req, res) => {
  try {
    const { nombre, edad } = req.body;
    const result = await pool.query(
      'INSERT INTO persona (nombre, edad) VALUES ($1, $2) RETURNING *',
      [nombre, edad]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar una persona por ID
app.put('/personas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, edad } = req.body;
    const result = await pool.query(
      'UPDATE persona SET nombre = $1, edad = $2 WHERE id = $3 RETURNING *',
      [nombre, edad, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar una persona por ID
app.delete('/personas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM persona WHERE id = $1', [id]);
    res.json({ message: 'Persona eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Coche

// Obtener todos los coches
app.get('/coches', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM coche');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un coche por ID
app.get('/coches/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM coche WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear un nuevo coche
app.post('/coches', async (req, res) => {
  try {
    const { marca, modelo, persona_id } = req.body;
    const result = await pool.query(
      'INSERT INTO coche (marca, modelo, persona_id) VALUES ($1, $2, $3) RETURNING *',
      [marca, modelo, persona_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un coche por ID
app.put('/coches/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { marca, modelo, persona_id } = req.body;
    const result = await pool.query(
      'UPDATE coche SET marca = $1, modelo = $2, persona_id = $3 WHERE id = $4 RETURNING *',
      [marca, modelo, persona_id, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar un coche por ID
app.delete('/coches/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM coche WHERE id = $1', [id]);
    res.json({ message: 'Coche eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Obtener coches de una persona

app.get('/personas/:id/coches', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM coche WHERE persona_id = $1', [id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
