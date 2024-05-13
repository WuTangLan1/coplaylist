require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const path = require('path');
const axios = require('axios'); 

const app = express();

app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });

const spotifyServer = require('./spotifyserver.js');
app.use('/spotify', spotifyServer);

const allowedOrigins = [
    'http://localhost:8080',
    'https://coplaylist-3481ef838394.herokuapp.com',
    'https://coplaylist.com',
    'https://www.coplaylist.com'
  ];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
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

app.get('/google123456789abcd.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/google123456789abcd.html'));
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.use((req, res, next) => {
  next();
});

app.post('/generate-playlist', async (req, res) => {
    const { vibes, tones, songs, userTaste ={}, excludeSongs= [] } = req.body;
    const exclusionString = excludeSongs.length > 0 ? `Please ensure that none of the following songs are used in the result these songs: ${excludeSongs.join(', ')}` : '';

    const genres = tones && tones.selectedGenres ? tones.selectedGenres.join(', ') : 'Not specified';
    const eras = tones && tones.selectedEra ? tones.selectedEra.join(', ') : 'Not specified';
    console.log("User Taste", userTaste);
    console.log("Type of favouriteArtists", typeof userTaste.favouriteArtists); 
    console.log("Is Array?", Array.isArray(userTaste.favouriteArtists));
    const favouriteStyles = typeof userTaste.favouriteArtists === 'string'
        ? userTaste.favouriteArtists.split(', ').filter(Boolean)
        : userTaste.favouriteArtists;

    const dislikedArtists = typeof userTaste.dislikedArtists === 'string'
        ? userTaste.dislikedArtists.split(', ').filter(Boolean)
        : userTaste.dislikedArtists;

    if (!vibes || !songs) {
        return res.status(400).send("Vibes or songs data are missing in the request");
    }

    const prompt = `
        Generate a playlist of between 8-13 (PLEASE VARY THIS LENGTH AND ALWAYS ATTEMPT TO GENERATE DIFFERENT LENGTHED PLAYLISTS (which must adhere to the following structure : "song title - artist name : release year") 
        that must adhere to the following playlist guides to create a wonderful and inspiring playlist that will also impress the 
        user with how accurate and responsive to their input it is :  
        Generate a playlist that must adhere to the following playlist guides:
        Genres: (CRITICAL) Ensure the genre(s) heavily influence the playlist: ${genres},
        Eras: Ensure the songs are from these eras: ${eras},
        User Taste: Influenced by the styles of ${favouriteStyles},
        Mood: ${vibes.selectedMood || 'any'},
        Activity: ${vibes.selectedActivity || 'any'},
        Familiarity: ${vibes.selectedFamiliarity || 'any'},
        Setting: ${vibes.selectedSetting || 'any'},
        Songs: Influenced by these but not included: ${songs.map(song => `${song.name} by ${song.artist} (${song.influence}% influence)`).join(', ')},
        Exclude these artists under any circumstances: ${dislikedArtists},
        ${exclusionString},
        Generate 5 additional alternative songs using the same criteria.
        
        Here is an example of a playlist that would be generated, please can you ensure that you strictly adhere to this format when generating
        a playlist :
        A Team - Ed Sheeran: 2011
        Can't Stop the Feeling! - Justin Timberlake: 2016
        Happy - Pharrell Williams: 2013
        Shake It Off - Taylor Swift: 2014
        Uptown Funk - Mark Ronson ft. Bruno Mars: 2014
        Stronger (What Doesn’t Kill You) - Kelly Clarkson: 2011
        Roar - Katy Perry: 2013
        Titanium - David Guetta ft. Sia: 2011
        Eye of the Tiger - Survivor: 1982
        Don't Stop Me Now - Queen: 1978

        Extra Songs:
        Rolling in the Deep - Adele: 2010
        Get Lucky - Daft Punk ft. Pharrell Williams: 2013
        Firework - Katy Perry: 2010
        Locked Out of Heaven - Bruno Mars: 2012
        Livin' on a Prayer - Bon Jovi: 1986

        please note the structure of the above to be achieved and ensure that no additional information is posted, and above all else, please ensure the user inputs are achieved.
        PLEASE DO NOT ADD NUMBERING TO THE LIST OF SONGS YOU GENERATE`;


        console.log('prompt : ', prompt)

    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-4-turbo", 
            messages: [
                { role: "system", content: "You are an expert in music and creating song music playlists for users based on their requests." },
                { role: "user", content: prompt.trim() }
            ]
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        const data = response.data;
        const songs = data.choices[0].message.content.split('\n').slice(0, -5); 
        const alternativeSongs = data.choices[0].message.content.split('\n').slice(-5); 
        res.json({songs, alternativeSongs});
    } catch (error) {
        console.error('Error generating playlist:', error);
        res.status(error.response ? error.response.status : 500).send('Failed to generate playlist');
    }
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
