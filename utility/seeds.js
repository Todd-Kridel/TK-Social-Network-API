

const connection = require("../config/connection");
const {User, Thought} = require("../models");
const userSeedData = require("./userSeedData.json")


connection.on("error", (err) => err);


connection.once("open", async () => {
  console.log("The Social Media API application database is connected.");
  await User.deleteMany({});
  await User.collection.insertMany(userSeedData);
  await Thought.deleteMany({});
  console.table(userSeedData);
  console.info("The Social Media API application database has been seeded with starting data.");
  process.exit(0);
});

