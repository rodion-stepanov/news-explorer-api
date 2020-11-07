const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const IncorrectReqError = require('../errors/incorrect-req-err');

const getAllArticles = (req, res, next) => {
  Article.find({})
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
        next(new IncorrectReqError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.cardId)
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Нет статьи с таким id');
      } else if (String(article.owner) === req.user.id) {
        Article.findByIdAndDelete(req.params.id)
          .then((articleData) => {
            if (!articleData) {
              throw new NotFoundError('Нет статьи с таким id');
            }
            res
              .status(200)
              .send(articleData);
          })
          .catch(next);
      } else { throw new ForbiddenError('Нельзя удалять чужую статью'); }
    }).catch(next);
};

module.exports = { getAllArticles, createArticle, deleteArticle };
