/**
 *  This module allows read a pgn file, parse it and assign to an object.
 *  @event load-games this module could be excetured by npm run
 *  @file game-example.pgn is a chess game in pgn format
 */

import mongoose from 'mongoose';
import '../database.js'
import gameModel from '../schemas/gameDTO.js';
import PGNParser from './../utils/PGNParser.js';

const path = './src/helpers/game-example.pgn'

const parser = new PGNParser(path);
parser.parse();
const games = parser.getGames();

mongoose.connection.on('connected', () => {

    console.log('⏯️ CFX DB Up and Running 💪')

    games.forEach((game, index) => {
        console.log(`Partida ${index + 1}:`);
 
        const pivot = new gameModel ({
            event: game.Event,
            site: game.Site,
            date: game.Date,
            white: game.White,
            whiteElo: game.WhiteElo,
            black: game.Black,
            blackElo: game.BlackElo,
            ECO: game.ECO,
            opening: game.Opening,
            variation: game.Variation,
            result: game.Result,
            special: '',
            moves: game.moves 
        });

        pivot.save();

    });
    
    console.log('Write games '+ path +' sucessfuly');
  });
  
  mongoose.connection.on('error', (err) => {
    console.error('Error en la conexión a la base de datos:', err);
  });
