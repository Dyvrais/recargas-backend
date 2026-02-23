// src/admin/app.js
import { io } from "socket.io-client";

export default {
  config: {
    // Your existing custom config...
  },
  bootstrap(app) {
    // Connect to the backend socket using the current domain
    const socket = io(window.location.origin);

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
