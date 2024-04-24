const express = require('express');
const axios = require('axios');
const router = express.Router();

function generatePrompt(data) {
    // Construct a detailed prompt using the additional vibe and tone data
    return `Create a playlist based on these details:
            Songs: ${data.songs.map(song => `${song.name} by ${song.artist}`).join(', ')}
            Mood: ${data.vibes.selectedMood}
            Activity: ${data.vibes.selectedActivity}
            Era: ${data.tones.selectedEra.join(', ')}
            Genre: ${data.tones.selectedGenres.join(', ')}.`;
}

router.post('/generate-playlist', async (req, res) => {
    const { vibes, tones, songs } = req.body;

    try {
        const prompt = generatePrompt({ vibes, tones, songs });
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "text-davinci-002",
            prompt: prompt,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const suggestions = response.data.choices[0].text.trim().split('\n');
        res.json({ suggestions });
    } catch (error) {
        console.error('Failed to fetch from OpenAI:', error);
        res.status(500).json({ error: 'Failed to generate playlist' });
    }
});

module.exports = router;
