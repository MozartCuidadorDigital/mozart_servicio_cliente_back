const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

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

// ElevenLabs Speech to Text (Transcripción) compatible con serverless
async function speechToText({ audio_base64, mime_type, model_id }) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return { error: 'API key de ElevenLabs no configurada.' };
  }
  if (!audio_base64) {
    return { error: 'Audio en base64 es obligatorio.' };
  }
  try {
    const audioBuffer = Buffer.from(audio_base64, 'base64');
    const formData = new FormData();
    formData.append('audio', audioBuffer, {
      filename: 'audio.wav',
      contentType: mime_type || 'audio/wav'
    });
    formData.append('model_id', model_id || 'whisper-1');
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
    return response.data;
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
}

module.exports = { textoAVoz, speechToText }; 