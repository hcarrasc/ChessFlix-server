/**
 *  This module allows read a pgn file, parse it and assign to an object.
 *  @event load-game-from-file this module could be excetured by npm run
 *  @file game-example.pgn is a chess game in pgn format
 */

import PGNParser from './../utils/PGNParser.js';

const parser = new PGNParser('./src/helpers/twic1503.pgn');
parser.parse();
const games = parser.getGames();
//console.log('Read game first instance 📖 => ', games);

games.forEach((game, index) => {
    console.log(`Partida ${index + 1}:`);
    console.log(game);
    console.log('------------------------');
});