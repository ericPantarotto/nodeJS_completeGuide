import { expect } from 'chai';
import 'dotenv/config';
import { connect, disconnect } from 'mongoose';

import FeedController from '../controllers/feed.js';
import User from '../models/user.js';

describe('Feed Controller', function () {
  let userId;
  before(function (done) {
    connect(process.env.MONGO_DB_TEST_URL)
      .then(_ => {
        const user = new User({
          email: 'test@test.com',
          password: 'tester',
          name: 'Tester',
          posts: [],
          _id: '66957267a08f176a211128ca',
        });
        return user.save();
      })
      .then(user => {
        userId = user._id.toString();
        done();
      });
  });

  it('should add a created post to the posts of the creator', function (done) {
    const req = {
      body: {
        title: 'Test Post',
        content: 'A test post.',
      },
      file: {
        path: 'image test path',
      },
      userId: userId,
    };
    const res = {
      status: _ => this,
      json: _ => {},
    };

    FeedController.createPost(req, res, _ => {})
      .then(_ => User.findById(userId))
      .then(user => {
        expect(user).to.have.property('posts');
        expect(user.posts).to.have.length(1); //HACK:  0 would fail
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  after(function () {
    User.deleteMany({})
      .then(_ => {
        return disconnect();
      })
      .then(_ => {
        done();
      });
  });
});
