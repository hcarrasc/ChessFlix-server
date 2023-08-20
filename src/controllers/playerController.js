import { Router } from 'express';
const router = Router();

router.get('/:player', (req, res) => {
    const player = req.params.player;
    res.send(`Obteniendo informacion de ${player}`);
});

router.get('/:player/last', (req, res) => {
    const player = req.params.player;
    res.send(`Obteniendo ultima partida de ${player}`);
});

export default router;