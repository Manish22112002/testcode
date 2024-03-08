const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB connection URL (replace with your actual MongoDB connection string)
// const mongoURI = 'mongodb+srv://manish091102:o6MDAwBKIncSwffy@cluster0.xil1y55.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const mongoURI = 'mongodb+srv://manish091102:b8K2Oa842GDN04gW@cluster0.ssitv8k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/store-response', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('your_database_name');
    const collection = database.collection('responses');

    const { name, surname, response } = req.body;

    // Insert the data into the MongoDB collection
    const result = await collection.insertOne({ name, surname, response });

    console.log('Data stored in MongoDB:', result.ops[0]);

    res.status(201).json({ success: true, message: 'Data stored in MongoDB' });
  } catch (error) {
    console.error('Error storing data in MongoDB:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


// b8K2Oa842GDN04gW