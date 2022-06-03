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
  //app.use(express.static(path.resolve(__dirname, '../client/build')));
  let x = path.join(__dirname, "../client/build")
  app.use(express.static(path.join(__dirname, "../client/build")))

  let y = path.join(__dirname, "../client/build/index.html")

  app.get(favicon(path.join(__dirname, '../client/public', 'favicon.ico')))

  app.get("/table", async (req, res) => {

    // Set variables
    const amount = 3; // Amout of data to put

    console.log("Starting to put data into Docstore DB...");
    console.log('This is middleware', req.originalUrl);

    // Loop for our amount of data to put
    for (let i = 0; i < amount; i++) {
      // Pseudo ID from timestamp + index should be enough for testing
      let pseudoId = new Date().getTime();

      let timestamp = new Date().getTime();

      // Random KWh values between 1.000 and 100.000
      let kwhValue = Math.floor(Math.random() * 100000) + 1000;
      await docstore.put({ _id: pseudoId, timestamp: timestamp, energy: kwhValue, pin: true })
    }

    var myMfas = await docstore.query((e) => e._id > 5)
    console.log("My Mfas", myMfas)
    res.json(myMfas)
    console.log("sent response")

  });

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../client/build/index.html")
    );
  })

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
 
}

main()