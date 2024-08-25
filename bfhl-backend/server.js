const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Define the validation schema
const schema = Joi.object({
    data: Joi.array().items(Joi.string()).required()
});

// Endpoint to handle data
app.post('/api/data', (req, res) => {
    // Validate input
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ is_success: false, message: error.details[0].message });
    }

    const { data } = req.body;

    // Categorize input data
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
    const numbers = data.filter(item => /^[0-9]$/.test(item));
    const lowercaseAlphabets = data.filter(item => item >= 'a' && item <= 'z');
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 
        ? [String.fromCharCode(Math.max(...lowercaseAlphabets.map(ch => ch.charCodeAt(0))))]
        : [];

    // Preparing the response
    const response = {
        is_success: true,
        user_id: "john_doe_17091999", // Example user ID
        email: "john@xyz.com", // Example email
        roll_number: "ABCD123", // Example roll number
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    };

    // Sending the JSON response
    res.json(response);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
