const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  identificacion: { type: String, required: true, unique: true },
  correo: { type: String, required: true, unique: true },
  fecha_nacimiento: { type: String, required: false },
  fechaRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cliente', clienteSchema); 