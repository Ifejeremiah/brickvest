const res = require('express/lib/response');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const sendEmail = require('../config/nodemailer')();
const emailBody = require('../config/emails');

const { successResponse, errorResponse } = require('../config/responses');



// Validate user
// @params email, password
// @return ERROR if credentials are false
// @return JWT

const login = (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return errorResponse(res, err);

    } else if (user) {
      const token = user.generateJwt();

      return successResponse(res, 'User login successful', { token });
    } else {
      return errorResponse(res, info.error, 401);
    }
  })(req, res);

};



// Create a new user
// @params name, email, password, confirm password
// @return ERROR if credentials are incomplete, low password strenght or both passwords don't match
// @return JWT

const register = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email: email.toLowerCase() }).then(user => {
    if (user) {
      return errorResponse(res, 'Email is already in use', 409);
    }

    const newUser = new User();
    newUser.name = name;
    newUser.email = email.toLowerCase();
    newUser.setPassword(password);

    newUser.save().then(() => {
      const token = newUser.generateJwt();
      successResponse(res, 'User created successfully', { token }, 201);

    }).catch(err => {
      console.log(err);
      return errorResponse(res, err.message)
    });

  }).catch(err => console.log(err));
};



// Handle account recovery, user sends over email 
// @params email
// @return ERROR if email is not found
// @return SUCCESS if email found and send a token to email address

const verifyEmail = (req, res) => {
  const { email } = req.params;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return errorResponse(res, 'User not found', 404)
      }

      // Get the recovery token
      const token = user.createVerifyToken();

      user.save()
        .then(() => {

          // Model email
          const mail = emailBody.mail(token);
          console.log(token);

          // Send token to email address
          // sendEmail.send(email, mail.sub, mail.body);

          return successResponse(res, 'user found, recovery token sent to email');
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
const verifyToken = (req, res) => {
  const { email, token } = req.params;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return errorResponse(res, 'User not found', 404)
      }

      // Verify recovery token
      const validToken = user.isValidVerifyToken(token);

      // Send error msg if token is invalid
      if (!validToken) {
        return errorResponse(res, 'Invalid recovery token')
      }

      // Update account verified status
      user.is_verified = true;

      user.save()
        .then(() => {
          // Send JWT if token is valid
          const token = user.generateJwt();
          return successResponse(res, 'User verified successfully', token)
        })
        .catch(err => {
          console.log(err)
          return errorResponse(res)
        });
    })
    .catch(err => console.log(err));
}



module.exports = {
  login,
  register,
  verifyEmail,
  verifyToken
}