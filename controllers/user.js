const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  SECRET_STR, INCORRECT_ERROR_MESSAGE, INCORRECT_ID_MESSAGE,
  USER_ID_ERROR_MESSAGE, USER_DUBLICATE_ERROR_MESSAGE,
} = require('../config');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const IncorrectReqError = require('../errors/incorrect-req-err');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(USER_ID_ERROR_MESSAGE));
        return;
      }
      res
        .status(200)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectReqError(INCORRECT_ID_MESSAGE));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { email, name } = req.body;
  return bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({ email, password: hash, name })
        .then((user) => {
          res
            .status(200)
            .send({
              data:
              {
                _id: user._id,
                email: user.email,
                name: user.name,
              },
            });
        })
        .catch((err) => {
          if (err.name === 'MongoError' && err.code === 11000) {
            next(new ConflictError(USER_DUBLICATE_ERROR_MESSAGE));
            return;
          }
          if (err.name === 'ValidationError') {
            next(new IncorrectReqError(INCORRECT_ERROR_MESSAGE));
          } else {
            next(err);
          }
        });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(USER_ID_ERROR_MESSAGE));
        return;
      }
      const token = jwt.sign({ _id: user._id }, SECRET_STR, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectReqError(INCORRECT_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports = { getUser, createUser, login };
