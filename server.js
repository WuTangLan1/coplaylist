// server.js which manages deployment to heroku
require('dotenv').config();
const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();


app.use('/', serveStatic(path.join(__dirname, '/dist')));



app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

app.post('/generate-playlist', async (req, res) => {
    const { prompts } = req.body; 
    try {
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "text-davinci-004", 
                prompt: `Generate a playlist of 10 songs based on these vibes and tones: ${prompts}`,
                max_tokens: 150
            })
        });
        const data = await response.json();
        res.json(data.choices[0].text);
    } catch (error) {
        console.error('Error generating playlist:', error);
        res.status(500).send('Failed to generate playlist');
    }
});


const port = process.env.PORT || 8080;
app.listen(port);
console.log('Server started on port ' + port);
