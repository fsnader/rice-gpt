const generateUnitTests = require("./generateUnitTests");

const commands = {
  'create-test': generateUnitTests,
}

module.exports = {
  includes: (command) => Object.keys(commands).includes(command),
  ...commands,
}
