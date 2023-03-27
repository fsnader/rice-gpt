const commands = require('./commands');

async function executeCommand(command) {
  if (!commands.includes(command)) {
    throw new Error('Please provide a valid command');
  }

  await commands[command]();
}

module.exports = executeCommand;
