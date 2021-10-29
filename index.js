const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rzfie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("GarlandHotel");
    const offersCollection = database.collection("offers");
    console.log("server is running");

    //
    app.get("/offers", async (req, res) => {
      const cursor = offersCollection.find({});
      const offers = await cursor.toArray();
      res.send(offers);
    });

    //end code
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running Garland server");
});

app.get("/hello", (req, res) => {
  res.send("Hello updated here.");
});

app.listen(port, () => {
  console.log("Running Garland Server on Port", port);
});
