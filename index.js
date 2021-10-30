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
    const sportsCollection = database.collection("sports");

    //get offers
    app.get("/offers", async (req, res) => {
      const cursor = offersCollection.find({});
      const offers = await cursor.toArray();
      res.send(offers);
    });

    //get sports
    app.get("/sports", async (req, res) => {
      const cursor = sportsCollection.find({});
      const sports = await cursor.toArray();
      res.send(sports);
    });

    //POST API

    app.post("/sports", async (req, res) => {
      const sports = req.body;
      const result = await sportsCollection.insertOne(sports);
      res.json(result);
    });

    //DELETE API
    app.delete("/sports/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await sportsCollection.deleteOne(query);
      res.json(result);
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
