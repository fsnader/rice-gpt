const generateCompletion = require("./generateCompletion");
const { getInputFile, writeToOutputFile } = require("../utils/fileUtils");
const getCommandArguments = require("../utils/getCommandArgument");

async function generateUnitTestsResponse(inputFile) {
  const prompt = `Write jest unit tests for the following javascript function.
Provide the tests inside a describe block.
Use Arrange / Act / Assert
Mock all dependencies: \n${inputFile}`;

  console.log('...Generating unit tests')
  return await generateCompletion(prompt);
}

async function generateUnitTests() {

  const javascriptFilename = getCommandArguments(3);

  if (!javascriptFilename) {
    throw new Error('Please provide your input javascript input file (without .js extension)');
  }

  const inputFile = getInputFile(`${javascriptFilename}.js`);
  const output = await generateUnitTestsResponse(inputFile);

  writeToOutputFile(`${javascriptFilename}.test.js`, output);
}

module.exports = generateUnitTests;
