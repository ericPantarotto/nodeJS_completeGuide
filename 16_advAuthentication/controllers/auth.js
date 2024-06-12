import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import nodemailer from 'nodemailer';
import User from '../models/user.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ericpython1980@gmail.com',
    pass: process.env.GMAIL_APP,
  },
});

function getLogin(req, res, next) {
  const message = req.flash('errorLogin');
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message.length > 0 ? message[0] : null,
  });
}
function postLogin(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return Promise.resolve(
          req.flash('errorLogin', 'Invalid email or password.')
        ).then(_ => res.redirect('/login'));
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }

          Promise.resolve(
            req.flash('errorLogin', 'Invalid email or password.')
          ).then(_ => res.redirect('/login'));
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
}

function postLogout(req, res, next) {
  req.session.destroy(_ => res.redirect('/'));
}

function getSignup(req, res, next) {
  const message = req.flash('errorSignup');

  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message.length > 0 ? message[0] : null,
  });
}

function postSignup(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then(async userDoc => {
      if (userDoc) {
        const _ = await Promise.resolve(
          req.flash('errorSignup', 'Email exists already ...')
        );
        return res.redirect('/signup');
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        email: email,
        password: hashedPassword,
        cart: { items: [] },
      });
      await user.save();

      transporter
        .sendMail({
          to: email,
          from: 'ericpython1980@gmail.com',
          subject: 'Signup succeeded',
          html: '<h1>You successfully signed up!</h1>',
        })
        .catch(error => {
          console.log('error = ', error, '\n');
        });

      return res.redirect('/login');
    })
    .catch(err => console.error(err));
}

function getReset(req, res, next) {
  const message = req.flash('errorReset');
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: message.length > 0 ? message[0] : null,
  });
}

function postReset(req, res, next) {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.error(err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          req.flash('errorReset', 'No account with that email found.');
          return res.redirect('/reset');
        }

        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user
          .save()
          .then(_ => {
            transporter.sendMail({
              to: req.body.email,
              from: 'ericpython1980@gmail.com',
              subject: 'Password reset',
              html: `
                <p>You requested a password reset</p>
                <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>`,
            });
            return res.redirect('/');
          })
          .catch(error => {
            console.log('error = ', error, '\n');
          });
      })
      .catch(err => console.error(err));
  });
}

function getNewPassword(req, res, next) {
  const token = req.params.token;

  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        console.log('no user');
        req.flash('errorReset', 'Token Expired. Reset again');
        return res.redirect('/reset');
      }

      res.render('auth/new-password', {
        path: '/new-password',
        pageTitle: 'New Password',
        userId: user.id,
      });
    })
    .catch(err => {
      console.log(err);
    });
}

export default {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
  getReset,
  postReset,
  getNewPassword,
};

// function postSignup(req, res, next) {
//   const email = req.body.email;
//   const password = req.body.password;
//   const confirmPassword = req.body.confirmPasswordpassword;

// User.findOne({ email: email }).then(userDoc => {
//   return userDoc
//     ? res.redirect('/signup')
//     : bcrypt.hash(password, 12).then(hashedPassword =>
//         new User({
//           email: email,
//           password: hashedPassword,
//           cart: { items: [] },
//         })
//           .save()
//           .then(_ => res.redirect('/login'))
//       );
// });
// }
