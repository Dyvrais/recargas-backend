// module.exports = {
//   afterCreate(event) {
//     // Whenever a new entry is created, broadcast an event
//     if (strapi.io) {
//       strapi.io.emit("admin_notification", {
//         message: "Una nueva orden se ha agregado.",
//       });
//     }
//   },
// };

// const axios = require("axios");

// module.exports = {
//   async afterCreate(event) {
//     const { result } = event;

//     // Data from your .env
//     const token = process.env.TELEGRAM_BOT_TOKEN;
//     const chatId = process.env.TELEGRAM_CHAT_ID;

//     // Parse and format the cart
//     let carritoText = "N/A";
//     if (result.CarritoJSON && result.createdAt) {
//       try {
//         const carrito = result.CarritoJSON; // Already parsed as JSON in Strapi
//         if (Array.isArray(carrito)) {
//           carritoText = carrito
//             .map((item, index) => {
//               return ` *Producto:* ${item.NombreProducto || "N/A"}\n  *Item:* ${item.CoinSeleccionada || "N/A"}\n  *Precio Bs:* ${item.PrecioBolivares || "N/A"}\n  *Precio USD:* $${item.PrecioDolares || "N/A"}\n  *Usuario ID:* ${item.IDdelUsuario || "N/A"}\n  *Teléfono:* ${item.TelefonoDeContacto || "N/A"}`;
//             })
//             .join("\n\n");
//         } else {
//           carritoText = JSON.stringify(carrito, null, 2);
//         }
//       } catch (e) {
//         carritoText = "Error parsing cart";
//       }
//     }

//     // Compose the notification message
//     const message = `
// 🛍️ *¡Nueva orden recibida!*
// ──────────────────
// *ID de la orden:* #${result.id}
// *Nro de telefono:* ${result.Telefono || "N/A"}
// *Nro de referencia:* ${result.Referencia || "N/A"}
// *Estado:* ${result.Estado || "N/A"}
// *Metodo de Pago:* ${result.MetodoPago || "N/A"}
// *Carrito:*
// ${carritoText}
//     `;

//     try {
//       await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
//         chat_id: chatId,
//         text: message,
//         parse_mode: "Markdown", // Allows bold and emojis
//       });
//     } catch (error) {
//       console.error("Telegram Error:", error.response?.data || error.message);
//     }
//   },

//   async afterUpdate(event) {
//     // This runs every time you edit the order in the admin panel
//     // Intentionally left empty to prevent notifications on updates
//     console.log("Order updated, but no notification sent."); // Optional debug log
//   },
// };
