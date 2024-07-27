import { expect } from 'chai';
import sinon from 'sinon';
import AuthController from '../controllers/auth.js';
import User from '../models/user.js';

describe('Auth Controller - Login', function () {
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
});
