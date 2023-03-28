const commands = require('./commands');

async function executeCommand(command) {
  if (!commands.includes(command)) {
    throw new Error(`Please provide one of the existing commands: ${commands.list}`);
  }

  await commands[command]();
}

module.exports = executeCommand;
