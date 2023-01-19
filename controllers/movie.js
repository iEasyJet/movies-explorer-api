const Movie = require('../models/movie');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const Forbidden = require('../errors/Forbidden');
const CastError = require('../errors/CastError');
const {
  ERR_VE, ERR_CE_MOVIE, ERR_NFE_MOVIE,
  ERR_FORB, ERR_CE, MOVIE_DELETION_CONFIRMATION,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send({ movies });
    })
    .catch((err) => {
      next(err);
    });
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, nameRU, nameEN, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => {
      res.send({ movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(ERR_VE));
      } else if (err.code === 11000) {
        next(new ConflictError(ERR_CE_MOVIE));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFoundError(ERR_NFE_MOVIE);
    })
    .then((movie) => {
      if (String(req.user._id) !== String(movie.owner)) {
        throw new Forbidden(ERR_FORB);
      }
      return Movie.findByIdAndRemove(movie._id);
    })
    .then(() => {
      res.send({ message: MOVIE_DELETION_CONFIRMATION });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError(ERR_CE));
      } else {
        next(err);
      }
    });
};

module.exports = { getMovies, createMovie, deleteMovie };
