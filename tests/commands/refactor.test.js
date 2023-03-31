
const getPrompt = require('../../src/utils/getPrompt');
const getCommandArgument = require('../../src/utils/getCommandArgument');
const { getInputFile, writeToOutputFile } = require('../../src/utils/fileUtils');
const generateCompletion = require('../../src/openai/generateCompletion');
const refactor = require('../../src/commands/refactor');

jest.mock('../../src/utils/getPrompt');
jest.mock('../../src/utils/getCommandArgument');
jest.mock('../../src/utils/fileUtils', () => ({
  getInputFile: jest.fn(),
  writeToOutputFile: jest.fn(),
}));
jest.mock('../../src/openai/generateCompletion');

describe('refactor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should throw an error if no file path is provided', async () => {
    getCommandArgument.mockReturnValue(undefined);

    await expect(refactor()).rejects.toThrow('Please provide your input javascript input file (without .js extension)');

    expect(getCommandArgument).toHaveBeenCalledWith(3);
  });

  test('should refactor the provided file using openai', async () => {
    getCommandArgument.mockReturnValue('exampleFilePath');
    getInputFile.mockReturnValue('const a = 1;');
    getPrompt.mockResolvedValue('Refactor this code to use arrow functions');
    generateCompletion.mockResolvedValue('const a = () => 1;');

    await refactor();

    expect(getCommandArgument).toHaveBeenCalledWith(3);
    expect(getPrompt).toHaveBeenCalledWith('Insert your prompt');
    expect(getInputFile).toHaveBeenCalledWith('exampleFilePath');
    expect(generateCompletion).toHaveBeenCalledWith('Refactor this code to use arrow functions:\nconst a = 1;');
    expect(writeToOutputFile).toHaveBeenCalledWith('exampleFilePath', 'const a = () => 1;');
  });
});
