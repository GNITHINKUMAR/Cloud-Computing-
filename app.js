const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const redis = require('redis');

// Connect to the Redis server
const client = redis.createClient();

// Serve static files from the "public" directory
app.use(express.static('public'));

// Parse JSON request bodies
app.use(bodyParser.json());

// Read data endpoint
app.get('/read', (req, res) => {
  // Assuming you want to read data from Redis
  client.get('myData', (err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json({ message: 'Read data endpoint', data: JSON.parse(data) });
    }
  });
});

// Write data endpoint
app.post('/write', (req, res) => {
  // Assuming you want to save data to Redis
  const newData = req.body;
  client.set('myData', JSON.stringify(newData), (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json({ message: 'Data written successfully', data: newData });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
