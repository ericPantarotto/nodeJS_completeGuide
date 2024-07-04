import { Router } from 'express';
import feedController from '../controllers/feed.js';

const router = Router();

router.get('/posts', feedController.getPosts);

export default {
  routes: router,
};
