import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('https://baja-finserv-test-backend.onrender.com/bfhl', { data: JSON.parse(input) });
            setResponse(result.data);
        } catch (error) {
            console.error("Error submitting data", error);
        }
    };

    const renderResponse = () => {
        if (!response) return null;
        const filteredResponse = {};
        selectedOptions.forEach(option => {
            filteredResponse[option] = response[option];
        });
        return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
    };

    return (
        <div>
            <h1>ABCD123</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Enter JSON here...'
                ></textarea>
                <button type='submit'>Submit</button>
            </form>
            <select multiple onChange={(e) => setSelectedOptions([...e.target.selectedOptions].map(option => option.value))}>
                <option value="alphabets">Alphabets</option>
                <option value="numbers">Numbers</option>
                <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
            </select>
            {renderResponse()}
        </div>
    );
}

export default App;
