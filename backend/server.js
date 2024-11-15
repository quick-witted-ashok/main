const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');


const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://manikinediashok:oIRHHXxsSZz9HZNe@cluster0.xau5z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

  






  
// Define Book Schema and Model
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
});

const Book = mongoose.model('Book', bookSchema);

// Endpoint to handle book creation
app.post('/books', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json({ message: 'Book added successfully!' });
    console.log(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add book' });
  }
});














// Define User Schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String, // Stored as plain text here for simplicity
  });

// Define User Model
const User = mongoose.model('User', userSchema);

  // Route to add a new user
app.post('/add-user', async (req, res) => {
    const { username, email, password } = req.body;
  
    // Create new user document
    const newUser = new User({ username, email, password });
  
    try {
      await newUser.save();
      res.status(201).json({ message: 'User added successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add user' });
    }
  });













// Define the Book Schema with title, author, genre, and description
const bookSchema3 = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    description: String,  // New field for book description
  });
  
  const anotherbook = mongoose.model('anotherbook', bookSchema3);
  
  // Route to add a new book
  app.post('/add-book', async (req, res) => {
    const { title, author, genre, description } = req.body;
    const newBook = new anotherbook({ title, author, genre, description });
    
    try {
      await newBook.save();
      res.status(201).json({ message: 'Book added successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add book' });
    }
  });
  
  // Route to search books by title or author
  app.get('/search-books', async (req, res) => {
    const { query } = req.query; // Getting search query from query parameter
    try {
      const books = await anotherbook.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { author: { $regex: query, $options: 'i' } },
        ]
      });
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search books' });
    }
  });
  














// Define Item Schema
const itemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number,
  });
  
  const Item = mongoose.model('Item', itemSchema);
  
  // Route to add a new item
  app.post('/items', async (req, res) => {
    const { name, quantity, price } = req.body;
    const newItem = new Item({ name, quantity, price });
  
    try {
      await newItem.save();
      res.status(201).json({ message: 'Item added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add item' });
    }
  });
  
  // Route to get all items
  app.get('/items', async (req, res) => {
    try {
      const items = await Item.find();
      let totalInventoryValue = 0;
      items.forEach(item => {
        totalInventoryValue += item.quantity * item.price;
      });
      res.json({ items, totalInventoryValue });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve items' });
    }
  });
  
  // Route to update an item*
  app.patch('/items/:id', async (req, res) => {
    const { quantity, price } = req.body;
    try {
      const updatedItem = await Item.findByIdAndUpdate(req.params.id, { quantity, price }, { new: true });
      res.json({ message: 'Item updated successfully', updatedItem });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update item' });
    }
  });
  
  // Route to delete an item
  app.delete('/items/:id', async (req, res) => {
    try {
      await Item.findByIdAndDelete(req.params.id);
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete item' });
    }
  });














  // Define Event Schema
const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
});

const Event = mongoose.model('Event', eventSchema);

// Route to add a new event
app.post('/events', async (req, res) => {
  const { title, description, date } = req.body;
  const newEvent = new Event({ title, description, date });

  try {
    await newEvent.save();
    res.status(201).json({ message: 'Event added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add event' });
  }
});

// Route to get upcoming events
app.get('/events/upcoming', async (req, res) => {
  try {
    const today = new Date();
    const upcomingEvents = await Event.find({ date: { $gte: today } }).sort({ date: 1 });
    res.json(upcomingEvents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve events' });
  }
});
  
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
