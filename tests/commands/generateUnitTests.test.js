const generateUnitTests = require('../../src/commands/generateUnitTests');
const generateCompletion = require("../../src/commands/generateCompletion");
const { getInputFile, writeToOutputFile } = require("../../src/utils/fileUtils");
const getCommandArguments = require("../../src/utils/getCommandArgument");

jest.mock("../../src/commands/generateCompletion");
jest.mock("../../src/utils/fileUtils");
jest.mock("../../src/utils/getCommandArgument");

describe("generateUnitTests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("should throw an error when no input file is provided", async () => {
    // Arrange
    getCommandArguments.mockReturnValue(undefined);

    // Act/Assert
    await expect(generateUnitTests()).rejects.toThrow();
  });

  it("should generate unit tests and write to an output file", async () => {
    // Arrange
    const inputFile = "test.js";
    const output = "unit tests output";

    getCommandArguments.mockReturnValue("test");
    getInputFile.mockReturnValue(inputFile);
    generateCompletion.mockReturnValue(output);

    // Act
    await generateUnitTests();

    // Assert
    expect(writeToOutputFile).toHaveBeenCalledWith("test.test.js", output);
  });
});
