import { pool } from '../database.js';

// READ: Get all cakes
export const getAllCakes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cakes');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching cakes:', error);
    res.status(500).json({ message: error.message });
  }
};

// READ: Get cake by ID
export const getCakeById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query('SELECT * FROM cakes WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Cake not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE: Add a new cake
export const createCake = async (req, res) => {
  const { name, category_id, description, price, stock, image_url } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO cakes (name, category_id, description, price, stock, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, category_id, description, price, stock, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE: Update a cake by ID
export const updateCake = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, category_id, description, price, stock, image_url } = req.body;
  try {
    const result = await pool.query(
      'UPDATE cakes SET name = $1, category_id = $2, description = $3, price = $4, stock = $5, image_url = $6 WHERE id = $7 RETURNING *',
      [name, category_id, description, price, stock, image_url, id]
    );
    if (result.rowCount > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Cake not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE: Delete a cake by ID
export const deleteCake = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query('DELETE FROM cakes WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Cake not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
