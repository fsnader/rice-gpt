const client = require("./client");

async function generateCompletion(prompt) {
  const completion = await client.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {role: "system", content: "You are a javascript coding assistant. You will always return just code, without any comment or explanation"},
      {role: "user", content: prompt}],
  });

  return completion.data.choices[0].message.content;
}

module.exports = generateCompletion;
