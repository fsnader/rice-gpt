const client = require('./client');

async function generateUnitTests(inputFile) {
  const prompt = `Write jest unit tests for the following javascript function.
Provide the tests inside a describe block.
Use Arrange / Act / Assert
Mock all dependencies: \n${inputFile}`;

  const completion = await client.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: prompt}],
  });

  return completion.data.choices[0].message.content;
}

module.exports = generateUnitTests;
