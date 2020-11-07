const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const IncorrectReqError = require('../errors/incorrect-req-err');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Нет пользователя с таким id'));
      }
      res
        .status(200)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectReqError('Ошибка валидации ID'));
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
                id: user._id,
                email: user.email,
                name: user.name,
              },
            });
        })
        .catch((err) => {
          if (err.name === 'MongoError' && err.code === 11000) {
            next(new ConflictError('Пользователь с таким email уже существует'));
          }
          if (err.name === 'ValidationError') {
            next(new IncorrectReqError('Некорректные данные'));
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
        throw new NotFoundError('Нет пользователя с таким id');
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectReqError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = { getUser, createUser, login };
