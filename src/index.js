const executeCommand = require("./executeCommand");

const command = process.argv[2];

executeCommand(command)
  .then(() => console.log('.'))
  .catch(error => console.error(error?.message));
