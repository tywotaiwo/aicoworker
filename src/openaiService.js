const axios = require('axios');

const API_KEY = '';

async function getOpenAIResponse(prompt) {
    console.log("Sending prompt to OpenAI:", prompt);
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt,
            max_tokens: 150,
            n: 1,
            stop: null,
            temperature: 0.7,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
        });

        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error("Failed to get response from OpenAI:", error);
        throw error;  // Rethrow or handle as necessary
    }
}

module.exports = { getOpenAIResponse };
