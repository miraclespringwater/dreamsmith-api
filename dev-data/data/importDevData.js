require("dotenv").config({ path: "./.prv.env" });
const fs = require("fs");
const mongoose = require("mongoose");
const AudioCollection = require("../../models/audioCollectionModel");
const Audio = require("../../models/audioModel");
const User = require("../../models/userModel");

/* Connect to MongoDB database */
const DB = process.env.MONGO_URL.replace("<PASSWORD>", process.env.MONGO_PWD)
  .replace("<USERNAME>", process.env.MONGO_USER)
  .replace("<DATABASE>", process.env.MONGO_DB);

mongoose.set("strictQuery", false);
mongoose
  .connect(DB)
  .then((con) => {
    console.log("DB connection successful");
    return con;
  })
  .then((con) => {
    // READ JSON FILE
    const users = JSON.parse(
      fs.readFileSync(__dirname + "/users.json", "utf-8")
    );
    const audioCollections = JSON.parse(
      fs.readFileSync(__dirname + "/audioCollections.json")
    );
    const audio = JSON.parse(fs.readFileSync(__dirname + "/audio.json"));

    // IMPORT DATA INTO DB
    const importUsers = async () => {
      try {
        console.log("Importing users...");
        await User.insertMany(users);
        console.log("Imported users.");
      } catch (err) {
        console.log(err);
      }
    };

    const importAudioCollections = async () => {
      try {
        console.log("Importing audio collections...");
        await AudioCollection.insertMany(audioCollections);
        console.log("Imported audio collections.");
      } catch (err) {
        console.log(err);
      }
    };

    const importAudio = async () => {
      try {
        console.log("Importing audio...");
        await Audio.insertMany(audio);
        console.log("Imported audio.");
      } catch (err) {
        console.log(err);
      }
    };

    const importData = async () => {
      try {
        await importUsers();
        await importAudioCollections();
        await importAudio();
      } catch (err) {
        console.error(`Failed to import data: ${err}`);
      }
      process.exit(1);
    };

    // DELETE ALL DATA FROM DB
    const deleteData = async () => {
      try {
        console.log("Dropping database...");
        //await con.dropDatabase();
        await mongoose.connection.db.dropDatabase();
        console.log("Dropped database.");
      } catch (err) {
        console.log(err);
      }
      process.exit(1);
    };

    if (process.argv[2] === "--import") {
      importData();
    } else if (process.argv[2] === "--delete") {
      deleteData();
    }
  });
