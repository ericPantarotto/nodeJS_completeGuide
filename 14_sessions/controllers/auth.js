function getLogin(req, res, next) {
  const isLoggedIn = req.get('Cookie')?.split(';')[0].trim().split('=')[1];

  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: isLoggedIn,
  });
}
function postLogin(req, res, next) {
  req.session.isLoggedIn = true;
  res.redirect('/');
}

export default {
  getLogin,
  postLogin,
};
