describe("tddHelper", () => {
  const mockWriteToOutputFile = jest.fn();
  jest.mock("../../src/utils/fileUtils", () => ({
    writeToOutputFile: mockWriteToOutputFile,
  }));

  const mockGenerateCompletion = jest.fn();
  jest.mock("../../src/openai/generateCompletion", () => mockGenerateCompletion);

  const mockGetCommandArguments = jest.fn();
  const mockGetPrompt = jest.fn();
  jest.mock("../../src/utils/getCommandArgument", () => mockGetCommandArguments);
  jest.mock("../../src/utils/getPrompt", () => mockGetPrompt);

  beforeEach(() => {
    mockWriteToOutputFile.mockClear();
    mockGenerateCompletion.mockClear();
    mockGetCommandArguments.mockClear();
    mockGetPrompt.mockClear();
  });

  it("should generate test cases and function correctly", async () => {
    // Arrange
    const functionName = "sampleFunction";
    const mainGoal = "sample goal";
    const inputParameters = "param1, param2";
    const outputParameters = "output";
    const dependencies = "dependency1, dependency2";
    const rules = ["rule1", "rule2"];
    const expectedResult = "generated tests";

    mockGetCommandArguments.mockReturnValueOnce(functionName);
    mockGetPrompt
      .mockReturnValueOnce(mainGoal)
      .mockReturnValueOnce(inputParameters)
      .mockReturnValueOnce(outputParameters)
      .mockReturnValueOnce(dependencies)
      .mockReturnValueOnce("")
      .mockReturnValueOnce("y");

    mockGetPrompt.mockImplementationOnce(callback => {
      rules.forEach(rule => callback(rule));
      return rules;
    });

    mockGenerateCompletion
      .mockReturnValueOnce(expectedResult)
      .mockReturnValueOnce("generated function");

    const tddHelper = require("../../src/commands/tddHelper");

    // Act
    await tddHelper();

    // Assert
    expect(mockGenerateCompletion).toHaveBeenCalledTimes(2);
    expect(mockWriteToOutputFile).toHaveBeenNthCalledWith(1, `${functionName}.test.js`, expectedResult);
    expect(mockWriteToOutputFile).toHaveBeenNthCalledWith(2, `${functionName}.js`, "generated function");
  });
});
