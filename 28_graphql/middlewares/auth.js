import jwt from 'jsonwebtoken';

function isAuthenticated(req, res, next) {
  const token = req.get('Authorization')?.split(' ')[1];
  if (!token) {
    req.isAuth = false;
    return next();
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.userId = decodedToken.userId;
   req.isAuth = true;
  next();
}

export default {
  isAuthenticated,
};
