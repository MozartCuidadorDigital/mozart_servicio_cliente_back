const mongoose = require('mongoose');

const reporteClinicoSchema = new mongoose.Schema({
  paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  fecha: { type: Date, default: Date.now },
  sintomas: { type: String, required: true },
  diagnostico: { type: String },
  recomendacion: { type: String }
});

module.exports = mongoose.model('ReporteClinico', reporteClinicoSchema); 