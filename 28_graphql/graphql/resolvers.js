import {
  createPost,
  deletePost,
  post,
  posts,
  updatePost,
} from './postsResolvers.js';

import { createUser, login, user, updateStatus } from './userResolvers.js';

export default {
  createPost,
  posts,
  createUser,
  login,
  post,
  updatePost,
  deletePost,
  user,
  updateStatus,
};
