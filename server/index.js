const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // your Vite client
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  socket.on('code-change', (newCode) => {
    socket.broadcast.emit('receive-code-change', newCode);
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});