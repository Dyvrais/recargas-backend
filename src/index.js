// src/index.js
"use strict";
const { Server } = require("socket.io");

module.exports = {
  register(/* { strapi } */) {},

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
