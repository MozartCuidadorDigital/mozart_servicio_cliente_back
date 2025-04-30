const mongoose = require('mongoose');

const OnBoardingCallSchema = mongoose.Schema({
  NombreCompleto: {
    type: String,
    required: true,
  },
  Telefono: {
    type: String,
    required: true,
  },
  DocumentoIdentidad: {
    Tipo: {
      type: String,
      required: true,
    },
    Numero: {
      type: String,
      required: true,
    },
  },
  FechaEntrevista: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OnBoardingCall = mongoose.model('OnBoardingCall', OnBoardingCallSchema);

module.exports = OnBoardingCall;