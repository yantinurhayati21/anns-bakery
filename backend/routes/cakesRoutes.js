import express from 'express';
import {
  getAllCakes,
  getCakeById,
  createCake,
  updateCake,
  deleteCake,
} from '../controller/cakesController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// READ: Get all cakes
router.get('/', getAllCakes);

// READ: Get cake by ID
router.get('/:id', getCakeById);

// CREATE: Add a new cake
router.post('/', verifyToken, createCake);

// UPDATE: Update a cake by ID
router.put('/:id', verifyToken, updateCake);

// DELETE: Delete a cake by ID
router.delete('/:id', verifyToken, deleteCake);

export default router;
