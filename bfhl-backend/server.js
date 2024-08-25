const express = require('express');
const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Define an API endpoint to handle the data
app.post('/api/data', (req, res) => {
    const jsonData = req.body.data || [];

    // Initialize response object
    const response = {
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers: [],
        alphabets: [],
        highest_lowercase_alphabet: []
    };

    // Process the input data
    jsonData.forEach(item => {
        if (!isNaN(item)) {
            // If the item is a number, add it to the numbers array
            response.numbers.push(item);
        } else if (typeof item === 'string') {
            // If the item is a string, add it to the alphabets array
            response.alphabets.push(item);
            // Check for the highest lowercase alphabet
            if (item === item.toLowerCase() && !response.highest_lowercase_alphabet.includes(item)) {
                response.highest_lowercase_alphabet.push(item);
            }
        }
    });

    // Find the highest lowercase alphabet
    if (response.highest_lowercase_alphabet.length > 0) {
        response.highest_lowercase_alphabet.sort();
        response.highest_lowercase_alphabet = [response.highest_lowercase_alphabet[response.highest_lowercase_alphabet.length - 1]];
    }

    // Send response
    res.json(response);
});

// Start the server
app.listen(port, () => {
    console.log(Server is running at http://localhost:${port});
});
