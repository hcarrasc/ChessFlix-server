/**
 *  This module allows read a pgn file, parse it and assign to an object.
 *  @event load-game-from-file this module could be excetured by npm run
 *  @file game-example.pgn is a chess game in pgn format
 */

import mongoose from 'mongoose';
import '../database.js'
const { Schema } = mongoose;

const gameSchema = new Schema({
    event: String,
    site: String,
    date: String,
    white: String,
    whiteElo: Number,
    black: String,
    blackElo: Number,
    ECO: String,
    opening: String,
    variation: String,
    result: String,
    moves: String, 
});

import PGNParser from './../utils/PGNParser.js';

const parser = new PGNParser('./src/helpers/game-example.pgn');
parser.parse();
const games = parser.getGames();

games.forEach((game, index) => {
    console.log(`Partida ${index + 1}:`);
    console.log(game);
    console.log('------------------------');

const gameModel = mongoose.model('games', gameSchema);
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
    moves: game.moves 
});
pivot.save();
console.log('Write game 📝 sucessfuly');
});
