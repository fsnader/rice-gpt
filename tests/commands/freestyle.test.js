
const getCommandArguments = require("../../src/utils/getCommandArgument");
const getPrompt = require("../../src/utils/getPrompt");
const generateCompletion = require("../../src/openai/generateCompletion");
const { writeToOutputFile } = require("../../src/utils/fileUtils");
const freestyle = require("../../src/commands/freestyle");

jest.mock("../../src/utils/getCommandArgument");
jest.mock("../../src/utils/getPrompt");
jest.mock("../../src/openai/generateCompletion");
jest.mock("../../src/utils/fileUtils");

describe("freestyle", () => {
  test("generate file successfully", async () => {
    // Arrange
    getCommandArguments.mockReturnValue("unitTestFile");
    getPrompt.mockReturnValue("generate a test");
    generateCompletion.mockResolvedValue("Sample output");

    // Act
    await freestyle();

    // Assert
    expect(getCommandArguments).toHaveBeenCalledWith(3);
    expect(getPrompt).toHaveBeenCalledWith("Insert your prompt: ");
    expect(generateCompletion).toHaveBeenCalledWith("generate a test");
    expect(writeToOutputFile).toHaveBeenCalledWith("unitTestFile", "Sample output");
  });

  test("throws an error when no input file is provided", async () => {
    // Arrange
    getCommandArguments.mockReturnValue(null);

    // Act and Assert
    await expect(freestyle()).rejects.toThrow(
      "Please provide your input javascript input file (with the extension)"
    );
  });
});
