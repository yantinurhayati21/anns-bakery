

import { pool } from '../database.js';

// READ: Get all orders
export async function getAllOrders(req, res) {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// READ: Get order by ID
export async function getOrderById(req, res) {
  try {
    const query = `SELECT * FROM orders WHERE id = $1`;
    const { rows } = await pool.query(query, [req.params.id]);
    if (rows.length > 0) {
      res.status(200).json({
        status: "success",
        message: "Berhasil menampilkan data",
        data: rows[0],
      });
    } else {
      res.status(200).json({
        message: "Data kosong",
        data: null,
      });
    }
  } catch (error) {
    console.error("Error in getOrderById:", error);
    res.status(500).json({
      status: "error",
      message: "Gagal mengambil data orderan",
    });
  }
}

// // CREATE: Add a new order
export async function createOrder(req, res) {
  if (!req.body || !req.body.data || req.body.data.length < 1) {
    return res.status(400).json({
      status: "failed",
      message: "Data order tidak boleh kosong!",
    });
  }

  const date = new Date();
  try {
    
    // Add data order
    const orderResult = await pool.query(
      `INSERT INTO orders (user_id, date, customer_name, customer_address, total_price, total_product, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [
        1,
        date.toISOString(),
        req.body.customer_name,
        req.body.customer_address,
        req.body.total_price,
        req.body.amount,
        "pending",
      ]
    );
    const orderId = orderResult.rows[0].id;
    console.log(orderId);

    console.log(req.body.data);
    // Add data detail_order
    for (let i = 0; i < req.body.data.length; i++) {
      const data = req.body.data[i];
      await pool.query(
        `INSERT INTO detail_order (product_name, product_price, amount, total_price, image, order_id) VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          data.name,
          data.price,
          data.quantity,
          data.total_price,
          data.image,
          orderId,
        ]
      );

      // Update product stock
      await pool.query(`UPDATE cakes SET stock = stock - $1 WHERE id = $2`, [
        data.quantity,
        data.id,
      ]);
    }

    return res.status(201).json({
      status: "success",
      message: "Berhasil menambahkan data order",
      data: orderResult.rows[0],
    });
  } catch (error) {
    console.error("Error in createOrder:", error);
    return res.status(500).json({
      status: "error",
      message: "Gagal menambahkan data order",
    });
  }
}

// UPDATE: Confirm payment
export async function confirmPayment(req, res) {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `UPDATE orders SET status = 'paid' WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length > 0) {
      res.status(200).json({
        status: "success",
        message: "Payment confirmed",
        data: result.rows[0],
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Order not found",
      });
    }
  } catch (error) {
    console.error("Error in confirmPayment:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to confirm payment",
    });
  }
}
