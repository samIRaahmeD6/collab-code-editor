const roomSocket = require("./roomSocket");
const chatSocket = require("./chatSocket");
const userSocket = require("./userSocket");
const yjsSocket = require("./yjsSocket");

module.exports = (io) => {
  yjsSocket(io);

  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    roomSocket(io, socket);
    chatSocket(io, socket);
    userSocket(io, socket);
  });
};