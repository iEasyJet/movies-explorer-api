const { Joi, celebrate, Segments } = require('celebrate');

const userUpdateValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional().min(2).max(30),
    email: Joi.string().optional().email(),
  }),
});

const createUserValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const loginValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const authValidation = celebrate({
  [Segments.HEADERS]: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
});

module.exports = {
  userUpdateValidation,
  createUserValidation,
  loginValidation,
  authValidation,
};
