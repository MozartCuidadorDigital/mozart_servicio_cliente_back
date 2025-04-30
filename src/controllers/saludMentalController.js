const axios = require('axios');
const mongoose = require('mongoose');

exports.onBoardingSaludMental = async (req, res) => {
    try {
        const { numero } = req.body;

        axios.post(
            "https://api.vapi.ai/call/phone",
            {
                assistantId: "f94386b6-9218-4386-9a54-5ccad8e0c1ea",
                customer: { number: numero },
                phoneNumberId: "7589b5b5-f1f3-42e6-b287-7da895d6a540"
            },
            {
                headers: {
                    Authorization: "Bearer d9424df4-37c9-4186-9b97-4c81be169786",
                    "Content-Type": "application/json"
                }
            }
        ).then(response => {
            console.log("✅ Llamada iniciada correctamente:", response.data);
            res.status(200).json({ message: "Llamada en proceso, el usuario será contactado." });

        }).catch(error => {
            console.error("❌ Error al iniciar la llamada:", error.response?.data || error.message);
        });

    } catch (error) {
        console.error("❌ Error en onBoardingSaludMental:", error.message);
        res.status(500).json({ error: "Error al procesar la solicitud de llamada" });
    }
};


exports.responseOnBoardingSaludMental = async (req, res) => {
  try {
    const { message, assistant } = req.body;

    if (message?.type === 'end-of-call-report' && message?.analysis?.structuredData) {
      const structuredData = message.analysis.structuredData;
      console.log("📋 Datos recibidos en /vapi/responseOnBoardingSaludMental:", structuredData);

      // Crear un modelo dinámico basado en el asistente
      const DynamicCallModel = mongoose.model(
        assistant, // Nombre de la colección dinámico
        new mongoose.Schema({
          NombreCompleto: { type: String, required: true },
          Telefono: { type: String, required: true },
          DocumentoIdentidad: {
            Tipo: { type: String, required: true },
            Numero: { type: String, required: true },
          },
          FechaEntrevista: { type: String, required: true },
          createdAt: { type: Date, default: Date.now },
        }),
        assistant // Nombre de la colección en MongoDB
      );

      // Crear un nuevo documento en la colección dinámica
      const newCall = new DynamicCallModel({
        NombreCompleto: structuredData.NombreCompleto,
        Telefono: structuredData.Telefono,
        DocumentoIdentidad: {
          Tipo: structuredData.DocumentoIdentidad.Tipo,
          Numero: structuredData.DocumentoIdentidad.Numero,
        },
        FechaEntrevista: structuredData.FechaEntrevista,
      });

      // Guardar en la base de datos
      await newCall.save();

      console.log(`✅ Datos guardados correctamente en la colección ${assistant}`);
      res.status(200).json({ message: `Datos procesados y guardados correctamente en la colección ${assistant}` });
    } else {
      console.log("⚠️ No se encontró structuredData en el mensaje recibido.");
      res.status(400).json({ error: "No se encontró structuredData en el mensaje recibido." });
    }
  } catch (error) {
    console.error("❌ Error en responseOnBoardingSaludMental:", error.message);
    res.status(500).json({ error: "Error al procesar los datos" });
  }
};

// Nueva función para consultar las llamadas
exports.consultOnBoardingSaludMental = async (req, res) => {
  try {
    const { assistant } = req.query;

    if (!assistant) {
      return res.status(400).json({ error: "El parámetro 'assistant' es requerido." });
    }

    // Crear un modelo dinámico basado en el asistente
    const DynamicCallModel = mongoose.model(assistant);

    // Consultar todas las llamadas de la colección correspondiente
    const calls = await DynamicCallModel.find();

    res.status(200).json(calls);
  } catch (error) {
    console.error("❌ Error en consultOnBoardingSaludMental:", error.message);
    res.status(500).json({ error: "Error al consultar las llamadas" });
  }
};