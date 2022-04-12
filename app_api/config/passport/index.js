const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const User = mongoose.model('User');



// LOCAL STRATEGY Config, to query for one document with supplied email, and to check for valid password
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },

    (email, password, done) => {

      User.findOne({ email: email.toLowerCase() })
        .then(user => {
          if (!user) {
            return done(null, false, { error: 'Incorrect email' });
            
          } else if (!user.validPassword(password)) {
            return done(null, false, { error: 'Incorrect password' });
          }

          return done(null, user);
        })
        .catch(err => done(err));

    }
  )
);