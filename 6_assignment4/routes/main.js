import express from 'express';

const router = express.Router();

const names = [];

router.get('/', (req, res, next) =>
  res.render('main', {
    pageTitle: 'Add Name',
    path: '/',
  })
);


router.post('/add-name', (req, res, next) => {
  names.push({ title: req.body.title });
  res.redirect('/users');
});

export default {
  routes: router,
  names: names,
};


