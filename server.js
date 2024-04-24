require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const path = require('path');
const axios = require('axios'); 

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
    console.log(req.body); // Logging the entire body to debug
    const { vibes, tones, songs } = req.body;

    // Safely accessing genres and eras with default empty arrays if undefined
    const genres = tones && tones.selectedGenres ? tones.selectedGenres.join(', ') : 'Not specified';
    const eras = tones && tones.selectedEra ? tones.selectedEra.join(', ') : 'Not specified';

    // Check if any critical information is missing to construct a meaningful prompt
    if (!vibes || !songs) {
        return res.status(400).send("Vibes or songs data are missing in the request");
    }

    const prompt = `
        Generate a playlist of 10 songs that matches the following details:
        Mood: ${vibes.selectedMood || 'any'},
        Activity: ${vibes.selectedActivity || 'any'},
        Familiarity: ${vibes.selectedFamiliarity || 'any'},
        Setting: ${vibes.selectedSetting || 'any'},
        Platform: ${vibes.selectedPlatform || 'any platform'},
        Genres: ${genres},
        Eras: ${eras},
        Songs: ${songs.map(song => song.name && song.artist ? `${song.name} by ${song.artist}` : 'Not specified').join(', ')}
    `;

    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-4-turbo", 
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: prompt.trim() }
            ]
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        const data = response.data;
        res.json(data.choices[0].message.content);
    } catch (error) {
        console.error('Error generating playlist:', error);
        res.status(error.response ? error.response.status : 500).send('Failed to generate playlist');
    }
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
