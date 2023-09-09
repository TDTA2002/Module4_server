import express from 'express';
const router = express.Router();
import productController from '../../controllers/product.controller';

router.get('/:categoryId', productController.findByCategory);

export default router;