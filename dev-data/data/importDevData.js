require('dotenv').config({ path: './.prv.env' });
const fs = require('fs');
const mongoose = require('mongoose');

const Sample = require('../../models/sampleModel');
const Pack = require('../../models/packModel');

/* Connect to MongoDB database */
// const DB = process.env.MONGO_URL.replace(
//   '<PASSWORD>',
//   process.env.MONGO_PWD
// )
//   .replace('<USERNAME>', process.env.MONGO_USER)
//   .replace('<DATABASE>', process.env.MONGO_DB);
const DB = process.env.MONGO_URL_LOCAL.replace(
  '<DATABASE>',
  process.env.MONGO_DB
);

mongoose.set('strictQuery', false);
mongoose
  .connect(DB)
  .then((con) => {
    console.log('DB connection successful');
    return con;
  })
  .then((con) => {
    // READ JSON FILE
    // const users = JSON.parse(
    //   fs.readFileSync(__dirname + "/users.json", "utf-8")
    // );
    const packs = JSON.parse(
      fs.readFileSync(__dirname + '/packs.json')
    );
    const samples = JSON.parse(
      fs.readFileSync(__dirname + '/samples.json')
    );

    // IMPORT DATA INTO DB
    // const importUsers = async () => {
    //   try {
    //     console.log("Importing users...");
    //     await User.insertMany(users);
    //     console.log("Imported users.");
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    const importPacks = async () => {
      try {
        console.log('Importing packs...');
        await Pack.insertMany(packs);
        console.log('Imported packs.');
      } catch (err) {
        console.log(err);
      }
    };

    const importSamples = async () => {
      try {
        console.log('Importing samples...');
        await Sample.insertMany(samples);
        console.log('Imported samples.');
      } catch (err) {
        console.log(err);
      }
    };

    const importData = async () => {
      try {
        // await importUsers();
        await importPacks();
        await importSamples();
      } catch (err) {
        console.error(`Failed to import data: ${err}`);
      }
      process.exit(1);
    };

    // DELETE ALL DATA FROM DB
    const deleteData = async () => {
      try {
        console.log('Dropping database...');
        //await con.dropDatabase();
        await mongoose.connection.db.dropDatabase();
        console.log('Dropped database.');
      } catch (err) {
        console.log(err);
      }
      process.exit(1);
    };

    if (process.argv[2] === '--import') {
      importData();
    } else if (process.argv[2] === '--delete') {
      deleteData();
    }
  });
