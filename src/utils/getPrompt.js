const prompt = require("prompt-sync")();
function getPrompt(text) {
  return prompt(text);
}

module.exports = getPrompt;
