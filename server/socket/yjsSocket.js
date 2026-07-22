const { YSocketIO } = require("y-socket.io/dist/server");

module.exports = (io) => {
  const ysocket = new YSocketIO(io);

  ysocket.initialize();

  console.log("Yjs initialized");
};