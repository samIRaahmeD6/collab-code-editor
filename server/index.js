const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const initializeSockets = require("./socket");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

initializeSockets(io);

server.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});