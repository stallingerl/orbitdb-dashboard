// server/index.js
const path = require('path');
const express = require("express");
const PORT = process.env.PORT || 3001;
var cors = require('cors')

const bcrypt = require("bcryptjs")
const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');


const app = express();

async function main() {

  // Create IPFS instance
  const ipfs = await IPFS.create();

  // Create OrbitDB instance
  const orbitDb = await OrbitDB.createInstance(ipfs);

  // Create docstore DB
  const docstore = await orbitDb.docstore('docstoreDB');
  console.log("Successfully created docstore");

  if (process.env.NODE_ENV === 'development') {
    app.use(cors())
  }

  app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

  app.get("/test", (req, res) => {
    res.json({ message: "TEST from server!" });
  });

  app.get("/mfa", async (req, res) => {

    // Our register logic starts here
    try {

      // Set variables
      const amount = 2; // Amout of data to put
      const timestamp = new Date().getTime(); // Timestamp (Only set once so we don't affect performance too much)
      const timeStart = performance.now(); // Start time of the data loop

      console.log("Starting to put data into Docstore DB...");

      // Loop for our amount of data to put
      for (let i = 0; i < amount; i++) {
        // Pseudo ID from timestamp + index should be enough for testing
        let pseudoId = timestamp + i;

        // Random KWh values between 1.000 and 100.000
        let kwhValue = Math.floor(Math.random() * 100000) + 1000;

        // Put line to DB
        let result = await docstore.put({ _id: pseudoId, timestamp: timestamp, "1-0:1.8.0*255": kwhValue, pin: true });
        console.log("added entry ", i)
      }


      let myMfas = await docstore.query((e) => e._id > 5)
      myMfas = JSON.stringify(myMfas)

      console.log("Successfully read my entries: ", myMfas.length)

      // return new user
      res.json({ message: myMfas });

    } catch (err) {
      console.log(err);
    }
  });

  // Have Node serve the files for our built React app
  app.use(express.static(path.resolve(__dirname, '../client/build')));

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

  // All other GET requests not handled before will return our React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });


}

main()