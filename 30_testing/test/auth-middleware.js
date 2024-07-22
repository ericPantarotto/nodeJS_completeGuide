import { expect } from 'chai';
import authMiddleware from '../middlewares/is-auth.js';

describe('Auth middleware', function () {
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
    
    it('should throw an error if the authorization header is only one string', function () {
      const req = {
        get: function () {
          return 'oneString';
        },
      };
    
      expect(authMiddleware.isAuthenticated.bind(this, req, {}, _ => {})).to.throw(
        'Not Authenticated'
      );
    });
})

