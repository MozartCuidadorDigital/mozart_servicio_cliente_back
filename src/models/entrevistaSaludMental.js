const mongoose = require('mongoose');

const entrevistaSaludMentalSchema = mongoose.Schema({
  TamizajeInicial: {
    CriteriosInclusion: {
      PreguntasRespuestas: {
        edad_18_60: { type: Boolean, required: false },
        reside_bogota_urbano: { type: Boolean, required: false },
        conectividad_internet: { type: Boolean, required: false },
        sintomas_atenuados_post_hosp: { type: Boolean, required: false },
        red_apoyo_funcional: { type: Boolean, required: false },
        cuidador_mismo_domicilio: { type: Boolean, required: false },
        perdida_capacidades_impide_metas: { type: Boolean, required: false },
        consumo_sustancias_problema: { type: Boolean, required: false },
        adherencia_previa_tratamiento: { type: Boolean, required: false },
      },
      VeredictoElegibilidad: { type: String, required: false },
      JustificacionElegibilidad: { type: String, required: false },
      RecomendacionesElegibilidad: { type: String, required: false },
    },
    EvaluacionFuncionamientoGlobal: {
      DificultadesRelacionarseUltimoAnio: { type: String, required: false },
      MantenidoActividadesEstructuradas: { type: String, required: false },
      EpisodiosCriticosRecientes: { type: String, required: false },
      NivelEnergiaMotivacion: { type: String, required: false },
      ConductasRiesgo: { type: String, required: false },
      ParticipacionSocialComunitaria: { type: String, required: false },
      ComentariosAdicionalesEvaluador: { type: String, required: false },
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const entrevistaSaludMental = mongoose.model('entrevistaSaludMental', entrevistaSaludMentalSchema);

module.exports = entrevistaSaludMental;