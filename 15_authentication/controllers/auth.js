import bcrypt from 'bcryptjs';
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
      if (user) {
        console.log('user found !!!!!');
        req.session.isLoggedIn = true;
        return (req.session.user = user);
      } else {
        console.log('user NOT found !!!');
      }
    })
    .then(_ => res.redirect('/'))
    .catch(err => console.error(err));
}

function postLogout(req, res, next) {
  req.session.destroy(_ => res.redirect('/'));
}

function getSignup(req, res, next) {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false,
  });
}

function postSignup(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPasswordpassword;

  User.findOne({ email: email })
    .then(userDoc => {
      return (
        (userDoc && res.redirect('/signup')) ||
        bcrypt
          .hash(password, 12)
          .then(hashedPassword =>
            new User({
              email: email,
              password: hashedPassword,
              cart: { items: [] },
            }).save()
          )
          .then(_ => res.redirect('/login'))
      );
    })
    .catch(err => console.error(err));
}

export default {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
};
