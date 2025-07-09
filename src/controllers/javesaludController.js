const axios = require('axios');

exports.analizarEdadYLlamar = async (req, res) => {
  try {
    const { nombrePaciente, celular, fechaNacimiento } = req.body;

    if (!nombrePaciente || !celular || !fechaNacimiento) {
      return res.status(400).json({ error: "Todos los campos son requeridos." });
    }

    // Calcular edad
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    console.log(`📞 Usuario con ${edad} años. Enrutando llamada...`);

    // Redirigir según edad
    if (edad > 30) {
      return exports.iniciarLlamadaVph(req, res);
    } else {
      return exports.iniciarLlamadaCitologia(req, res);
    }

  } catch (error) {
    console.error("❌ Error en analizarEdadYLlamar:", error.message);
    res.status(500).json({ error: "Error al procesar la llamada por edad." });
  }
};

exports.iniciarLlamadaCitologia = async (req, res) => {
  try {
      const { nombrePaciente, celular, fechaNacimiento } = req.body;

      if (!celular) {
          return res.status(400).json({ error: "El número de teléfono es necesario para iniciar la llamada." });
      }
      const patientInfoForVapi = {
        nombrePaciente,
        celular,
        fechaNacimiento,
      };


              
      axios.post(
          "https://api.vapi.ai/call/phone",
          {
              assistantId: "8e33fd51-f6d7-43a6-a29f-bcc8a21e750f", // Reemplaza por el ID real
              customer: { number: celular },
              phoneNumberId: "7589b5b5-f1f3-42e6-b287-7da895d6a540",
              assistantOverrides: {
                    variableValues: patientInfoForVapi,
                },
          },
          {
              headers: {
                  Authorization: "Bearer d9424df4-37c9-4186-9b97-4c81be169786",
                  "Content-Type": "application/json"
              }
          }
      ).then(response => {
          console.log("✅ Llamada Citologia iniciada correctamente:", response.data);
          res.status(200).json({ message: "Llamada Citologia en proceso, el usuario será contactado." });

      }).catch(error => {
          console.error("❌ Error al iniciar la llamada Citologia:", error.response?.data || error.message);
          res.status(500).json({ error: "Error al iniciar la llamada Citologia" });
      });

  } catch (error) {
      console.error("❌ Error en iniciarLlamadaCitologia:", error.message);
      res.status(500).json({ error: "Error al procesar la solicitud de llamada Citologia" });
  }
};

exports.iniciarLlamadaVph = async (req, res) => {
  try {
      const { nombrePaciente, celular, fechaNacimiento } = req.body;

      if (!celular) {
          return res.status(400).json({ error: "El número de teléfono es necesario para iniciar la llamada." });
      }
      const patientInfoForVapi = {
        nombrePaciente,
        celular,
        fechaNacimiento,
      };

      axios.post(
          "https://api.vapi.ai/call/phone",
          {
              assistantId: "2fe483fb-46ef-4d4d-af2b-b46d27bc303a", // Reemplaza por el ID real cgc
              customer: { number: celular },
              phoneNumberId: "7589b5b5-f1f3-42e6-b287-7da895d6a540",
              assistantOverrides: {
                    variableValues: patientInfoForVapi,
                },
          },
          {
              headers: {
                  Authorization: "Bearer d9424df4-37c9-4186-9b97-4c81be169786",
                  "Content-Type": "application/json"
              }
          }
      ).then(response => {
          console.log("✅ Llamada Tamizaje VPH iniciada correctamente:", response.data);
          res.status(200).json({ message: "Llamada Tamizaje VPH en proceso, el usuario será contactado." });

      }).catch(error => {
          console.error("❌ Error al iniciar la llamada Tamizaje VPH:", error.response?.data || error.message);
          res.status(500).json({ error: "Error al iniciar la llamada Tamizaje VPH" });
      });

  } catch (error) {
      console.error("❌ Error en iniciarLlamadaVph:", error.message);
      res.status(500).json({ error: "Error al procesar la solicitud de llamada Tamizaje VPH" });
  }
};



exports.enviarWhatsApp = async (req, res) => {
  try {
    const { nombrePaciente, celular, fechaNacimiento } = req.body;
    console.log('📩 WhatsApp recibido:', { celular, nombrePaciente, fechaNacimiento });

    const response = await axios.post(
      "https://mozartcalltwilio-production.up.railway.app/whatsapp/tamizaje/automatico",
      {
        celular,
        nombrePaciente,
        fechaNacimiento,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ WhatsApp enviado correctamente:", response.data);
    res.status(200).json({ message: "Mensaje de WhatsApp enviado correctamente." });

  } catch (error) {
    console.error("❌ Error al enviar mensaje WhatsApp:", error.response?.data || error.message);
    res.status(500).json({ error: "Error al enviar mensaje de WhatsApp." });
  }
};
