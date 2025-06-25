const Cliente = require('../models/cliente');

exports.crearCliente = async (req, res) => {
  try {
    const { nombre, identificacion, correo } = req.body;
    if (!nombre || !identificacion || !correo) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
    const nuevoCliente = new Cliente({ nombre, identificacion, correo });
    await nuevoCliente.save();
    res.status(201).json({ message: 'Cliente creado exitosamente', cliente: nuevoCliente });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'El cliente ya existe.' });
    }
    res.status(500).json({ error: 'Error al crear el cliente.' });
  }
}; 