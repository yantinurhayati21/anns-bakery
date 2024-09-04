import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { pool } from "../database.js";
export async function registerAdmin(req, res) {
  const { username, email, password } = req.body;
  
  try {
    // Check if the username or email already exists
    const check = await pool.query(`SELECT * FROM users WHERE username = $1 OR email = $2`, [username, email]);
    
    if (check.rows.length > 0) {
      return res.status(400).json({
        message: "Username atau Email sudah digunakan",
      });
    }

    // Hash the password
    const hashedPassword = await argon2.hash(password);

    // Insert the new admin into the database
    await pool.query(
      `INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)`,
      [username, email, hashedPassword, 'admin']
    );

    return res.status(201).json({
      status: "success",
      message: "Admin berhasil ditambahkan",
      data: {
        username,
        email,
        role: 'admin',
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function registerCustomer(req, res) {
    const { username, email, password } = req.body;
    
    try {
      // Check if the username or email already exists
      const check = await pool.query(`SELECT * FROM users WHERE username = $1 OR email = $2`, [username, email]);
      
      if (check.rows.length > 0) {
        return res.status(400).json({
          message: "Username atau Email sudah digunakan",
        });
      }
  
      // Hash the password
      const hashedPassword = await argon2.hash(password);
  
      // Insert the new admin into the database
      await pool.query(
        `INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)`,
        [username, email, hashedPassword, 'customer']
      );
  
      return res.status(201).json({
        status: "success",
        message: "Admin berhasil ditambahkan",
        data: {
          username,
          email,
          role: 'customer',
        },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

export async function loginAdmin(req, res) {
  const { username, password } = req.body;
  try {
    const user = await pool.query(
      `SELECT * FROM users WHERE role = 'admin' AND username = '${username}'`,
    );
    if (user.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    const passwordMatch = await argon2.verify(user.rows[0].password, password);
    if (!passwordMatch) {
      return res.status(401).send("Invalid password");
    }

    // Memperbarui req.user dengan data pengguna dari hasil query
    req.user = user.rows[0];

    // Buat access token tanpa expiration time
    const accessToken = jwt.sign(
      {
        userId: user.rows[0].id
      },
      process.env.JWT_SECRET_ADMIN
    );

    // Mengirimkan token ke klien
    res.json({ accessToken });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function loginCustomer(req, res) {
  const { username, password } = req.body;
  try {
    const user = await pool.query(
      `SELECT * FROM users WHERE role = 'customer' AND username = $1`,
      [username]
    );
    if (user.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    const passwordMatch = await argon2.verify(user.rows[0].password, password);
    if (!passwordMatch) {
      return res.status(401).send("Invalid password");
    }

    // Memperbarui req.user dengan data pengguna dari hasil query
    req.user = user.rows[0];

    // Buat access token tanpa expiration time
    const accessToken = jwt.sign(
      {
        userId: user.rows[0].id,
      },
      process.env.JWT_SECRET_CUSTOMER
    );

    // Mengirimkan token ke klien
    res.json({ accessToken });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

// Get all customers
export const getAllCustomer = async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE role = 'customer'"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

// Delete Customer by ID
export const deleteCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE role = 'customer' AND id = $1", [
      id,
    ]);
    res.status(200).json({
      message: "Customer successfully deleted.",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};
