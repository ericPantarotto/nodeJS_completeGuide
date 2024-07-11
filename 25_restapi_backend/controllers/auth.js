import { validationResult } from 'express-validator';

function signup(req, res, next) {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Signup validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

}

export default {
  signup,
};
