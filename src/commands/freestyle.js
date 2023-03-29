const getCommandArguments = require("../utils/getCommandArgument");
const prompt = require("prompt-sync")();
const generateCompletion = require("../openai/generateCompletion");
const {writeToOutputFile} = require("../utils/fileUtils");

async function freestyle() {
  const functionName = getCommandArguments(3);

  if (!functionName) {
    throw new Error('Please provide your input javascript input file (without .js extension)');
  }

  const command = prompt("Insert your prompt: ");

  console.log("...Generating output");
  const result = await generateCompletion(command);

  writeToOutputFile(`${functionName}.js`, result);
}

module.exports = freestyle;
