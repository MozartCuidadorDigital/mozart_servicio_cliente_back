const axios = require('axios');
const fs = require('fs');
const path = require('path');

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

// ElevenLabs Speech to Text (Transcripción)
async function speechToText({ audio_base64, mime_type }) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return { error: 'API key de ElevenLabs no configurada.' };
  }
  if (!audio_base64) {
    return { error: 'Audio en base64 es obligatorio.' };
  }
  try {
    // Decodificar el audio base64 a buffer
    const audioBuffer = Buffer.from(audio_base64, 'base64');
    // ElevenLabs espera un archivo, así que lo guardamos temporalmente
    const tempPath = path.join(__dirname, '../../temp_audio.wav');
    fs.writeFileSync(tempPath, audioBuffer);
    const formData = new FormData();
    formData.append('audio', fs.createReadStream(tempPath));
    // Llamada a la API de ElevenLabs (ajusta la URL si es necesario)
    const response = await axios.post(
      'https://api.elevenlabs.io/v1/speech-to-text',
      formData,
      {
        headers: {
          'xi-api-key': apiKey,
          ...formData.getHeaders(),
        },
      }
    );
    // Borrar el archivo temporal
    fs.unlinkSync(tempPath);
    return response.data;
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
}

module.exports = { textoAVoz, speechToText }; 