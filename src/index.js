const executeCommand = require("./executeCommand");

const command = process.argv[2];
const javascriptFilename = process.argv[3];

if (!javascriptFilename) {
  console.error('Please provide your input javascript input file (without .js extension)');
  process.exit(1);
}

const inputFilePath = `${javascriptFilename}.js`;
const outputFilePath = `${javascriptFilename}.test.js`;

// Call the sendToCompletionAPI function to send the input file to the OpenAI Completion API and write the response to the output file
executeCommand(command, inputFilePath, outputFilePath);
