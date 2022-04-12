const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const sendEmail = require('../config/nodemailer')();
const emailBody = require('../config/emails')



// Validate user
// @params email, password
// @return ERROR if credentials are false
// @return JWT

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please fill all fields' });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(400).json(err);
    } else if (user) {
      const token = user.generateJwt();
      return res.status(200).json({ token });
    }
    return res.status(401).json(info);
  })(req, res);
};



// Create a new user
// @params name, email, password, confirm password
// @return ERROR if credentials are incomplete, low password strenght or both passwords don't match
// @return JWT

const register = (req, res) => {
  const { name, email, password, password2 } = req.body;

  if (!name || !email || !password || !password2) {
    return res.status(400).json({ error: 'please fill all fields' });
  } else if (password.length < 6) {
    return res.status(400).json({ error: 'passwords should be at least 6 characters' });
  } else if (password !== password2) {
    return res.status(403).json({ error: 'passwords do not match' });
  }

  User.findOne({ email: email.toLowerCase() }).then(user => {
    if (user) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    const newUser = new User();
    newUser.name = name;
    newUser.email = email.toLowerCase();
    newUser.setPassword(password);

    newUser.save().then(() => {
      const token = newUser.generateJwt();

      return res.status(201).json({ token });
    }).catch(err => {
      console.log(err);
      return res.status(400).json({ error: err.message });
    });

  }).catch(err => console.log(err));
};



// Handle account recovery, user sends over email 
// @params email
// @return ERROR if email is not found
// @return SUCCESS if email found and send a token to email address

const recoverEmail = (req, res) => {
  const { email } = req.params;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'user not found' });
      }

      // Get the recovery token
      const token = user.createVerifyToken();

      user.save()
        .then(() => {
          
          // Model email
          const mail = emailBody.mail(token);

          // Send token to email address
          sendEmail.send(email, mail.sub, mail.body);

          return res.status(200).json({ msg: `user found, recovery token sent to email` });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}



// Handle account recovery, user sends over email and token
// @params email, token
// @return ERROR if email is not found or token is invalid
// @return SUCCESS if email and token is good
// @return JWT 
const recoverToken = (req, res) => {
  const { email, token } = req.params;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'user not found' });
      }

      // Verify recovery token
      const validToken = user.isValidVerifyToken(token);

      // Send error msg if token is invalid
      if (!validToken) {
        return res.status(400).json({ error: 'invalid recovery token' });
      }

      user.save()
        .then(() => {
          // Send JWT if token is valid
          const token = user.generateJwt();
          return res.status(200).json({ token });
        })
        .catch(err => {
          console.log('Hey, there is an error here')
          console.log(err)
        });
    })
    .catch(err => console.log(err));
}



module.exports = {
  login,
  register,
  recoverEmail,
  recoverToken
}