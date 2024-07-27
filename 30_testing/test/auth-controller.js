import { expect } from 'chai';
import 'dotenv/config';
import { connect, disconnect } from 'mongoose';
import sinon from 'sinon';

import AuthController from '../controllers/auth.js';
import User from '../models/user.js';

describe('Auth Controller', function () {
  it('should throw an error if accessing the database fails', function (done) {
    sinon.stub(User, 'findOne');
    User.findOne.throws();

    const req = {
      body: {
        email: 'test@test.com',
        password: 'tester',
      },
    };

    AuthController.login(req, {}, _ => {})
      .then(result => {
        //   console.log(result); //NOTE: if your catch doesn't return the error
        expect(result).to.be.an('error');
        expect(result).to.have.property('statusCode', 500);
        done();
      })
      .catch(err => {
        done(err);
      });

    User.findOne.restore();
  });

  it('should send a response with a valid user status for an existing user', function (done) {
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
      .then(result => {
        const req = {
          userId: '66957267a08f176a211128ca',
        };
        const res = {
          statusCode: 500,
          userStatus: null,
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.userStatus = data.status;
          },
        };

        AuthController.getUserStatus(req, res, _ => {}).then(_ => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.userStatus).to.be.equal('I am new!');
          User.deleteMany({})
            .then(_ => {
              return disconnect();
            })
            .then(_ => {
              done();
            });
        });
      })
      .catch(err => console.error(err));
  });
});
