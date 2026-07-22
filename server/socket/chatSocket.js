module.exports = (io, socket) => {
  socket.on("chat-message", (data) => {
    io.to(data.roomId).emit("chat-message", {
      id: Date.now(),
      sender: data.sender,
      text: data.text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  });
};