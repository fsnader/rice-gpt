const client = require("./client");

const sanitizeOutput = (output) => output.replaceAll(/```(javascript|json)?/g, '');

async function generateCompletion(prompt) {
  const completion = await client.createChatCompletion({
    model: "gpt-4",
    messages: [
      {role: "system", content: "You are a javascript coding assistant. You will always return just code, without any comment or explanation"},
      {role: "user", content: prompt}],
  });

  const rawResult = completion.data.choices[0].message.content;
  return sanitizeOutput(rawResult);
}

module.exports = generateCompletion;
