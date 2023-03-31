const getPrompt = require("../utils/getPrompt");
const getCommandArgument = require("../utils/getCommandArgument");
const { getInputFile, writeToOutputFile } = require("../utils/fileUtils");
const generateCompletion = require("../openai/generateCompletion");

async function refactor() {
  const filePath = getCommandArgument(3);

  if (!filePath) {
    throw new Error('Please provide your input javascript input file (without .js extension)');
  }

  const inputFile = getInputFile(filePath);

  const userPrompt = await getPrompt('Insert your prompt');

  const prompt = `${userPrompt}:\n${inputFile}`;

  console.log('...Refactoring file')
  const result = await generateCompletion(prompt);

  writeToOutputFile(filePath, result);
}

module.exports = refactor;
