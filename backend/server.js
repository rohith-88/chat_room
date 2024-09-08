const express = require("express");
const Server = require("socket.io").Server;

const app = express();

const expressServer = app.listen(3000, () => {
  console.log("server running on 3000");
});

const io = new Server(expressServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.emit("serverMessage", "Welcome to chat");

  socket.broadcast.emit(
    "serverMessage",
    `${socket.id.substring(0, 6)} joined the chat`
  );

  socket.on("message", (data) => {
    io.emit("serverMessage", `${socket.id.substring(0, 6)}: ${data}`);
  });

  socket.on("activity", (user) => {
    socket.broadcast.emit("activity", user);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit(
      "serverMessage",
      `${socket.id.substring(0, 6)} left the chat`
    );
  });
});
