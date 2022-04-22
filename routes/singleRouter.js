const router = require('express').Router();
/* Роуты user/movie */
const user = require('./user');
const movie = require('./movie');
/*  */
/* Логгер ошибок */
const { requestLogger, errorLogger } = require('../middlewars/logger');
/*  */
/* Контролер логина/создания пол-ля/аутентификация */
const { createUser, login } = require('../controllers/user');
const auth = require('../middlewars/auth');
/*  */
/* Ошибка */
const NotFoundError = require('../errors/NotFoundError');
/*  */
/* Валидация */
const { createUserValidation, loginValidation } = require('../middlewars/userValidation');
/*  */
router.use(requestLogger);

router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginValidation, login);

router.use('/', auth, user);
router.use('/', auth, movie);

router.use(errorLogger);

router.use((req, res, next) => {
  next(new NotFoundError('Ресурс не найден'));
});

module.exports = router;
