require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const singleRouter = require('./routes/singleRouter');
const corsHandler = require('./middlewars/cors');
const errorHandler = require('./middlewars/errorHandler');
const ratelimiter = require('./middlewars/rateLimiter');

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());
app.use(ratelimiter);

app.use(corsHandler);

mongoose.connect('mongodb://localhost:27017/moviesdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(singleRouter);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
