const commands = {
  'generate-unit-tests': require("./generateUnitTests"),
  'tdd-helper': require("./tddHelper"),
  'freestyle': require("./freestyle"),
  'refactor': require("./refactor"),
}

module.exports = {
  list: Object.keys(commands),
  includes: (command) => Object.keys(commands).includes(command),
  ...commands,
}
