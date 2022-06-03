// server/index.js
const path = require('path');
const express = require("express");
const PORT = process.env.PORT || 3001;
var cors = require('cors')
const bcrypt = require("bcryptjs")
const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');
var favicon = require('serve-favicon')

const app = express();

async function main() {

  // Create IPFS instance
  const ipfs = await IPFS.create();

  // Create OrbitDB instance
  const orbitDb = await OrbitDB.createInstance(ipfs);

  // Create docstore DB
  const docstore = await orbitDb.docstore('docstoreDB');
  console.log("Successfully created docstore");

  // Have Node serve the files for our built React app
  app.get(express.static(path.resolve(__dirname, '../client/build')));

  //app.get(favicon(path.join(__dirname, '../client/public', 'favicon.ico')))

  app.get("/mfa", async (req, res) => {

    // Set variables
    const amount = 2; // Amout of data to put
    const timestamp = new Date().getTime(); // Timestamp (Only set once so we don't affect performance too much)
    const timeStart = performance.now(); // Start time of the data loop

    console.log("Starting to put data into Docstore DB...");
    console.log('This is middleware', req.originalUrl);

    // Loop for our amount of data to put
    // for (let i = 0; i < amount; i++) {
    // Pseudo ID from timestamp + index should be enough for testing
    let pseudoId = timestamp;

    // Random KWh values between 1.000 and 100.000
    let kwhValue = Math.floor(Math.random() * 100000) + 1000;

    // Put line to DB
    await docstore.put({ _id: pseudoId, timestamp: timestamp, energy: kwhValue, pin: true })
      .then(() => docstore.query((e) => e._id > 5))
      .then((myMfas) => res.json(myMfas[0]))
      .then(() => console.log("sent response"))
      .catch(err => {
        console.log(err);
        res.sendStatus(501);
      });

  });

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

}

main()