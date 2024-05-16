import { Router } from 'express';

import  adminController  from "../controllers/admin.js";

const router = Router();

router.get('/add-product', adminController.getAddProduct);

router.post('/add-product', adminController.postAddProduct);

router.get('/products', adminController.getProducts);

export default {
  routes: router,
};

// export default {
//   routes: router,
//   products: products,
// };

// export default router;
// export const expRouter = router;
// export const expProducts = products;

// res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
