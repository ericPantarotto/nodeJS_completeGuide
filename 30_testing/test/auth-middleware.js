import { expect } from 'chai';
import authMiddleware from '../middlewares/is-auth.js';

describe('Auth middleware', function () {
  it('should throw an error if no authorization header is present', function () {
    const req = {
      get: function () {
        return null;
      },
    };

    expect(
      authMiddleware.isAuthenticated.bind(this, req, {}, _ => {})
    ).to.throw('Not Authenticated');
  });

  it('should throw an error if the authorization header is only one string', function () {
    const req = {
      get: function (headerName) {
        return 'oneString';
      },
    };

    expect(
      authMiddleware.isAuthenticated.bind(this, req, {}, _ => {})
    ).to.throw('Not Authenticated');
  });

  it('should throw an error if the token cannot be verifiied', function () {
    const req = {
      get: function (headerName) {
        return 'Bearer xyz';
      },
    };

    expect(
      authMiddleware.isAuthenticated.bind(this, req, {}, _ => {})
    ).to.throw();
  });

  // it('should yield a userId after decoding the token', function () {
  //   const req = {
  //     get: function (headerName) {
  //       return 'Bearer xyz';
  //     },
  //   };

  //   authMiddleware.isAuthenticated(req, {}, _ => {});
  //   expect(req).to.property('userId');
  // });
});
