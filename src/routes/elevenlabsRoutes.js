const express = require('express');
const router = express.Router();
const elevenlabsController = require('../controllers/elevenlabsController');

// POST /api/elevenlabs/tts
router.post('/tts', async (req, res) => {
  const { texto, voice_id, model_id, output_format } = req.body;
  const result = await elevenlabsController.textoAVoz({ texto, voice_id, model_id, output_format });
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ audio_base64: result.audio });
});

module.exports = router; 