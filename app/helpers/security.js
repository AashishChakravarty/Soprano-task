const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const CONSTANTS = require('../../utils/constants');

const hashPassword = plainTextPassword => {
  const saltRounds = 10;
  return bcrypt.hashSync(plainTextPassword, saltRounds); // returns hashed password
};

const comparePasswords = (plainTextPassword, hashedPassword) => {
  return bcrypt.compareSync(plainTextPassword, hashedPassword); // returns boolean value
};

const generateToken = payload => {
  return jwt.sign(payload, CONSTANTS.JWT.TOKEN_SECRET, {
    expiresIn: CONSTANTS.JWT.TOKEN_EXPIRY
  });
};

const verifyToken = token => {
  return new Promise(function (resolve, reject) {
    jwt.verify(token, CONSTANTS.JWT.TOKEN_SECRET, function (error, payload) {
      if (error) {
        reject(error);
      } else {
        resolve(payload);
      }
    });
  });
};

module.exports = {
  hashPassword,
  comparePasswords,
  generateToken,
  verifyToken
};
