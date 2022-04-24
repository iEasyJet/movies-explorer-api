const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const CastError = require('../errors/CastError');
const Unauthorized = require('../errors/Unauthorized');
const {
  ERR_VE_USER_AVATAR, ERR_VE,
  ERR_CE_USER_EMAIL, ERR_NFE_USER,
  ERR_CE, ERR_NOAUTH, DEV_SECRET,
} = require('../utils/constants');

const { NODE_ENV, CRYPTO_KEY } = process.env;

const getUser = (req, res, next) => {
  const { _id } = req.user;
  console.log(_id);
  User.findById(_id)
    .orFail(() => {
      next(new NotFoundError(ERR_NFE_USER));
    })
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError(ERR_CE));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new ValidationError(ERR_VE_USER_AVATAR),
        );
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({ name, email, password: hash })
        .then((user) => {
          res.send({ name: user.name, email: user.email, _id: user._id });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new ValidationError(ERR_VE));
          } else if (err.code === 11000) {
            next(new ConflictError(ERR_CE_USER_EMAIL));
          } else {
            next(err);
          }
        });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized(ERR_NOAUTH));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new Unauthorized(ERR_NOAUTH),
          );
        }
        return user;
      });
    })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? CRYPTO_KEY : DEV_SECRET,
        { expiresIn: '7d' },
      );
      req.user = user._id;
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getUser,
  updateUser,
  createUser,
  login,
};
