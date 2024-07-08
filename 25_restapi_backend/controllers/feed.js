import { validationResult } from 'express-validator';
import Post from '../models/post.js';

function getPosts(req, res, next) {
  Post.find()
    .then(posts =>
      res.status(200).json({
        message: 'Fetched posts successfully.',
        posts: posts,
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

  const post = new Post({
    title: title,
    content: content,
    imageUrl: 'images/duck.jpg',
    creator: { name: 'Eric' },
  });

  post
    .save()
    .then(result =>
      res.status(201).json({
        message: 'Post created successfully',
        post: result,
      })
    )
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

export default {
  getPosts,
  createPost,
  getPost,
};
