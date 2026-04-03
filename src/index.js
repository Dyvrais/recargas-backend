// src/index.js
"use strict";

const axios = require("axios");
const { Server } = require("socket.io");

module.exports = {
  register({ strapi }) {
    // 1. Hook into the Global Document Service
    strapi.documents.use(async (context, next) => {
      const { action, uid, params } = context;

      // 2. Execute the actual creation in the database first
      const result = await next();

      // 3. The Filter: Only trigger for 'Orders' and only when 'Created'
      // This prevents the "Edit" re-triggering issue.
      if (uid === "api::order.order" && action === "create") {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        // Validation to ensure variables exist on Strapi Cloud
        if (!token || !chatId) {
          strapi.log.warn("Telegram Notification: Credentials missing.");
          return result;
        }
        let carritoText = "N/A";
        if (result.CarritoJSON && result.createdAt) {
          try {
            const carrito = result.CarritoJSON; // Already parsed as JSON in Strapi
            if (Array.isArray(carrito)) {
              carritoText = carrito
                .map((item, index) => {
                  return ` *Producto:* ${item.NombreProducto || "N/A"}\n  *Item:* ${item.CoinSeleccionada || "N/A"}\n  *Precio Bs:* ${item.PrecioBolivares || "N/A"}\n  *Precio USD:* $${item.PrecioDolares || "N/A"}\n  *Usuario ID:* ${item.IDdelUsuario || "N/A"}\n  *Teléfono:* ${item.TelefonoDeContacto || "N/A"}`;
                })
                .join("\n\n");
            } else {
              carritoText = JSON.stringify(carrito, null, 2);
            }
          } catch (e) {
            carritoText = "Error parsing cart";
          }
        }

        // Compose the notification message
        const message = `
🛍️ *¡Nueva orden recibida!*
──────────────────
*ID de la orden:* #${result.id}
*Nro de telefono:* ${result.Telefono || "N/A"}
*Nro de referencia:* ${result.Referencia || "N/A"}
*Estado:* ${result.Estado || "N/A"}
*Metodo de Pago:* ${result.MetodoPago || "N/A"}
*Carrito:*
${carritoText}
    `;

        try {
          await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
            chat_id: chatId,
            text: message,
            parse_mode: "Markdown", // Allows bold and emojis
          });
        } catch (error) {
          console.error(
            "Telegram Error:",
            error.response?.data || error.message,
          );
        }
      }

      // Always return the result so Strapi continues its process
      return result;
    });
  },

  bootstrap({ strapi }) {
    const io = new Server(strapi.server.httpServer, {
      cors: {
        // This dynamically allows the domain the request is coming from
        origin: (origin, callback) => {
          callback(null, true);
        },
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    strapi.io = io;
  },
};
