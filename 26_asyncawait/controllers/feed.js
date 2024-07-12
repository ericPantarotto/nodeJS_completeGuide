import { validationResult } from 'express-validator';
import { unlink } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import Post from '../models/post.js';
import User from '../models/user.js';

function getPosts(req, res, next) {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;

  Post.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return Post.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(posts =>
      res.status(200).json({
        message: 'Fetched posts successfully.',
        posts: posts,
        totalItems: totalItems,
      })
    )
    .catch(err => {
      !err.statusCode && (err.statusCode = 500);
      next(err);
    });
}

function createPost(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect');
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.file.path;
  let creator;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: req.userId,
  });

  post
    .save()
    .then(_ => User.findById(req.userId))
    .then(user => {
      creator = user;
      user.posts.push(post);
      return user.save();
    })
    .then(_ => {
      return res.status(201).json({
        message: 'Post created successfully',
        post: post,
        creator: { _id: creator._id, name: creator.name },
      });
    })
    .catch(err => {
      !err.statusCode && (err.statusCode = 500);
      next(err);
    });
}

function getPost(req, res, next) {
  Post.findById(req.params.postId)
    .then(post => {
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({ message: 'Post fetched', post: post });
    })
    .catch(err => {
      !err.statusCode && (err.statusCode = 500);
      next(err);
    });
}

function updatePost(req, res, next) {
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

  Post.findById(req.params.postId)
    .then(post => {
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }

      if (post.creator.toString() !== req.userId) {
        const error = new Error('Unauthorized to edit post.');
        error.statusCode = 403;
        throw error;
      }

      imageUrl !== post.imageUrl && clearImage(post.imageUrl);

      post.title = req.body.title;
      post.content = req.body.content;
      post.imageUrl = imageUrl;
      return post.save();
    })
    .then(result =>
      res.status(200).json({ message: 'Post updated', post: result })
    )
    .catch(err => {
      !err.statusCode && (err.statusCode = 500);
      next(err);
    });
}

function deletePost(req, res, next) {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
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
      return Post.findByIdAndDelete(postId);
    })
    .then(_ => User.findById(req.userId))
    .then(user => {
      user.posts.pull(postId);
      return user.save();
    })
    .then(_ => res.status(200).json({ message: 'Deleted post.' }))
    .catch(err => {
      !err.statusCode && (err.statusCode = 500);
      next(err);
    });
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
