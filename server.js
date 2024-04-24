require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const path = require('path');
const axios = require('axios'); // Axios for making HTTP requests

const app = express();

const corsOptions = {
    origin: 'http://localhost:8080', // Make sure this matches your frontend's address
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'OPTIONS']
};

app.use(cors(corsOptions));
app.use(bodyParser.json()); // Parse JSON-formatted incoming request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

app.use('/', serveStatic(path.join(__dirname, '/dist'))); // Serve static files

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html')); // Handle SPA routing by redirecting all to index.html
});

app.post('/generate-playlist', async (req, res) => {
    const { prompts } = req.body;
    console.log('Prompts in server.js:', prompts);
    try {
        const response = await axios.post("https://api.openai.com/v1/completions", {
            model: "text-davinci-002", // Adjust the model as necessary
            prompt: `Generate a playlist of 10 songs based on these vibes and tones: ${prompts}`,
            max_tokens: 150,
            temperature: 0.5
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });
        const data = response.data;
        console.log('API Response:', data);
        if (!data.choices || data.choices.length === 0 || !data.choices[0].text) {
            throw new Error('No valid response or choices returned from the API');
        }
        res.json(data.choices[0].text); // Send the first choice's text as the response
    } catch (error) {
        console.error('Error generating playlist:', error);
        res.status(500).send('Failed to generate playlist');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
