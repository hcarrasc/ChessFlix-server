/**
 *  Server setup
 */
import './database.js'
import express, { json } from 'express';
import 'dotenv/config'
import playerRoutes from './routes/PlayerRoutes.js';
import userRoutes   from './routes/UserRoutes.js';

// Express configuration
const app  = express();
const PORT = process.env.PORT;
const APP_HOST = process.env.APP_HOST;
const APP_NAME = process.env.APP_NAME;

// Middlewares
app.use(json());
app.use('/chessflix/', userRoutes);
app.use('/chessflix/', playerRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`⏯️  ${APP_NAME}  API REST running at  ${APP_HOST}:${PORT} `);
});