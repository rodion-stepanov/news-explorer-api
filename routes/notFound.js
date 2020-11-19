const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');

const notFound = () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
};

router.get('*', notFound);

module.exports = router;
