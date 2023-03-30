const getCommandArguments = require("../utils/getCommandArgument");
const getPrompt = require("../utils/getPrompt");
const generateCompletion = require("../openai/generateCompletion");
const {writeToOutputFile} = require("../utils/fileUtils");

async function freestyle() {
  const functionName = getCommandArguments(3);

  if (!functionName) {
    throw new Error('Please provide your input javascript input file (with the extension)');
  }

  const command = await getPrompt("Insert your prompt: ");

  console.log("...Generating output");
  const result = await generateCompletion(command);

  writeToOutputFile(`${functionName}`, result);
}

module.exports = freestyle;
