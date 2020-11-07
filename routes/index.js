const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./user');
const articleRouter = require('./article');
const auth = require('../middlewares/auth');
const notFoundRouter = require('./notFound');
const { createUser, login } = require('../controllers/user');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'any.required': 'Поле email должно быть заполнено',
        'string.empty': 'Поле email не должно быть пустым',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'any.required': 'Поле password должно быть заполнено',
        'string.empty': 'Поле password не должно быть пустым',
        'string.min': 'Минимальная длина пароля 8 символов',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле name должно быть заполнено',
        'string.empty': 'Поле name не должно быть пустым',
        'string.min': 'Минимальная длина имени 8 символов',
        'string.max': 'Максимальная длина имени 30 символов',
      }),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'any.required': 'Поле email должно быть заполнено',
        'string.empty': 'Поле email не должно быть пустым',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'any.required': 'Поле password должно быть заполнено',
        'string.empty': 'Поле password не должно быть пустым',
        'string.min': 'Минимальная длина пароля 8 символов',
      }),
  }),
}), login);

router.use(auth);
router.use(userRouter);
router.use(articleRouter);
router.use(notFoundRouter);

module.exports = router;
