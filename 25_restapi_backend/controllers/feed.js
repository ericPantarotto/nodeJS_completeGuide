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
    return res.status(422).json({
      message: 'Validation failed, entered data is incorrect',
      errors: errors.array(),
    });
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
    .catch(err => console.error(err));
}

export default {
  getPosts,
  createPost,
};
