const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Ensure this connects to your database
const Person = require('./models/person');
const Menu = require('./models/menu');

const app = express();
app.use(bodyParser.json());

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to my hotel...How can I help YOU?');
});

// Create a new person
app.post('/person', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log('Person saved:', response);
    res.status(200).json(response);
  } catch (err) {
    console.error('Error saving person:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch all persons
app.get('/person', async (req, res) => {
  try {
    const data = await Person.find();
    console.log('Persons fetched successfully');
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching persons:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new menu item
app.post('/menu', async (req, res) => {
  try {
    console.log('Incoming Data:', req.body); // Debug log
    const data = req.body;
    const newDish = new Menu(data);
    const response = await newDish.save();
    console.log('Menu item saved:', response);
    res.status(200).json(response);
  } catch (err) {
    console.error('Error saving menu item:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/menu', async (req, res) => {
  try {
    const data = await Menu.find(); // Fetch all menu items
    console.log('Menu items fetched successfully:', data); // Log the data
    res.status(200).json(data); // Send data as a JSON response
  } catch (err) {
    console.error('Error fetching menu items:', err.message); // Log the error
    res.status(500).json({ error: 'Internal server error' }); // Send an error response
  }
});
app.get('/person/:workType', async (req, res) => {
  try {
    const workType = req.params.workType; // Corrected to use req.params instead of req.parents
    // Validate if the workType is one of the valid values
    if (workType === 'chef' || workType === 'manager' || workType === 'waiter') {
      const response = await Person.find({ work: workType });
      console.log('Response fetched');
      res.status(200).json(response); // Send the fetched data
    } else {
      res.status(404).json({ error: 'Invalid work type' }); // Return error if workType is not valid
    }
  } catch (err) {
    console.log(err); // Log the error
    res.status(500).json({ error: 'Internal server error' }); // Return 500 error if something goes wrong
  }
});

const cors = require('cors');
app.use(cors());  // Enable CORS for all routes

// Start the server
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
