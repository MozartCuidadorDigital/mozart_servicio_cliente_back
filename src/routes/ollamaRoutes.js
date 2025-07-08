const express = require('express');
const router = express.Router();
const ollamaController = require('../controllers/ollamaController');

// POST /api/ollama/chat
router.post('/chat', async (req, res) => {
  const { prompt } = req.body;
  const result = await ollamaController.chatOllama({ prompt });
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ response: result.response });
});

module.exports = router; 