import { Router } from 'express';
import mainData from './main.js';

const router = Router();

router.get('/users', (req, res, next) =>
  res.render('users', {
    names: mainData.names,
    pageTitle: 'List Users',
    path: '/users',
  })
);

export const expRouter = router;
