const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const { router, db } = require('./api.js');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3001;


const buildPath = path.join(__dirname, 'frontend', 'build');

app.use(express.static(buildPath));
app.use(express.json());
app.use(cors());

app.use(router);

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('addGuest', (guest) => io.emit('addGuest', guest));
  socket.on('removeGuest', (guest) => io.emit('removeGuest', guest));
});

server.listen(port, () => {
  console.log(`Server is online on port: ${port}`);
});

const connect = async () => {
  try {
    await db.authenticate();
    await db.sync();
    console.log('Соединение с БД было успешно установлено');
  } catch (e) {
    console.log('Невозможно выполнить подключение к БД: ', e);
  }
};

connect();