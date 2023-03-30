async function getPrompt(text) {

  const psp = await import("prompt-sync-plus");
  const prompt = psp.default();

  console.log(text);
  return prompt("> ");
}

module.exports = getPrompt;
