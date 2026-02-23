module.exports = {
  afterCreate(event) {
    // Whenever a new entry is created, broadcast an event
    if (strapi.io) {
      strapi.io.emit("admin_notification", {
        message: "Una nueva orden se ha agregado.",
      });
    }
  },
};
