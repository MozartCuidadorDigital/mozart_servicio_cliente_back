const axios = require('axios');


exports.iniciarLlamadaCitologia = async (req, res) => {
  try {
      const { numero } = req.body;

      axios.post(
          "https://api.vapi.ai/call/phone",
          {
              assistantId: "8e33fd51-f6d7-43a6-a29f-bcc8a21e750f", // Reemplaza por el ID real
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
      const { numero } = req.body;

      axios.post(
          "https://api.vapi.ai/call/phone",
          {
              assistantId: "2fe483fb-46ef-4d4d-af2b-b46d27bc303a", // Reemplaza por el ID real
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



exports.whatsappBienvenida = async (req, res) => {
  try {
    const { numero } = req.body;
    
    axios.post(
      "https://graph.facebook.com/v22.0/587113451151885/messages",
      {
        messaging_product: "whatsapp",
        to: numero,
        type: "template",
        template: {
          name: "notificacion_nuevo_paciente_new",
          language: {
            code: "en"
          },
          components: [
            {
              type: "header",
              parameters: [
                {
                  type: "image",
                  image: {
                    link: "https://adresfosyga.co/wp-content/uploads/2020/05/Nueva-EPS-Logo.png"
                  }
                }
              ]
            },
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: "https://mozart-nuevo-fronted.vercel.app/"
                },
                {
                  type: "text",
                  text: "pacientenuevaeps"
                },
                {
                  type: "text",
                  text: "12345"
                }
              ]
            }
          ]
        }
      },
      {
        headers: {
          Authorization: "Bearer EAAaTwNpMCk0BOZCdHI0f18pn7lTw8DQ8G68cHEdeKr29pW92bZA4SpQJ7AYhTt9j9kzSAU6Ld67rJqFoR7zt0bRgfdZCFDXhjRXp2UZCG2dwToSrTR9uU4FOZCrTVuAeTwsTZCmIfxvOGZARyoR8ajqn8X7ZCCXa7awgBDiauyZARx2nHCqlIIQa8udZB6aR76Of4H7wZDZD",
          "Content-Type": "application/json"
        }
      }
    ).then(response => {
      console.log("✅ Mensaje WhatsApp enviado correctamente:", response.data);
      res.status(200).json({ message: "Mensaje de WhatsApp enviado correctamente." });
    }).catch(error => {
      console.error("❌ Error al enviar mensaje de WhatsApp:", error.response?.data || error.message);
      res.status(500).json({ error: "Error al enviar mensaje de WhatsApp" });
    });
  } catch (error) {
    console.error("❌ Error en whatsappBienvenida:", error.message);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
};

// Función para enviar mensaje de WhatsApp para medicamento
exports.whatsappMedicamento = async (req, res) => {
  try {
    const { numero } = req.body;
    
    const datosQuemados = {
      nombrePaciente: "Paciente 1",
      medicamento: "Clonazepam",
      concentracion: "2mg",
      horaTomaFormateada: "8:00 AM",
      dosis: "1 tableta",
      presentacion: "Tabletas",
      viaAdministracion: "Oral",
      indicaciones: "Tomar con agua"
    };

    axios.post(
      "https://graph.facebook.com/v22.0/587113451151885/messages",
      {
        messaging_product: "whatsapp",
        to: numero,
        type: "template",
        template: {
          name: "nuevo_medicamento_new",
          language: {
            code: "en"
          },
          components: [
            {
              type: "header",
              parameters: [
                {
                  type: "image",
                  image: {
                    link: "https://adresfosyga.co/wp-content/uploads/2020/05/Nueva-EPS-Logo.png"
                  }
                }
              ]
            },
            {
              type: "body",
              parameters: Object.entries(datosQuemados).map(([_, value]) => ({
                type: "text",
                text: value
              }))
            }
          ]
        }
      },
      {
        headers: {
          Authorization: "Bearer EAAaTwNpMCk0BOZCdHI0f18pn7lTw8DQ8G68cHEdeKr29pW92bZA4SpQJ7AYhTt9j9kzSAU6Ld67rJqFoR7zt0bRgfdZCFDXhjRXp2UZCG2dwToSrTR9uU4FOZCrTVuAeTwsTZCmIfxvOGZARyoR8ajqn8X7ZCCXa7awgBDiauyZARx2nHCqlIIQa8udZB6aR76Of4H7wZDZD",
          "Content-Type": "application/json"
        }
      }
    ).then(response => {
      console.log("✅ Mensaje WhatsApp enviado correctamente:", response.data);
      res.status(200).json({ message: "Mensaje de WhatsApp enviado correctamente." });
    }).catch(error => {
      console.error("❌ Error al enviar mensaje de WhatsApp:", error.response?.data || error.message);
      res.status(500).json({ error: "Error al enviar mensaje de WhatsApp" });
    });
  } catch (error) {
    console.error("❌ Error en whatsappMedicamento:", error.message);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
};

