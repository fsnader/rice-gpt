const executeCommand = require("./executeCommand");
const getCommandArguments = require("./utils/getCommandArgument");

const command = getCommandArguments(2);

executeCommand(command)
  .then(() => console.log('.'))
  .catch(error => console.error(error?.message));
