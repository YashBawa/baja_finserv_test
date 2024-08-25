const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

app.post('/api/data', (req, res) => {
    const { data, user_id, email, roll_number } = req.body;

    // Logic to find the highest lowercase alphabet
    const lowercaseAlphabets = data.filter(item => item >= 'a' && item <= 'z');
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 
        ? [String.fromCharCode(Math.max(...lowercaseAlphabets.map(ch => ch.charCodeAt(0))))]
        : [];

    // Preparing the response
    const response = {
        is_success: true,
        user_id: user_id,
        email: email,
        roll_number: roll_number,
        numbers: [], // No numbers to extract
        alphabets: data,
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
