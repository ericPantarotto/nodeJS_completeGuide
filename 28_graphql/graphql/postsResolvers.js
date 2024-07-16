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

async function posts(args, req) {
  if (!req.isAuth) {
    const error = new Error('Not authenticated.');
    error.code = 401;
    throw error;
  }

  //  const currentPage = req.query.page || 1;
  //  const perPage = 2;
  try {
    const totalPosts = await Post.find().countDocuments();
    const posts = await Post.find().sort({ createdAt: -1 }).populate('creator');
    //  .skip((currentPage - 1) * perPage)
    //  .limit(perPage);

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
export {
  createPost,
  posts,
};
