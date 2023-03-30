jest.mock('../../src/openai/client');
const client = require('../../src/openai/client');
const generateCompletion = require('../../src/openai/generateCompletion');

describe("generateCompletion", () => {

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should generate completion for given prompt", async () => {

    const createChatCompletionMock = jest.fn(() => ({
      data: {
        choices: [
          {
            message: {
              content: "console.log('Hello, World!')"
            }
          }
        ]
      }
    }));

    client.createChatCompletion.mockImplementationOnce(createChatCompletionMock);

    const prompt = "console.log('Hello, World!')";

    const result = await generateCompletion(prompt);

    expect(createChatCompletionMock).toHaveBeenCalledWith({
      model: "gpt-4",
      messages: [
        {role: "system", content: "You are a javascript coding assistant. You will always return just code, without any comment or explanation"},
        {role: "user", content: prompt}],
    });

    expect(result).toEqual("console.log('Hello, World!')");
  });

  test("should replace triple backticks and code block types with empty string", async () => {

    const createChatCompletionMock = jest.fn(() => ({
      data: {
        choices: [
          {
            message: {
              content: "```javascript\nconsole.log('Hello, World!')```\n"
            }
          }
        ]
      }
    }));

    client.createChatCompletion.mockImplementationOnce(createChatCompletionMock);

    const prompt = "console.log('Hello, World!')";

    const result = await generateCompletion(prompt);

    expect(result).toEqual("\nconsole.log('Hello, World!')\n");

  });

});

