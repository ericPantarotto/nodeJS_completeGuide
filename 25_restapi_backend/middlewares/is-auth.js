import jwt from 'jsonwebtoken';

function isAuthenticated(req, res, next) {
  const token = req.get('Authorization')?.split(' ')[1];
   if (!token) {
     const error = new Error('Not Authenticated');
     error.statusCode = 401;
     throw error;
   }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error('Not Authenticated');
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;

  next();
}

export default {
  isAuthenticated,
};
