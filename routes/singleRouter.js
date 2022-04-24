const router = require('express').Router();
const user = require('./user');
const movie = require('./movie');
const { createUser, login } = require('../controllers/user');
const auth = require('../middlewars/auth');
const NotFoundError = require('../errors/NotFoundError');
const { createUserValidation, loginValidation } = require('../middlewars/userValidation');
const { ERR_NFE_WRONG_ROUTE } = require('../utils/constants');

router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginValidation, login);

router.use('/', auth, user);
router.use('/', auth, movie);

router.use((req, res, next) => {
  next(new NotFoundError(ERR_NFE_WRONG_ROUTE));
});

module.exports = router;
