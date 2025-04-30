// backend/src/models/Call.js
const mongoose = require('mongoose');

const CallSchema = mongoose.Schema({
  // Campo para almacenar el análisis proporcionado por Vapi
  analysis: {
    type: String, // Vapi suele devolver el análisis como string en el payload principal
    required: true
  },
  // Opcional: Puedes guardar el payload completo si lo necesitas en el futuro
  // vapiPayload: {
  //   type: mongoose.Schema.Types.Mixed // Usa Mixed para datos flexibles
  // },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Call = mongoose.model('Call', CallSchema);

module.exports = Call;