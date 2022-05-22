require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const bodyParser = require('body-parser');
const singleRouter = require('./routes/singleRouter');
const corsHandler = require('./middlewars/cors');
const errorHandler = require('./middlewars/errorHandler');
const ratelimiter = require('./middlewars/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewars/logger');
const { MONGO_SERVER } = require('./utils/constants');

const { PORT = 3001 } = process.env;

const app = express();

app.use(helmet());

app.use(requestLogger);

app.use(ratelimiter);

app.use(cors());
/* app.use(corsHandler); */

mongoose.connect(MONGO_SERVER);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(singleRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
