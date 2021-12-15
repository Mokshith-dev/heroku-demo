// create an express app
const express = require("express");
const app = express();

const { MongoClient } = require("mongodb");

const uri = process.env;

// use the express-static middleware
app.use(express.static("public"));

// define the first route
app.get("/api/movie", async function (req, res) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

    const database = client.db("myFirstDatabase");
    const collection = database.collection("movies");
    const cursor = await collection.find({});

    const movie = await cursor.next();
    // console.log(movie);
    return res.json(movie);
  } catch (err) {
    console.log(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

// start the server listening for requests
app.listen(process.env.PORT || 3001, () => console.log("Server is running..."));
