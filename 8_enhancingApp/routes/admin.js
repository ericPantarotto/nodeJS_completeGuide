import { Router } from 'express';

import  productsController  from "../controllers/products.js";

const router = Router();

router.get('/add-product', productsController.getAddProduct
);

router.post('/add-product', productsController.postAddProduct);

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
