const router = require('express').Router();
/* Контроллеры */
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');
/*  */
/* Валидация */
const { createMovieValidation, deleteMovieValidation } = require('../middlewars/movieValidation');
/*  */

router.get('/movies', getMovies);
router.post('/movies', createMovieValidation, createMovie);
router.delete('/movies/:movieId', deleteMovieValidation, deleteMovie);

module.exports = router;
