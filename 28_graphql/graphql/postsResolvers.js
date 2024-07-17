import validator from 'validator';
import Post from '../models/post.js';
import User from '../models/user.js';

async function createPost({ postInput }, req) {
  if (!req.isAuth) {
    const error = new Error('Not authenticated.');
    error.code = 401;
    throw error;
  }

  const errors = [];
  if (
    validator.isEmpty(postInput.title) ||
    !validator.isLength(postInput.title, { min: 5 })
  ) {
    errors.push({ message: 'Title is invalid.' });
  }
  if (
    validator.isEmpty(postInput.content) ||
    !validator.isLength(postInput.content, { min: 5 })
  ) {
    errors.push({ message: 'Content is invalid.' });
  }
  if (errors.length > 0) {
    const error = new Error('Invalid input for Post Creation.');
    error.data = errors;
    error.code = 422;
    throw error;
  }

  const user = await User.findById(req.userId);
  if (!user) {
    const error = new Error('Invalid User.');
    error.code = 401;
    throw error;
  }
  const post = new Post({
    title: postInput.title,
    content: postInput.content,
    imageUrl: postInput.imageUrl,
    creator: user,
  });
  try {
    const createdPost = await post.save();
    user.posts.push(post);
    await user.save();
    return {
      ...createdPost._doc,
      _id: createdPost._id.toString(),
      createdAt: createdPost.createdAt.toISOString(),
      updatedAt: createdPost.updatedAt.toISOString(),
    };
  } catch (err) {
    !err.statusCode && (err.statusCode = 500);
    next(err);
  }
}

async function posts({ page }, req) {
  //NOTE: destructuring args argument on the fly
  if (!req.isAuth) {
    const error = new Error('Not authenticated.');
    error.code = 401;
    throw error;
  }

  const currentPage = page || 1;
  const perPage = 2;
  try {
    const totalPosts = await Post.find().countDocuments();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('creator')
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    return {
      posts: posts.map(p => {
        return {
          ...p._doc,
          _id: p._id.toString(),
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString(),
        };
      }),
      totalPosts: totalPosts,
    };
  } catch (err) {
    !err.statusCode && (err.statusCode = 500);
    next(err);
  }
}

async function post({ id }, req) {
  if (!req.isAuth) {
    const error = new Error('Not authenticated.');
    error.code = 401;
    throw error;
  }

  try {
    const post = await Post.findById(id).populate('creator');
    if (!post) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }

    return {
      ...post._doc,
      _id: post._id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };
  } catch (err) {
    !err.statusCode && (err.statusCode = 500);
    next(err);
  }
}

async function updatePost({ id, postInput }, req) {
  if (!req.isAuth) {
    const error = new Error('Not authenticated.');
    error.code = 401;
    throw error;
  }

  try {
    const post = await Post.findById(id).populate('creator');
    if (!post) {
      const error = new Error('Post not found.');
      error.statusCode = 404;
      throw error;
    }

    if (post.creator._id.toString() !== req.userId.toString()) {
      const error = new Error('Unauthorized to edit post.');
      error.statusCode = 403;
      throw error;
    }

    const errors = [];
    if (
      validator.isEmpty(postInput.title) ||
      !validator.isLength(postInput.title, { min: 5 })
    ) {
      errors.push({ message: 'Title is invalid.' });
    }
    if (
      validator.isEmpty(postInput.content) ||
      !validator.isLength(postInput.content, { min: 5 })
    ) {
      errors.push({ message: 'Content is invalid.' });
    }
    if (errors.length > 0) {
      const error = new Error('Invalid input for Post Creation.');
      error.data = errors;
      error.code = 422;
      throw error;
    }

    post.title = postInput.title;
    post.content = postInput.content;
    if (post.imageUrl !== undefined) {
      post.imageUrl = postInput.imageUrl;
    }
    const updatedPost = await post.save();

    return {
      ...updatedPost._doc,
      _id: updatedPost._id.toString(),
      createdAt: updatedPost.createdAt.toISOString(),
      updatedAt: updatedPost.updatedAt.toISOString(),
    };
  } catch (err) {
    !err.statusCode && (err.statusCode = 500);
    next(err);
  }
}

export { createPost, post, posts, updatePost };
