/**
 *  Server and router setup
 */

import express, { json } from 'express';
import './database.js'
import 'dotenv/config'

// Express configuration
const app  = express();
const PORT = process.env.PORT;
const APP_HOST = process.env.APP_HOST;
const APP_NAME = process.env.APP_NAME;

// Middleware para parsear JSON en las solicitudes
app.use(json());

// Router configuration
import gameRoutes   from './controllers/gameController.js';
import playerRoutes from './controllers/playerController.js';
app.use('/chessflix/api/games',  gameRoutes);
app.use('/chessflix/api/player', playerRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`⏯️ ${APP_NAME} API REST running at ${APP_HOST}:${PORT} `);
});