const { config } = require("dotenv");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");

// setting env

config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use("/family-100-buzzer", express.static("public"));

// Simpan data room
const rooms = new Map();

io.on("connection", (socket) => {
  // Juri membuat room
  socket.on("create-room", () => {
    const roomId = uuidv4();
    rooms.set(roomId, {
      judge: socket.id,
      players: [],
      spectators: [],
      buzzedPlayer: null,
      locked: false,
    });
    socket.join(roomId);
    socket.emit("room-created", {
      roomId,
      invitePlayerLink: `/player.html?room=${roomId}`,
      inviteSpectatorLink: `/spectator.html?room=${roomId}`,
    });
  });

  // Pemain join room
  socket.on("join-room", ({ roomId, playerName }) => {
    if (rooms.has(roomId)) {
      socket.join(roomId);
      const player = { id: socket.id, name: playerName };
      rooms.get(roomId).players.push(player);
      socket.emit("joined-room", { roomId, playerName });
      io.to(roomId).emit("update-players", rooms.get(roomId).players);
    } else {
      socket.emit("error", "Room tidak ditemukan atau sudah penuh");
    }
  });

  // Penonton join room
  socket.on("join-spectator", (roomId) => {
    if (rooms.has(roomId)) {
      socket.join(roomId);
      const spectator = { id: socket.id };
      rooms.get(roomId).spectators.push(spectator);
      socket.emit("spectator-joined", rooms.get(roomId));
      io.to(roomId).emit("update-spectators", rooms.get(roomId).spectators);
    } else {
      socket.emit("error", "Room tidak ditemukan");
    }
  });

  // Pemain menekan buzzer
  socket.on("buzz", ({ roomId, playerName }) => {
    const room = rooms.get(roomId);
    if (room && !room.locked) {
      room.buzzedPlayer = playerName;
      room.locked = true;
      io.to(roomId).emit("buzzer-pressed", playerName);
    }
  });

  // Juri reset sesi
  socket.on("reset", (roomId) => {
    const room = rooms.get(roomId);

    if (room) {
      room.buzzedPlayer = null;
      room.locked = false;
      io.to(roomId).emit("reset-buzzer");
    }
  });

  socket.on("disconnect", () => {
    const isAdmin = [...rooms].filter(
      ([_, value]) => value.judge === socket.id
    );
    if (isAdmin.length > 0) {
      const roomId = isAdmin[0][0];
      rooms.delete(roomId);
      io.to(roomId).emit("room-deleted", roomId);
    }
    rooms.forEach((room, roomId) => {
      room.players = room.players.filter((player) => player.id !== socket.id);
      room.spectators = room.spectators.filter(
        (spectator) => spectator.id !== socket.id
      );

      io.to(roomId).emit("update-players", room.players);
      io.to(roomId).emit("update-spectators", room.spectators);
    });
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server berjalan di http://localhost:" + PORT);
});
