import express, { json } from 'express';
import './database.js'
import 'dotenv/config'

// Express configuration
const app  = express();
const PORT = process.env.PORT;

// Middleware para parsear JSON en las solicitudes
app.use(json());

// Importar rutas
import gameRoutes   from './controllers/gameController.js';
import playerRoutes from './controllers/playerController.js';

// Usar las rutas
app.use('/chessflix/api/games',  gameRoutes);
app.use('/chessflix/api/player', playerRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor API REST escuchando en el puerto ${PORT}`);
});