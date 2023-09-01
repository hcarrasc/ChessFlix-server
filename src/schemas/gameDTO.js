import mongoose from '../database.js';

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
    special: String,
    moves: String
});

const gameModel = mongoose.model('games', gameSchema);

export default gameModel;