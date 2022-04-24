const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');
const { createMovieValidation, deleteMovieValidation } = require('../middlewars/movieValidation');

router.get('/movies', getMovies);
router.post('/movies', createMovieValidation, createMovie);
router.delete('/movies/:movieId', deleteMovieValidation, deleteMovie);

module.exports = router;
