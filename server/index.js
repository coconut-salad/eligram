const express = require('express');
const cors = require('cors');

const DB = require('./src/utils/DB');
const API = require('./src/api');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', API);

app.use('/assets', express.static('src/public'));

app.use(async (req, res, next) => {
  res.status(404).json({
    message: 'Not Found',
    status: 404,
    documentation_url: '/api/docs',
  });
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode).json({
    message: err.message,
    status: err.statusCode,
  });
});

DB()
  .then(() => {
    console.log('DB connected');
    return app.listen(PORT);
  })
  .then(() => {
    console.log('Server started');
  })
  .catch((err) => {
    console.log(err);
    process.exit(0);
  });
