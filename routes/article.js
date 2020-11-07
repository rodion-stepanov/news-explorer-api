const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const isURL = require('validator/lib/isURL');
const isHexadecimal = require('validator/lib/isHexadecimal');
const { getAllArticles, createArticle, deleteArticle } = require('../controllers/article');

router.get('/articles', getAllArticles);

router.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required()
      .messages({
        'string.empty': 'Поле keyword не должно быть пустым',
        'string.required': 'Поле keyword должно быть заполнено',
      }),
    title: Joi.string().required()
      .messages({
        'string.empty': 'Поле title не должно быть пустым',
        'string.required': 'Поле title должно быть заполнено',
      }),
    text: Joi.string().required()
      .messages({
        'string.empty': 'Поле text не должно быть пустым',
        'string.required': 'Поле text должно быть заполнено',
      }),
    date: Joi.string().required()
      .messages({
        'string.empty': 'Поле date не должно быть пустым',
        'string.required': 'Поле date должно быть заполнено',
      }),
    source: Joi.string().required()
      .messages({
        'string.empty': 'Поле source не должно быть пустым',
        'string.required': 'Поле source должно быть заполнено',
      }),
    link: Joi.string().required()
      .custom((value, helpers) => {
        if (isURL(value)) {
          return value;
        }
        return helpers.message('Поле link должно быть ссылкой');
      }),
    image: Joi.string().required()
      .custom((value, helpers) => {
        if (isURL(value)) {
          return value;
        }
        return helpers.message('Поле image должно быть ссылкой');
      }),
  }),
}), createArticle);

router.delete('/articles/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required()
      .custom((value, helpers) => {
        if (isHexadecimal(value)) {
          return value;
        }
        return helpers.message('Некорректный id');
      }),
  }),
}), deleteArticle);

module.exports = router;
