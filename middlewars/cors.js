const cors = require('cors');

const corsHandler = cors({
  origin: 'http://localhost:3000, http://diploma.easyjet.nomoredomains.work, https://diploma.easyjet.nomoredomains.work',
  methods: ['OPTIONS', 'GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Cookie'],
  credentials: true,
});

module.exports = corsHandler;
