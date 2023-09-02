import gameModel from '../schemas/gameDTO.js';
import 'dotenv/config';

const RESP_OK              = parseInt(process.env.RESP_OK, 10);
const RESP_INTERNAL_ERROR  = parseInt(process.env.RESP_INTERNAL_ERROR, 10);
const RESP_NO_CONTENT      = parseInt(process.env.RESP_NO_CONTENT, 10);

export const getPlayer = async (req, res) => {
    try {
        const player = req.params.player;
        res.
            status(RESP_OK).
            json(`Obteniendo ${limit} partidas de ${player}`);
        
    } catch (error) {
        res.status(RESP_INTERNAL_ERROR).json({ error: 'Internal server error' });
    }
}

export const getPlayerLastGame = async (req, res) => {
    try {
        const player = req.params.player;
        
    } catch (error) {
        res.status(RESP_INTERNAL_ERROR).json({ error: 'Internal server error' });
    }
}

export const getPlayerInmortalGame = async (req, res) => {
    try {
        const player = req.params.player; 
        if(player===process.env.ANY_PLAYER){
            console.log(`trying to get inmortals games`);
            const inmortalGame = await gameModel.find({
                special: 'inmortal'
            });
            res.status(RESP_OK).json(inmortalGame);
        } else {
            console.log(`trying to get ${player}'s inmortal game`);
            const inmortalGame = await gameModel.find({
                $or: [
                    { white: player },
                    { black: player }
                ],
                $and: [
                    {special: 'inmortal'}
                ]
            });
            res.status(RESP_OK).json(inmortalGame);
        }
        
    } catch (error) {
        res.status(RESP_INTERNAL_ERROR).json({ error: 'Internal server error' });
    }
}

export const getPlayerGamesWithLimit = async (req, res) => {
    try {
        const player = req.params.player; 
        const limit = parseInt(req.params.limit); 
        const gamesWithLimit = await gameModel.find({
            $or: [
                { white: player },
                { black: player }
              ]
        }).limit(limit);
        res.status(RESP_OK).json(gamesWithLimit);
    } catch (error) {
        res.status(RESP_INTERNAL_ERROR).json({ error: 'Internal server error' });
    }
}