// PGNParser.mjs
import fs from "fs";

class PGNParser {
  constructor(filePath) {
    this.filePath = filePath;
    this.games = [];
    this.currentGame = {};
    this.readingMoves = false;
  }

  parse() {
    const pgnData = fs.readFileSync(this.filePath, "utf8");
    const lines = pgnData.split("\n");

    for (let line of lines) {
      
      if (line === "" || line.startsWith("%")) {
        continue;
      }

      line = line.replace(/\r/g, '');

      if (line.startsWith("[") && !this.readingMoves) {
        const parts = line.match(/\[(\w+)\s+"(.*?)"/);
        if (parts) {
          const key = parts[1];
          const value = parts[2];
          this.currentGame[key] = value;
        }
      }

      if (line.startsWith('1. ')) {
        this.currentGame.moves = "";
        this.currentGame.moves += line + " "; 
        this.readingMoves = true;
      }

      if (this.readingMoves && !(line.trim().startsWith('1.'))){
            this.currentGame.moves += line + " "; 
      }

      if ( line.trim().endsWith("1-0") || 
               line.trim().endsWith("0-1") || 
                    line.trim().endsWith("1/2-1/2")) {
        
        this.games.push({ ...this.currentGame });
        this.currentGame = {};
        this.readingMoves = false;
      }
    }
  }

  getGames() {
    return this.games;
  }
}

export default PGNParser;
