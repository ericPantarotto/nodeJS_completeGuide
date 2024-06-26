function isAuthenticated(req, res, next) {
  if (!req.session.isLoggedIn) return res.redirect('/login');
  next();
}

export default {
  isAuthenticated,
};
