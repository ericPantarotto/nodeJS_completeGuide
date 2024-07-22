import { expect } from 'chai';
import authMiddleware from '../middlewares/is-auth.js';

it('should throw an error if no authorization header is present', function () {
  const req = {
    get: function () {
      return null;
    },
  };

  expect(authMiddleware.isAuthenticated.bind(this, req, {}, _ => {})).to.throw(
    'Not Authenticated'
  );
});
