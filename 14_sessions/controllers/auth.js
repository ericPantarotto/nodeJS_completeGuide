import User from '../models/user.js';

function getLogin(req, res, next) {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
  });
}
function postLogin(req, res, next) {
  User.findById('6662e88628d20caf2d6dc633')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect('/');
    })
    .catch(err => console.error(err));
}

export default {
  getLogin,
  postLogin,
};
