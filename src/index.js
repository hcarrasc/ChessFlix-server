import express, { json } from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON en las solicitudes
app.use(json());

// Importar rutas
import routes from './controllers/gameController.js';

// Usar las rutas
app.use('/chessflix/api/games', routes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor API REST escuchando en el puerto ${PORT}`);
});