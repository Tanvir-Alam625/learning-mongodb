const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
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
    const user = {
      name: "Tanvir ",
      email: "tanvir@gmail.com",
    };
    const result = await userCollection.insertOne(user);
    console.log("user inserted", result.insertedId);
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