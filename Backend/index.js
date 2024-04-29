import config from '../config'

const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const port = 3000;

// const uri = 'mongodb://localhost:27017'; // MongoDB connection URI
const uri = config.mogoLink;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToDB();

app.use(express.json());

// Handle POST requests to '/data'
app.post('/data', async (req, res) => {
    try {
        // Connect to MongoDB
        await client.connect();

        // Select the database and collection
        const database = client.db('RideRight');
        const collection = database.collection('RideData');
		const result = await collection.insertOne(req.body);

        res.send('Data saved successfully');
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send('Error saving data');
    }
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});