const mongoose = require('mongoose');

const CallSchema = mongoose.Schema({
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

const Call = mongoose.model('Call', CallSchema);

module.exports = Call;