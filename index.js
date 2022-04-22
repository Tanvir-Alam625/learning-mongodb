const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const app = express();
const port = process.env.PROT || 5000;
//middellware
app.use(cors());
app.use(express.json());
//------------------------
//Mongodb;
//------------------------
// userName:dbtanvir45
//password: 5Sc3JT4SitquntST

const uri =
  "mongodb+srv://dbtanvir45:5Sc3JT4SitquntST@cluster0.dq2tc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const userCollection = client.db("foodExpress").collection("users");

    //  const result = await userCollection.insertOne(user);
    //  console.log("dbs connection successfully", result.insertedId);
    //get users
    app.get("/user", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
    // post user add a new user
    app.post("/user", async (req, res) => {
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);
      console.log("my new users", newUser);
      res.send(result);
    });
    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log("dbs connection");
//   client.close();
// });

app.get("/", (req, res) => {
  res.send("running server ");
});

app.listen(port, () => {
  console.log("my project is running", port);
});
