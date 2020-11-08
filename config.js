const {
  NODE_ENV, JWT_SECRET, PORT, DATABASE,
} = process.env;

const SECRET_STR = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : 'bolshoySecret';
const SERVER_PORT = NODE_ENV === 'production' && PORT ? PORT : 3000;
const MONGODB = NODE_ENV === 'production' && DATABASE ? DATABASE : 'mongodb://localhost:27017/newsdb';

const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';
const INCORRECT_ERROR_MESSAGE = 'Некорректные данные';
const INCORRECT_ID_MESSAGE = 'Ошибка валидации ID';
const AUTHORIZATION_ERROR_MESSAGE = 'Необходима авторизация';
const USER_ID_ERROR_MESSAGE = 'Нет пользователя с таким ID';
const USER_DUBLICATE_ERROR_MESSAGE = 'Пользователь с таким email уже существует';
const ARTICLE_ID_ERROR_MESSAGE = 'Нет статьи с таким ID';
const ARTICLE_OWNER_ERROR_MESSAGE = 'Нельзя удалять чужую статью';

module.exports = {
  SECRET_STR,
  SERVER_PORT,
  MONGODB,
  SERVER_ERROR_MESSAGE,
  INCORRECT_ERROR_MESSAGE,
  INCORRECT_ID_MESSAGE,
  AUTHORIZATION_ERROR_MESSAGE,
  USER_ID_ERROR_MESSAGE,
  USER_DUBLICATE_ERROR_MESSAGE,
  ARTICLE_ID_ERROR_MESSAGE,
  ARTICLE_OWNER_ERROR_MESSAGE,
};
