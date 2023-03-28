const generateUnitTests = require("./generateUnitTests");
const tddHelper = require("./tddHelper");

const commands = {
  'generate-unit-tests': generateUnitTests,
  'tdd-helper': tddHelper,
}



module.exports = {
  list: Object.keys(commands),
  includes: (command) => Object.keys(commands).includes(command),
  ...commands,
}
