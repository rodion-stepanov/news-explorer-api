const jwt = require('jsonwebtoken');
const { SECRET_STR, AUTHORIZATION_ERROR_MESSAGE } = require('../config');
const IncorrectAuthError = require('../errors/incorrect-auth-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new IncorrectAuthError(AUTHORIZATION_ERROR_MESSAGE);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_STR);
  } catch (err) {
    throw new IncorrectAuthError(AUTHORIZATION_ERROR_MESSAGE);
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
