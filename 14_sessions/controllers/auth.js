function getLogin(req, res, next) {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
  });
}

export default {
  getLogin,
};
