import { createPost, post, posts, updatePost } from './postsResolvers.js';
import { createUser, login } from './userResolvers.js';

export default {
  createPost,
  posts,
  createUser,
  login,
  post,
  updatePost
};
