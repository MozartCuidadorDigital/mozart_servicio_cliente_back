const axios = require('axios');

// POST /api/ollama/chat
async function chatOllama({ prompt }) {
  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'tinyllama',
      prompt: prompt,
      stream: false
    });
    return { response: response.data.response };
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
}

module.exports = { chatOllama }; 