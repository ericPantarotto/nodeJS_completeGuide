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
      return (req.session.user = user);
    })
    .then(_ => res.redirect('/'))
    .catch(err => console.error(err));
}

function postLogout(req, res, next) {
  req.session.destroy(_ => res.redirect('/'));
}

export default {
  getLogin,
  postLogin,
  postLogout,
};
