const cors = require('cors');

const corsHandler = cors({
  origin: 'localhost:3003, https://ieasyjet.github.io/movies-explorer-frontend, http://ieasyjet.github.io/movies-explorer-frontend',
  methods: ['OPTIONS', 'GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Cookie'],
  credentials: true,
});

module.exports = corsHandler;
