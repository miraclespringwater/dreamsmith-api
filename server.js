require('dotenv').config({ path: './.prv.env' });
const mongoose = require('mongoose');
const app = require('./app');

/* TODO: Need to handle uncaughtException */

/* Connect to MongoDB database */
// const DB = process.env.MONGO_URL.replace("<PASSWORD>", process.env.MONGO_PWD)
//   .replace("<USERNAME>", process.env.MONGO_USER)
//   .replace("<DATABASE>", process.env.MONGO_DB);
const DB = process.env.MONGO_URL_LOCAL.replace(
  '<DATABASE>',
  process.env.MONGO_DB
);

mongoose.set('strictQuery', false);
mongoose.connect(DB).then((con) => {
  console.log('DB connection successful');
});

/* Start Express Server */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `Dreamsmith [${process.env.NODE_ENV}] running on port ${port}`
  );
});

/* TODO: Handle unhandledRejection */
