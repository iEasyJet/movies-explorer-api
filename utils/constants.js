const MONGO_SERVER = 'mongodb://localhost:27017/moviesdb';
const DEV_SECRET = 'dev-secret';
const MOVIE_DELETION_CONFIRMATION = 'Фильм успешно удален!';
const WRONG_URL = 'Неправльный адрес ссылки';
const WRONG_URL_IMG = 'Неверный формат ссылки на изображение';
const WRONG_URL_TRAILER = 'Неверный формат ссылки на трейлер';
const WRONG_URL_SMALLIMG = 'Неверный формат ссылки на миниатюрное изображение';
const WRONG_EMAIL = 'Неверный формат почты';

/* ValidationError */
const ERR_VE = 'Переданы неккоретные данные';
const ERR_VE_USER_AVATAR = 'Переданы некорректные данные при обновлении профиля';
/*  */

/* ConflictError */
const ERR_CE_USER_EMAIL = 'Пользователь с такой почтой уже существует';
const ERR_CE_MOVIE = 'Такой фильм уже существует';
/*  */

/* NotFoundError */
const ERR_NFE_USER = 'Нет пользователя с переданным id';
const ERR_NFE_MOVIE = 'Фильм с указанным _id не найден';
const ERR_NFE_WRONG_ROUTE = 'Ресурс не найден';
/*  */

/* CastError */
const ERR_CE = 'Переданы неккоретные данные';
/*  */

/* Unauthorized */
const ERR_NOAUTH = 'Неправльные почта или пароль';
/*  */

/* Forbidden */
const ERR_FORB = 'Нет прав на удаление карточки';
/*  */

/* Error Server */
const ERR_SERVER = 'На сервере произошла ошибка';
/*  */

module.exports = {
  MONGO_SERVER,
  ERR_VE_USER_AVATAR,
  ERR_VE,
  ERR_CE_USER_EMAIL,
  ERR_NFE_USER,
  ERR_CE,
  ERR_NOAUTH,
  DEV_SECRET,
  ERR_CE_MOVIE,
  ERR_NFE_MOVIE,
  ERR_FORB,
  MOVIE_DELETION_CONFIRMATION,
  ERR_SERVER,
  WRONG_URL,
  WRONG_URL_IMG,
  WRONG_URL_TRAILER,
  WRONG_URL_SMALLIMG,
  WRONG_EMAIL,
  ERR_NFE_WRONG_ROUTE,
};
