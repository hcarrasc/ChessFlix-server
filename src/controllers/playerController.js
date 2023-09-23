import gameModel from '../schemas/gameDTO.js';
import 'dotenv/config';
import Validator from '../utils/validators.js';


const RESP_OK              = parseInt(process.env.RESP_OK, 10);
const RESP_INTERNAL_ERROR  = parseInt(process.env.RESP_INTERNAL_ERROR, 10);
const RESP_NO_CONTENT      = parseInt(process.env.RESP_NO_CONTENT, 10);
const RESP_UNAUTHORIZED    = parseInt(process.env.RESP_UNAUTHORIZED, 10);
const guardian = new Validator();

export const getPlayer = async (req, res) => {

    const authHeader = req.headers['authorization'];
    if (guardian.validateToken(authHeader)){
        try {
            const player = req.params.player; 
            console.log(`trying to get ${player}'s games`);
            const allGames = await gameModel.find({
                $or: [
                    { white: player },
                    { black: player }
                ]
            });
            return res.status(RESP_OK).json(allGames);
            
        } catch (error) {
            return res.status(RESP_INTERNAL_ERROR).json({ error: 'Internal server error ', error });
        }
    } else {
        return res.status(401).json({ message: 'Token inválido' });
    }
}

export const getPlayerLastGame = async (req, res) => {

    const authHeader = req.headers['authorization'];
    if (guardian.validateToken(authHeader)){
        try {
            const limitGames = 5;
            const player = req.params.player; 
            
            const lastGame = await gameModel.find({
                $or: [
                    { white: player },
                    { black: player }
                ]
            }).sort({ 
                date: -1 
            }).limit(limitGames);
            return res.status(RESP_OK).json(lastGame);
            
        } catch (error) {
            return res.status(RESP_INTERNAL_ERROR).json({ error: 'Internal server error ', error });
        }
    } else {
        console.log(`invalid token 🗿`);
        return res.status(RESP_UNAUTHORIZED).json({ message: 'Token inválido' });
    }

}

export const getPlayerInmortalGame = async (req, res) => {

    const authHeader = req.headers['authorization'];
    if (guardian.validateToken(authHeader)){
        try {
            const player = req.params.player; 
            if(player===process.env.ANY_PLAYER){
                console.log(`trying to get inmortals games`);
                const inmortalGame = await gameModel.find({
                    special: 'inmortal'
                });
                return res.status(RESP_OK).json(inmortalGame);
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
                return res.status(RESP_OK).json(inmortalGame);
            }
            
        } catch (error) {
            return res.status(RESP_INTERNAL_ERROR).json({ error: 'Internal server error' });
        }
    } else {
        console.log(`invalid token 🗿`);
        return res.status(RESP_UNAUTHORIZED).json({ message: 'Token inválido' });
    }
}
