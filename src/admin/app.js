// src/admin/app.js
import { io } from "socket.io-client";

export default {
  config: {
    // Your existing custom config...
  },
  bootstrap(app) {
    // 1. Force 'websocket' transport to bypass Strapi Cloud load balancer issues
    // 2. Explicitly tell it to use secure connections (wss://)
    const socket = io(window.location.origin, {
      transports: ["websocket"],
      secure: true,
    });

    socket.on("admin_notification", (data) => {
      console.log("Notification received:", data.message);

      // Fetch the sound from the public folder and play it
      const audio = new Audio("/notification.mp3");

      audio.play().catch((error) => {
        // Modern browsers block autoplay until the user clicks somewhere on the page.
        console.warn(
          "Audio play blocked. Click anywhere on the admin panel to allow audio.",
          error,
        );
      });
    });
  },
};
