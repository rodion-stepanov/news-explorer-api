const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const IncorrectReqError = require('../errors/incorrect-req-err');
const {
  INCORRECT_ERROR_MESSAGE, INCORRECT_ID_MESSAGE,
  ARTICLE_OWNER_ERROR_MESSAGE, ARTICLE_ID_ERROR_MESSAGE,
} = require('../config');

const getAllArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      res
        .status(200)
        .send(articles);
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => {
      res
        .status(200)
        .send(article);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectReqError(INCORRECT_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .then((article) => {
      if (!article) {
        next(new NotFoundError(ARTICLE_ID_ERROR_MESSAGE));
      } else if (String(article.owner) === req.user._id) {
        Article.findByIdAndDelete(req.params.articleId)
          .then((articleData) => {
            if (!articleData) {
              next(new NotFoundError(ARTICLE_ID_ERROR_MESSAGE));
              return;
            }
            res
              .status(200)
              .send(articleData);
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              next(new IncorrectReqError(INCORRECT_ID_MESSAGE));
            } else {
              next(err);
            }
          });
      } else { next(new ForbiddenError(ARTICLE_OWNER_ERROR_MESSAGE)); }
    }).catch(next);
};

module.exports = { getAllArticles, createArticle, deleteArticle };
