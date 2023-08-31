/**
 * @event split-games this module splits a given DB of chess games into small files
 * that can be parsed and stored into a DB later
 */

import { stat, createReadStream, createWriteStream } from 'fs';
import { join } from 'path';


const inputFile = './src/helpers/full-db.pgn'; // Ruta del archivo grande
const outputDirectory = './src/helpers/'; // Carpeta de salida para los archivos divididos

const targetFileSize = 1024 * 1024 * 1024; // Tamaño deseado de cada archivo en bytes (1 GB)
const numChunks = 100; // Número de archivos en los que se dividirá el archivo grande

stat(inputFile, (err, stats) => {
  if (err) {
    console.error('Error al obtener información del archivo:', err);
    return;
  }

  const totalSize = stats.size;
  const chunkSize = Math.ceil(totalSize / numChunks);

  const readStream = createReadStream(inputFile);
  let currentChunk = 1;
  let bytesWritten = 0;

  let writeStream = null;

  readStream.on('data', (chunk) => {
    if (!writeStream) {
      const outputFilePath = join(outputDirectory, `part-${currentChunk}.pgn`);
      writeStream = createWriteStream(outputFilePath);
    }

    writeStream.write(chunk);
    bytesWritten += chunk.length;

    if (bytesWritten >= chunkSize || bytesWritten >= targetFileSize) {
      writeStream.end();
      console.log(`Escrito el fragmento ${currentChunk}`);
      writeStream = null;
      currentChunk++;
      bytesWritten = 0;
    }
  });

  readStream.on('end', () => {
    if (writeStream) {
      writeStream.end();
    }
    console.log('División del archivo completada 🔪');
  });
});