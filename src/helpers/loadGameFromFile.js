/**
 *  This module allows read a pgn file, parse it and assign to an object.
 *  @event load-game-from-file this module could be excetured by npm run
 *  @file game-example.pgn is a chess game in pgn format
 */

import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { parse } from '@mliebelt/pgn-parser'

const parseGames = (string) => parse(string, {startRule: 'games'});

const gameFilePath = resolve('./src/helpers/game-example.pgn')
readFile(gameFilePath, 'utf-8')
    .then(pgnFile=> {
        const game = parseGames(pgnFile).pop();
        console.log('Read game 📖 => ', game.moves[0].notation);
    })
    .catch(console.error);