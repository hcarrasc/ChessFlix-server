import { Router } from 'express';
const playerRoutes = Router();

playerRoutes.get('/:player', (req, res) => {
    const player = req.params.player;
    res.send(`Obteniendo informacion de ${player}`);
});

playerRoutes.get('/:player/last', (req, res) => {
    const player = req.params.player;
    res.send(`Obteniendo ultima partida de ${player}`);
});

export default playerRoutes;