const { getInputFile, writeToOutputFile } = require("./fileUtils");
const commands = require('./commands');

async function executeCommand(command, inputFilePath, outputFilePath) {
  if (!commands.includes(command)) {
    console.log('Please provide a valid command');
    process.exit(1);
  }

  const inputFile = getInputFile(inputFilePath);

  console.log('Generating response....')
  const responseFile = await commands[command](inputFile);

  writeToOutputFile(outputFilePath, responseFile);
}

module.exports = executeCommand;
