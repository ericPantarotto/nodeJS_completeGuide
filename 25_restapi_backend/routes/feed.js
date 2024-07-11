import { Router } from 'express';
import { body } from 'express-validator';
import feedController from '../controllers/feed.js';
import authMiddleware from '../middlewares/is-auth.js';

const router = Router();

router.get('/posts', authMiddleware.isAuthenticated, feedController.getPosts);
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
    body('image').custom((value, { req }) => {
      if (!req.file) {
        throw new Error('Attached file is not an image.');
      }
      return true;
    }),
  ],
  feedController.createPost
);

router.get('/post/:postId', feedController.getPost);

router.put(
  '/post/:postId',
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
  feedController.updatePost
);

router.delete('/post/:postId', feedController.deletePost);

export default {
  routes: router,
};
