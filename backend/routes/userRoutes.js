import express from "express";
import {
  loginAdmin,
  loginCustomer,
  getAllCustomer,
  deleteCustomerById,
  registerAdmin,
  registerCustomer,
} from "./../controller/usersController.js";

const router = express.Router();

// Route untuk registrasi user
router.post("/register/admin", registerAdmin);

router.post("/register/customer", registerCustomer);

// Route untuk login sebagai admin
router.post("/login/admin", loginAdmin);

// Route untuk login sebagai customer
router.post("/login/customer", loginCustomer);

// Route untuk mendapatkan semua customer
router.get("/customers", getAllCustomer);

// Route untuk menghapus customer berdasarkan ID
router.delete("/customers/:id", deleteCustomerById);

export default router;
