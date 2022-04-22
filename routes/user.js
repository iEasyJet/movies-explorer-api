const router = require('express').Router();
/* Контроллеры */
const {
  getUser,
  updateUser,
} = require('../controllers/user');
/*  */
/* Валидация */
const { userUpdateValidation } = require('../middlewars/userValidation');
/*  */

router.get('/users/me', getUser);
router.patch('/users/me', userUpdateValidation, updateUser);

module.exports = router;
