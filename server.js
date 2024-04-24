require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const path = require('path');
const axios = require('axios'); // Axios for making HTTP requests

const app = express();

const corsOptions = {
    origin: 'http://localhost:8080', 
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'OPTIONS']
};

app.use(cors(corsOptions));
app.use(bodyParser.json()); // Parse JSON-formatted incoming request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

app.use('/', serveStatic(path.join(__dirname, '/dist')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.post('/generate-playlist', async (req, res) => {
    const { prompts } = req.body;
    console.log('Received prompts:', prompts);

    // Adjust the endpoint for chat completions
    const apiEndpoint = "https://api.openai.com/v1/chat/completions";
    const model = "gpt-4"; 

    try {
        const response = await axios.post(apiEndpoint, {
            model: "gpt-4-turbo",  // Make sure the model name is supported and correctly spelled.
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: `Generate a playlist of 10 songs based on these vibes and tones: ${prompts}` }
            ]
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`  // Ensure your API key is correctly being fetched from environment variables.
            }
        });

        const data = response.data;
        console.log('API Response:', data);
        // Extract the assistant's message from the choices
        res.json(data.choices[0].message.content);
    } catch (error) {
        console.error('Error generating playlist:', error);
        res.status(error.response ? error.response.status : 500).send('Failed to generate playlist');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
