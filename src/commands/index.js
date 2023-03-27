const generateUnitTests = require("./generateUnitTests");
const tddHelper = require("./tddHelper");

const commands = {
  'generate-unit-tests': generateUnitTests,
  'tdd-helper': tddHelper,
}

module.exports = {
  includes: (command) => Object.keys(commands).includes(command),
  ...commands,
}
