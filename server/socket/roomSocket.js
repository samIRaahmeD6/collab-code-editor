module.exports = (io, socket) => {
  socket.on("join-room", (roomId) => {
    socket.join(roomId);

    console.log(`${socket.id} joined ${roomId}`);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
};