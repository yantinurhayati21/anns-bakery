import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  confirmPayment
} from "./../controller/orderController.js";
import { getAllCakes } from "../controller/cakesController.js";
import { getDetailOrdersByOrderId } from "../controller/detailOrderController.js";

const router = express.Router();

// Route untuk mendapatkan semua orders
router.get("/", getAllOrders);

// Route untuk mendapatkan order berdasarkan ID
router.get("/:id", getOrderById);

// route untuk tambah order
router.post ("/", createOrder);

router.put("/:id/confirm", confirmPayment);

// Route untuk mendapatkan order berdasarkan ID
router.get("/detailorder/:id", getDetailOrdersByOrderId);

// Route untuk mendapatkan semua cakes
router.get("/cakes", getAllCakes);

export default router;
