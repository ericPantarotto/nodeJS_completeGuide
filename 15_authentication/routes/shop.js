import express from 'express';
import shopController from '../controllers/shop.js';

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get('/orders', shopController.getOrders);
router.post('/create-order', shopController.postOrder);

// router.get('/checkout', shopController.getCheckout);

export const expRouter = router;
