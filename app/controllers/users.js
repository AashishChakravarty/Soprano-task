const users = require('../models/users');
const security = require('../helpers/security');

const registration = async (req, res) => {
  users
    .findOne({ email: req.body.email })
    .then((result) => {
      if (result) {
        res.json({
          status: false,
          message: 'Email Id Already Registered',
        });
      } else {
        const encryptedPassword = security.hashPassword(req.body.password);
        users
          .create({
            name: req.body.name,
            email: req.body.email,
            password: encryptedPassword,
            token: ''
          })
          .then((result) => {
            res.json({
              status: true,
              message: 'Successfully Registered Please Login',
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: 'Something went to wrong please try again',
              status: false,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Something went to wrong please try again',
        status: false,
      });
    });
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  users
    .findOne({ email })
    .then((user) => {
      if (user) {
        const isValidUser = security.comparePasswords(password, user.password);
        if (isValidUser) {
          // After successful login
          // STEP 1: Generate JWT token.
          let userPayload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            iat: new Date().getTime()
          };
          let token = security.generateToken(userPayload);
          users
            .findByIdAndUpdate(
              { _id: user._id },
              { token }
            )
            .then((result) => {
              const data = {
                id: user._id,
                name: user.name,
                email: user.email,
                token
              }
              res.json({
                status: true,
                message: 'Successfully Login',
                data
              });
            })
            .catch((err) => {
              next(err);
            });
        } else {
          res.status(401).send({
            message: 'Invalid Email and Password',
            status: false,
          });
        }
      } else {
        res.status(401).send({
          message: 'Invalid Email and Password',
          status: false,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Something went to wrong please try again',
        status: false,
      });
    });
};

module.exports = { registration, login }
