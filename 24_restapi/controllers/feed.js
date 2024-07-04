import { v4 as uuidv4 } from 'uuid';

function getPosts(req, res, next) {
  res.status(200).json({
    posts: [{ title: 'First Post', content: 'this is the first post!' }],
  });
}

function createPost(req, res, next) {
  const title = req.body.title;
  const content = req.body.content;

  res.status(201).json({
    message: 'Post created succesfully',
    post: { id: uuidv4(), title: title, content: content },
  });
}
export default {
  getPosts,
  createPost,
};
