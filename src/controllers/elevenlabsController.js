const axios = require('axios');

// ElevenLabs TTS
async function textoAVoz({ texto, voice_id, model_id, output_format }) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return { error: 'API key de ElevenLabs no configurada.' };
  }
  if (!texto || !voice_id) {
    return { error: 'Texto y voice_id son obligatorios.' };
  }
  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`,
      {
        text: texto,
        model_id: model_id || 'eleven_multilingual_v2',
      },
      {
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg',
        },
        responseType: 'arraybuffer',
        params: output_format ? { output_format } : {},
      }
    );
    return { audio: Buffer.from(response.data, 'binary').toString('base64') };
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
}

module.exports = { textoAVoz }; 