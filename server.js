require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const path = require('path');
const axios = require('axios'); 

const app = express();

const allowedOrigins = [
    'http://localhost:8080',
    'https://coplaylist-3481ef838394.herokuapp.com',
    'http://coplaylist.com',
    'http://www.coplaylist.com'
  ];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
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
    const { vibes, tones, songs, userTaste } = req.body;

    const genres = tones && tones.selectedGenres ? tones.selectedGenres.join(', ') : 'Not specified';
    const eras = tones && tones.selectedEra ? tones.selectedEra.join(', ') : 'Not specified';

    if (!vibes || !songs) {
        return res.status(400).send("Vibes or songs data are missing in the request");
    }

    const prompt = `
        Generate a playlist of 10 songs with a playlist name (which must adhere to the following structure : "song title - artist name : release year") 
        that must adhere to the following playlist guides to create a wonderful and inspiring playlist that will also impress the 
        user with how accurate and responsive to their input it is :  
        User Taste (This defines the user and hence has a lot of value in generating the playlist): ${userTaste},
        Mood (please ensure the songs you submit all achieve the following mood): ${vibes.selectedMood || 'any'},
        Activity (please ensure the songs you submit all achieve the following activity): ${vibes.selectedActivity || 'any'},
        Familiarity (please can you ensure that the playlist yopu generate and the songs generated have the following level of fame/knownness): ${vibes.selectedFamiliarity || 'any'},
        Setting (please ensure the songs you submit all achieve the following settign): ${vibes.selectedSetting || 'any'},
        Platform (please ensure the songs are available on the following selected platform): ${vibes.selectedPlatform || 'any platform'},
        Genres (please ensure the songs you submit are from the following genre(s) ): ${genres},
        Eras (please ensure the songs you submit are from the following era(s)): ${eras},
        Songs (please ensure the songs are influenced by these songs BUT ARE NOT THESE SONGS): ${songs.map(song => song.name && song.artist ? `${song.name} by ${song.artist} with a influence weighting of ${song.influence}` : 'Not specified').join(', ')},
        'Here is an example of a playlist that would be generated, please can you ensure that you strictly adhere to this format when generating
        a playlist :
        Playlist Name : Alpha Grooving
        1. A Team - Ed Sheeran: 2011
        2. Can't Stop the Feeling! - Justin Timberlake: 2016
        3. Happy - Pharrell Williams: 2013
        4. Shake It Off - Taylor Swift: 2014
        5. Uptown Funk - Mark Ronson ft. Bruno Mars: 2014
        6. Stronger (What Doesn’t Kill You) - Kelly Clarkson: 2011
        7. Roar - Katy Perry: 2013
        8. Titanium - David Guetta ft. Sia: 2011
        9. Eye of the Tiger - Survivor: 1982
        10. Don't Stop Me Now - Queen: 1978'
        please note the structure of the above to be achieved and ensure that no additional information is posted, and above all else, please ensure the user inputs are achieved.    `;

    console.log('prompt being sent : ', prompt)
    console.log('Using OpenAI API Key:', process.env.OPENAI_API_KEY ? 'Available' : 'Not Available');

    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-4-turbo", 
            messages: [
                { role: "system", content: "You are an expert in music and creating 10 song music playlists for users based on their requests." },
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
