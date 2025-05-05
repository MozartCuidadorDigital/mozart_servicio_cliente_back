const mongoose = require('mongoose');

const seguimientoSaludMentalSchema = mongoose.Schema({
  AtencionUrgenciaDepresion: {
    MADRS_Scores: {
      tristeza_aparente: { type: Number, required: true },
      tristeza_expresada: { type: Number, required: true },
      tension_interior: { type: Number, required: true },
      sueno_reducido: { type: Number, required: true },
      disminucion_apetito: { type: Number, required: true },
      dificultades_concentracion: { type: Number, required: true },
      laxitud_abulia: { type: Number, required: true },
      incapacidad_sentir: { type: Number, required: true },
      pensamientos_pesimistas: { type: Number, required: true },
      ideacion_suicida: { type: Number, required: true },
    },
    MADRS_PuntajeTotal: { type: Number, required: true },
    NivelDepresionClasificacion: { type: String, required: true },
    ItemsCriticosIdentificados: { type: Boolean, required: true },
    AnalisisInterpretativoGenerado: { type: String, required: true },
    RecomendacionesGeneradas: { type: String, required: true },
    RecursosProfesionalesGenerados: { type: String, required: true },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const seguimientoSaludMental = mongoose.model('seguimientoSaludMental', seguimientoSaludMentalSchema);

module.exports = seguimientoSaludMental;