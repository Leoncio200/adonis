import { Server } from 'socket.io';
import http from 'http';

const httpServer = http.createServer();
const io = new Server(httpServer, {
  serveClient: false,
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('get-games', () => {
    // Lógica para obtener la lista de juegos
    const games = [
      { id: 1, name: 'Juego 1' },
      { id: 2, name: 'Juego 2' },
      { id: 3, name: 'Juego 3' },
    ];
    socket.emit('games', games);
  });

  socket.on('join-game', ({ game, monitor }) => {
    // Lógica para unirse a un juego
    console.log(`El cliente se unió al juego ${game.name} con el monitor ${monitor}`);
    socket.join(game.id.toString());
    io.to(game.id.toString()).emit('player-joined', { game, monitor });
  });

  socket.on('leave-game', ({ game }) => {
    // Lógica para salir de un juego
    console.log(`El cliente salió del juego ${game.name}`);
    socket.leave(game.id.toString());
    io.to(game.id.toString()).emit('player-left', { game });
  });

  socket.on('boat-moved', (position) => {
    // Lógica para mover el barco
    console.log(`El barco se movió a la posición (${position.x}, ${position.y})`);
    io.emit('boatPosition', position);
  });
});
