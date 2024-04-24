// backend/index.js 

require('dotenv').config({ path: './.env.local' });
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/api/generate-suggestions', async (req, res) => {
  const { prompt, model } = req.body;

  console.log('Received prompt:', prompt);
  console.log('Using model:', model);

  try {
    const response = await axios.post(`https://api.openai.com/v1/chat/completions`, {
      model: model,
      messages: [{ role: "system", content: "You are a helpful assistant."}, {role: "user", content: prompt}],
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
    });

    const suggestions = response.data.choices[0].message.content.split('\n');
    // Filter out empty strings and trim whitespace
    const filteredSuggestions = suggestions.filter(s => s.trim() !== '').map(s => s.trim());

    // Slice only the first 15 suggestions to send back
    res.json(filteredSuggestions.slice(0, 15));
    
  } catch (error) {
    console.error('OpenAI API request failed:', error.response ? error.response.data : error.message);
    res.status(500).send("Error fetching the response");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});