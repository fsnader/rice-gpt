const generateUnitTests = require("./generateUnitTests");
const tddHelper = require("./tddHelper");
const freestyle = require("./freestyle");

const commands = {
  'generate-unit-tests': generateUnitTests,
  'tdd-helper': tddHelper,
  'freestyle': freestyle,
}



module.exports = {
  list: Object.keys(commands),
  includes: (command) => Object.keys(commands).includes(command),
  ...commands,
}
