const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');



// User actions schema
const actionSchema = new mongoose.Schema({
  body: String
}, { timestamps: true });


// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      trim: true,
      lowercase: true
    },

    email: {
      type: String,
      unique: [true, 'can not accept duplicate emails'],
      required: [true, 'email is required'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'enter valid email address'],
      trim: true,
      lowercase: true
    },

    password: {
      salt: {
        type: String
      },

      hash: {
        type: String
      },
    },

    image: {
      type: String,
      default: null
    },

    is_active: {
      type: Boolean,
      default: true,
    },

    is_verified: {
      type: Boolean,
      default: false,
    },

    google_oauth_token: {
      type: String,
      default: null
    },

    verify_token: {
      salt: {
        type: String,
        default: null
      },
      hash: {
        type: String,
        default: null
      },
    },

    role: {
      type: String,
      enum: ['facilitator', 'administrator', 'customer'],
      default: 'customer'
    },

    activities: [actionSchema],
  },

  { timestamps: true }
);


// Encrypt and store passwords 
userSchema.methods.setPassword = function (password) {
  this.password.salt = crypto.randomBytes(16).toString('hex');
  this.password.hash = crypto.pbkdf2Sync(password, this.password.salt, 10000, 64, 'sha512').toString('hex');
};



// Validate password 
userSchema.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.password.salt, 10000, 64, 'sha512').toString('hex');
  return this.password.hash === hash;
}



// Set and store recovery tokens
userSchema.methods.createVerifyToken = function () {
  const random_code = crypto.randomBytes(5).toString('hex');

  this.verify_token.salt = crypto.randomBytes(16).toString('hex');
  this.verify_token.hash = crypto.pbkdf2Sync(
    random_code,
    this.verify_token.salt,
    10000, 64, 'sha512'
  ).toString('hex');

  return random_code;
};



// Validate recovery token
userSchema.methods.isValidVerifyToken = function (code) {
  let isValid;

  if (this.verify_token.salt !== null) {
    const hash = crypto.pbkdf2Sync(
      code, this.verify_token.salt, 10000, 64, 'sha512'
    ).toString('hex');

    isValid = this.verify_token.hash === hash;
  } else {
    isValid = false
  }

  if (isValid) {
    this.verify_token.salt = null;
    this.verify_token.hash = null;
  }

  return isValid;
};



// Generate JWT for managing sessions
userSchema.methods.generateJwt = function () {
  return jwt.sign({
    _id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    is_verified: this.is_verified,
    is_active: this.is_active
  }, process.env.JWT_SECRET, { expiresIn: '1h' });
};



// Store users activities
userSchema.methods.setAction = function (data) {
  this.activities.push({ body: data });
}




mongoose.model('User', userSchema);