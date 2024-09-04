// router/categoriesRoutes.js
import express from 'express';
import {
  getAllCategories,
  getCategoryById,

} from '../controller/categoriesController.js';

const router = express.Router();

// READ: Get all categories
router.get('/', getAllCategories);

// READ: Get category by ID
router.get('/:id', getCategoryById);


export default router;
