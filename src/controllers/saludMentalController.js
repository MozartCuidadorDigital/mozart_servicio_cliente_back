const axios = require('axios');
const Call = require('../models/Call'); // Importar el modelo Call

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
    const { message } = req.body;

    if (message?.type === 'end-of-call-report' && message?.analysis?.structuredData) {
      const structuredData = message.analysis.structuredData;
      console.log("📋 Datos recibidos en /vapi/responseOnBoardingSaludMental:", structuredData);

      // Crear un nuevo documento en la colección de MongoDB
      const newCall = new Call({
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

      console.log("✅ Datos guardados correctamente en MongoDB");
      res.status(200).json({ message: "Datos procesados y guardados correctamente en MongoDB" });
    } else {
      console.log("⚠️ No se encontró structuredData en el mensaje recibido.");
      res.status(400).json({ error: "No se encontró structuredData en el mensaje recibido." });
    }
  } catch (error) {
    console.error("❌ Error en responseOnBoardingSaludMental:", error.message);
    res.status(500).json({ error: "Error al procesar los datos" });
  }
};