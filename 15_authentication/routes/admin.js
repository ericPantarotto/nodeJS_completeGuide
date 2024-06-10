import { Router } from 'express';

import adminController from '../controllers/admin.js';
import authMiddleware from '../middlewares/is-auth.js';
const router = Router();

router.get(
  '/add-product',
  authMiddleware.isAuthenticated,
  adminController.getAddProduct
);

router.post(
  '/add-product',
  authMiddleware.isAuthenticated,
  adminController.postAddProduct
);

router.get(
  '/products',
  authMiddleware.isAuthenticated,
  adminController.getProducts
);

router.get(
  '/edit-product/:productId',
  authMiddleware.isAuthenticated,
  adminController.getEditProduct
);

router.post(
  '/edit-product',
  authMiddleware.isAuthenticated,
  adminController.postEditProduct
);

router.post(
  '/delete-product',
  authMiddleware.isAuthenticated,
  adminController.postDeleteProduct
);

export default {
  routes: router,
};
