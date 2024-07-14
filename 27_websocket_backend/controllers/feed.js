import { validationResult } from 'express-validator';
import { unlink } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import Post from '../models/post.js';
import User from '../models/user.js';
import ioSocket from '../socket.js';

async function getPosts(req, res, next) {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  try {
    const totalItems = await Post.find().countDocuments();
    const posts = await Post.find()
      .populate('creator')
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: 'Fetched posts successfully.',
      posts: posts,
      totalItems: totalItems,
    });
  } catch (err) {
    !err.statusCode && (err.statusCode = 500);
    next(err);
  }
}

async function createPost(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect');
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.file.path;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: req.userId,
  });

  try {
    await post.save();
    const user = await User.findById(req.userId);
    user.posts.push(post);
    await user.save();

    ioSocket.getIO().emit('posts', {
      action: 'create',
      post: { ...post._doc, creator: { _id: req.userId, name: user.name } },
    });

    res.status(201).json({
      message: 'Post created successfully',
      post: post,
      creator: { _id: user._id, name: user.name },
    });
  } catch (err) {
    !err.statusCode && (err.statusCode = 500);
    next(err);
  }
}

async function getPost(req, res, next) {
  try {
    const post = await Post.findById(req.params.postId).populate('creator');
    if (!post) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: 'Post fetched', post: post });
  } catch (err) {
    !err.statusCode && (err.statusCode = 500);
    next(err);
  }
}

async function updatePost(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect');
    error.statusCode = 422;
    throw error;
  }

  const imageUrl = req.file?.path || req.body.image;
  if (!imageUrl) {
    const error = new Error('No file picked.');
    error.statusCode = 422;
    throw error;
  }

  try {
    const post = await Post.findById(req.params.postId).populate('creator');
    if (!post) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }

    if (post.creator._id.toString() !== req.userId) {
      const error = new Error('Unauthorized to edit post.');
      error.statusCode = 403;
      throw error;
    }

    imageUrl !== post.imageUrl && clearImage(post.imageUrl);

    post.title = req.body.title;
    post.content = req.body.content;
    post.imageUrl = imageUrl;
    const result = await post.save();

    ioSocket.getIO().emit('posts', { action: 'update', post: result });

    res.status(200).json({ message: 'Post updated', post: result });
  } catch (err) {
    !err.statusCode && (err.statusCode = 500);
    next(err);
  }
}

async function deletePost(req, res, next) {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }
    if (post.creator.toString() !== req.userId) {
      const error = new Error('Unauthorized to delete post.');
      error.statusCode = 403;
      throw error;
    }

    clearImage(post.imageUrl);
    await Post.findByIdAndDelete(postId);
    const user = await User.findById(req.userId);
    user.posts.pull(postId);
    await user.save();
    
    ioSocket.getIO().emit('posts', { action: 'delete', post: postId });

    res.status(200).json({ message: 'Deleted post.' });
  } catch (err) {
    !err.statusCode && (err.statusCode = 500);
    next(err);
  }
}

function clearImage(filePath) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  unlink(path.join(__dirname, '..', filePath), err => console.error(err));
}

export default {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
};
