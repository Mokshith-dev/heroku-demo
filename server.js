// create an express app
const express = require("express");
const app = express();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

// use the express-static middleware
// app.use(express.static("client/build"));

// define the first route
app.get("/api/movie", async function (req, res) {
  console.log(uri);
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

    const database = client.db("myFirstDatabase");
    const collection = database.collection("movies");
    const cursor = await collection.find({});

    const movie = await cursor.next();
    //console.log(movie);
    return res.json(movie);
  } catch (err) {
    console.log(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  // const path = require("path");
  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  // });
}
// start the server listening for requests
app.listen(process.env.PORT || 3001, () => console.log("Server is running..."));
