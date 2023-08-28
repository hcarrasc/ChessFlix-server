import mongoose from 'mongoose';
const { Schema } = mongoose;

const gameSchema = new Schema({
  white: String,
  whiteElo: String,
  black: String,
  blackElo: String,
  result: String,
  event: String,
  date: String
});
