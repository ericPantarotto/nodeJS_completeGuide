import { body } from 'express-validator';
import { Router } from 'express';
import feedController from '../controllers/feed.js';

const router = Router();

router.get('/posts', feedController.getPosts);
router.post(
  '/post',
  [
    body('title', 'Title has to be string of min. 5 characters')
      .trim()
      .isLength({ min: 5 })
      .isString(),
    body('content', 'Content has to be string of min. 5 characters')
      .trim()
      .isLength({ min: 5 })
      .isString(),
  ],
  feedController.createPost
);

export default {
  routes: router,
};
