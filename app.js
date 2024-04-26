const express = require('express');
const { connectToDatabase, getClient } = require('./db');

const app = express();
const port = 9000;

// Middleware to handle JSON requests
app.use(express.json());

// Enable CORS for all domains
app.use(require('cors')());

// Define routes

// Get all students
app.get('/students', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('studentdata');
        const students = await collection.find({}).toArray();
        res.json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Insert a new student
app.post('/insertstudents', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('studentdata');
        const newStudent = req.body;
        await collection.insertOne(newStudent);
        res.status(201).json({ message: 'Student added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
