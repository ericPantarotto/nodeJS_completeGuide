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
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then(user => {
    if (!user) return res.redirect('/login');
    bcrypt
      .compare(password, user.password)
      .then(doMatch => {
        if (!doMatch) return res.redirect('/login');
        req.session.isLoggedIn = true;
        return Promise.resolve((req.session.user = user)).then(_ =>
          res.redirect('/')
        );
      })
      .catch(err => {
        console.error(err);
        res.redirect('/login');
      });
  });
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

  User.findOne({ email: email }).then(userDoc => {
    return userDoc
      ? res.redirect('/signup')
      : bcrypt.hash(password, 12).then(hashedPassword =>
          new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          })
            .save()
            .then(_ => res.redirect('/login'))
        );
  });
}

export default {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
};

// function postSignup(req, res, next) {
//   const email = req.body.email;
//   const password = req.body.password;
//   const confirmPassword = req.body.confirmPasswordpassword;

//   User.findOne({ email: email })
//     .then(userDoc => {
//       if (userDoc) return res.redirect('/signup');

//       return bcrypt
//         .hash(password, 12)
//         .then(hashedPassword => {
//           const user = new User({
//             email: email,
//             password: hashedPassword,
//             cart: { items: [] },
//           });
//           return user.save();
//         })
//         .then(_ => res.redirect('/login'));
//     })
//     .catch(err => console.error(err));
// }
