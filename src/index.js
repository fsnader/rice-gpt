#! /usr/bin/env node
const executeCommand = require("./executeCommand");
const getCommandArguments = require("./utils/getCommandArgument");
const { renderTitle } = require("./utils/gui");

const command = getCommandArguments(2);

renderTitle();
executeCommand(command)
  .then(() => console.log('.'))
  .catch(error => console.error(error?.message));
