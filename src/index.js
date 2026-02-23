// src/index.js
"use strict";
const { Server } = require("socket.io");

module.exports = {
  register(/* { strapi } */) {},

  bootstrap({ strapi }) {
    // Attach socket.io to the Strapi server
    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: "*", // Allow the admin panel to connect
        methods: ["GET", "POST"],
      },
    });

    // Make `io` globally available so we can trigger it from anywhere in Strapi
    strapi.io = io;
  },
};
