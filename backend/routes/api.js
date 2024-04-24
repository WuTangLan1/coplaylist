// File: server/routes/api.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/generate-playlist', async (req, res) => {
    const { songs } = req.body;
    const prompt = generatePrompt(songs);

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "text-davinci-002", // Choose the model appropriate for your needs
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

function generatePrompt(songs) {
    return `Create a playlist based on these songs: ${songs.join(', ')}.`;
}

module.exports = router;
