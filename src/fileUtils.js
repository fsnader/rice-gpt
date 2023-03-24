const fs = require('fs');
const path = require('path');

function getInputFile(inputFilePath) {

  console.log(`Opening file: ${inputFilePath}`);

  if (!fs.existsSync(inputFilePath)) {
    console.error('Input file path is not valid');
    process.exit(1);
  }

  return fs.readFileSync(inputFilePath, 'utf-8');
}

function writeToOutputFile(outputFilePath, responseFile) {
  const outputDirectory = path.dirname(outputFilePath);

  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  const outputStream = fs.createWriteStream(outputFilePath);
  outputStream.write(responseFile);

  console.log(`File generated successfully at ${outputFilePath}`);
  outputStream.close();
}

module.exports = {
  getInputFile,
  writeToOutputFile,
}
