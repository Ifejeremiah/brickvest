const mongoose = require('mongoose');
const User = mongoose.model('User');
const emailBody = require('../config/emails');

const { Response } = require('../middlewares')


const verifyEmail = (req, res) => {
  const { email } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return Response.errorResponse(res, 'User not found', 404)
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

          return Response.successResponse(res, 'user found, recovery token sent to email');
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

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
  verifyEmail,
  verifyToken
}