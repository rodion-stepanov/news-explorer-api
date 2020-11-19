const errorHandler = ((err, req, res, next) => {
  if (!err.statusCode) {
    // если у ошибки нет статуса, выставляем 500
    const { statusCode = 500, message } = err;

    res
      .status(statusCode)
      .send({
        message: statusCode === 500
          ? 'На сервере произошла ошибка'
          : message,
      });
    return;
  }
  res.status(err.statusCode).send({ message: err.message });
  next();
});

module.exports = errorHandler;
