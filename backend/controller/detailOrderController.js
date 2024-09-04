import { pool } from "../database.js";

// Function to get all detail orders
export async function getAllDetailOrders(_req, res) {
  try {
    const query = `SELECT * FROM detail_order`;
    const { rows } = await pool.query(query);
    
    if (rows.length > 0) {
      res.status(200).json({
        status: "success",
        message: "Berhasil menampilkan data",
        data: rows,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Data kosong",
        data: [],
      });
    }
  } catch (error) {
    console.error("Error in getAllDetailOrders:", error);
    res.status(500).json({
      status: "error",
      message: "Gagal mengambil data detail order",
    });
  }
}

// Function to get detail order by ID
export async function getDetailOrderById(req, res) {
  try {
    const query = `SELECT * FROM detail_order WHERE id = $1`;
    const { rows } = await pool.query(query, [req.params.id]);
    
    if (rows.length > 0) {
      res.status(200).json({
        status: "success",
        message: "Berhasil menampilkan data",
        data: rows[0],
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Data tidak ditemukan",
        data: null,
      });
    }
  } catch (error) {
    console.error("Error in getDetailOrderById:", error);
    res.status(500).json({
      status: "error",
      message: "Gagal mengambil data detail order",
    });
  }
}

// Function to get detail orders by order ID
export async function getDetailOrdersByOrderId(req, res) {
  try {
    const query = `SELECT * FROM detail_order WHERE order_id = $1`;
    const { rows } = await pool.query(query, [req.params.id]);
    
    if (rows.length > 0) {
      res.status(200).json({
        status: "success",
        message: "Berhasil menampilkan data",
        data: rows,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Data tidak ditemukan",
        data: [],
      });
    }
  } catch (error) {
    console.error("Error in getDetailOrdersByOrderId:", error);
    res.status(500).json({
      status: "error",
      message: "Gagal mengambil data detail order",
    });
  }
}
