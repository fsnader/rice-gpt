const executeCommand = require("./executeCommand");

const command = process.argv[2];

// Call the sendToCompletionAPI function to send the input file to the OpenAI Completion API and write the response to the output file
executeCommand(command);
