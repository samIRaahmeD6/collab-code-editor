module.exports = (io, socket) => {
  socket.on("typing", ({ roomId, user }) => {
    socket.to(roomId).emit("typing", user);
  });
};