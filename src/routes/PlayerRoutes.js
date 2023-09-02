import { Router } from 'express';
const playerRoutes = Router();
import * as playerController from '../controllers/playerController.js'

playerRoutes.get('/api/player/:player',          playerController.getPlayer);
playerRoutes.get('/api/player/:player/last',     playerController.getPlayerLastGame);
playerRoutes.get('/api/player/:player/inmortal', playerController.getPlayerInmortalGame);
playerRoutes.get('/api/player/:player/:limit',   playerController.getPlayerGamesWithLimit);

export default playerRoutes;