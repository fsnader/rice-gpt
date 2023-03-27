const commands = require('./commands');

async function executeCommand(command) {
  if (!commands.includes(command)) {
    console.log('Please provide a valid command');
    process.exit(1);
  }

  await commands[command]();
}

module.exports = executeCommand;
