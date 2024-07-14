import { Router } from 'express';
import { body } from 'express-validator';
import feedController from '../controllers/feed.js';
import authMiddleware from '../middlewares/is-auth.js';

const router = Router();

router.get('/posts', authMiddleware.isAuthenticated, feedController.getPosts);
router.post(
  '/post',
  authMiddleware.isAuthenticated,
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

router.get(
  '/post/:postId',
  authMiddleware.isAuthenticated,
  feedController.getPost
);

router.put(
  '/post/:postId',
  authMiddleware.isAuthenticated,
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

router.delete(
  '/post/:postId',
  authMiddleware.isAuthenticated,
  feedController.deletePost
);

export default {
  routes: router,
};
