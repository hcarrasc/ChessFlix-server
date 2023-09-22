import gameModel from '../schemas/gameDTO.js';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

const RESP_OK              = parseInt(process.env.RESP_OK, 10);
const RESP_INTERNAL_ERROR  = parseInt(process.env.RESP_INTERNAL_ERROR, 10);
const RESP_NO_CONTENT      = parseInt(process.env.RESP_NO_CONTENT, 10);
const secretKey = "123hchc123";

export const getPlayer = async (req, res) => {

    if (validateToken(req)){
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

    if (validateToken(req)){
        try {
            const limitGames = 5;
            const player = req.params.player; 
            console.log(`trying to get ${player}'s lastests game`);
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
        return res.status(401).json({ message: 'Token inválido' });
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
}

function validateToken(req) {

    console.log(req);

    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return false;
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return false;
        } else {
            return true;
        }
    });
}