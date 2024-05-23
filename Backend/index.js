const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const app = express();
const port = 3000;
// const { ObjectId } = require('mongodb');

// const uri = 'mongodb://localhost:27017'; // MongoDB connection URI
const uri =
  "mongodb+srv://NewHarsh:pwd12345@ridingdata.ulmej8e.mongodb.net/RideRight";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDB();

app.use(express.json());

// Handle POST requests to '/data'
app.post("/data", async (req, res) => {
  try {
    // Connect to MongoDB
    await client.connect();

    // Select the database and collection
    const database = client.db("RideRight");
    const collection = database.collection("RideData");
    const result = await collection.insertOne(req.body);
    const insertedIdString = result.insertedId.toString();
    console.log(insertedIdString);
    res.json({ insertedId: result.insertedId.toString() });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send("Error saving data");
  }
});
app.post("/addRider", async (req, res) => {
  try {
    // Connect to MongoDB
    await client.connect();

    // Select the database and collection
    const database = client.db("RideRight");
    const collection = database.collection("RideData");
    const result = await collection.insertOne(req.body);
    const insertedIdString = result.insertedId.toString();
    console.log(insertedIdString);
    res.json({ insertedId: result.insertedId.toString() });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send("Error saving data");
  }
});
app.put("/data/:id", async (req, res) => {
  console.log("req", req.body);
  try {
    // Connect to MongoDB
    await client.connect();

    // Select the database and collection
    const database = client.db("RideRight");
    const collection = database.collection("RideData");

    // Extract the id from the URL parameters
    const id = req.params.id;

    // Ensure the id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID format");
    }

    // Extract the rider details from the request body
    const rider = req.body;

    // Ensure the rider has a 'name' field
    if (!rider.name) {
      return res.status(400).json({ message: "Rider must have a name" });
    }

    // Fetch the current document to validate the rider
    const ride = await collection.findOne({ _id: new ObjectId(id) });

    if (!ride) {
      return res.status(404).send("Ride not found");
    }

    // Check if the rider already exists in the otherRiders array
    if (ride.otherRiders) {
      const riderExists = ride.otherRiders.some((r) => r.name === rider.name);

      if (riderExists) {
        return res
          .status(400)
          .json({ message: "Rider with this name already exists" });
      }

      // Check if the number of riders exceeds the limit
      const MAX_RIDERS = ride.numberOfRiders; // Set your max riders limit here
      if (ride.otherRiders.length >= MAX_RIDERS) {
        return res.status(400).json({ message: "Group full" });
      }
    }

    // Construct the update query
    const updateQuery = {
      $addToSet: {
        otherRiders: { name: rider.name, ...rider },
      },
    };

    // Perform the update operation
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      updateQuery
    );

    if (result.modifiedCount === 1) {
      res.json({ message: "Update successful" });
    } else {
      res.status(404).send("Ride not found or no update performed");
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Error updating data");
  }
});

// Remove a rider from the 'otherRiders' array
app.delete("/data/:id/rider/:name", async (req, res) => {
  try {
    // Connect to MongoDB
    await client.connect();

    // Select the database and collection
    const database = client.db("RideRight");
    const collection = database.collection("RideData");

    // Extract the id from the URL parameters
    const id = req.params.id;

    // Ensure the id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID format");
    }

    // Extract the rider name from the URL parameters
    const riderName = req.params.name;

    // Construct the update query
    const updateQuery = {
      $pull: {
        otherRiders: { name: riderName },
      },
    };

    // Perform the update operation
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      updateQuery
    );

    if (result.modifiedCount === 1) {
      res.json({ message: "Rider removed successfully" });
    } else {
      res.status(404).send("Ride not found or rider not present");
    }
  } catch (error) {
    console.error("Error removing rider:", error);
    res.status(500).send("Error removing rider");
  }
});

// Fetch data by ID
app.get("/data/:id", async (req, res) => {
  try {
    // Connect to MongoDB
    await client.connect();

    // Select the database and collection
    const database = client.db("RideRight");
    const collection = database.collection("RideData");

    // Extract the id from the URL parameters
    const id = req.params.id;

    // Ensure the id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID format");
    }

    // Find the document by ID
    const result = await collection.findOne({ _id: new ObjectId(id) });

    if (result) {
      res.json(result);
    } else {
      res.status(404).send("Data not found");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
