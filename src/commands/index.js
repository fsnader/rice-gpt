const generateUnitTests = require("./generateUnitTests");

const commands = {
  'generate-unit-tests': generateUnitTests,
}

module.exports = {
  includes: (command) => Object.keys(commands).includes(command),
  ...commands,
}
