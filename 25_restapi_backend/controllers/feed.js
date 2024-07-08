import { validationResult } from 'express-validator';
import Post from '../models/post.js';
function getPosts(req, res, next) {
  res.status(200).json({
    posts: [
      {
        _id: '1',
        title: 'First Post',
        content: 'this is the first post!',
        imageUrl: 'images/duck.jpg',
        creator: {
          name: 'Eric',
        },
        createdAt: new Date(),
      },
    ],
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

export default {
  getPosts,
  createPost,
};
