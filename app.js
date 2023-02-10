const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
/* Routers */
const packRouter = require('./routes/packRoutes');

const app = express();

if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'dreamsmith' });
});

app.use('/api/v1/packs', packRouter);

module.exports = app;
