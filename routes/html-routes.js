
const express = require('express');
const path = require('path');

// Create a new Router instance
const router = express.Router();

// Route to serve 'index.html' when a GET request is made to '/'
router.get('/', (req, res) => {
    // Send 'index.html' as the response
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Route to serve 'notes.html' when a GET request is made to '/notes'
router.get('/notes', (req, res) => {
    // Send 'notes.html' as the response
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// Export the router to be used by other parts of the application
module.exports = router;