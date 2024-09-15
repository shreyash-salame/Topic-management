const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mern', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Topic Schema
const topicSchema = new mongoose.Schema({
  name: String,
  blocks: [
    {
      text: String,
      category: String,
    },
  ],
});

const Topic = mongoose.model('Topic', topicSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Feynman Board API');
});

// Get all topics
app.get('/topics', async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a topic by ID
app.get('/topics/:id', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    res.json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new topic
app.post('/topics', async (req, res) => {
  const topic = new Topic(req.body);
  try {
    const savedTopic = await topic.save();
    res.status(201).json(savedTopic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Update a topic by ID
app.put('/topics/:id', async (req, res) => {
  try {
    const updatedTopic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTopic) return res.status(404).json({ message: 'Topic not found' });
    res.json(updatedTopic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
