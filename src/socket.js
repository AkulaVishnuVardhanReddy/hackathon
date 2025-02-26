const { Server } = require("socket.io");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Allow frontend access
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected`);

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room: ${roomId}`);
    });

    socket.on("sendMessage", ({ roomId, user, text }) => {
      if (!text) {
        console.log(`⚠️ Message is undefined! Check frontend emit.`);
        return;
      }

      console.log(`📩 Message sent to ${roomId}: ${text}`);
      io.to(roomId).emit("message", { user, text });
    });

    socket.on("disconnect", () => {
      console.log(`User ${socket.id} disconnected`);
    });
  });

  return io;
};
