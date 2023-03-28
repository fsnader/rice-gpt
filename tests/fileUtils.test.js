const fs = require('fs');
const { getInputFile, writeToOutputFile } = require('../src/utils/fileUtils');

jest.mock('fs');

describe('getInputFile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return file content when it exists', () => {
    const fileContent = 'hello world';
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(fileContent);

    const result = getInputFile('some-file');

    expect(fs.existsSync).toHaveBeenCalledWith('some-file');
    expect(fs.readFileSync).toHaveBeenCalledWith('some-file', 'utf-8');
    expect(result).toEqual(fileContent);
  });

  test('should throw an error when the file does not exist', () => {
    fs.existsSync.mockReturnValue(false);

    expect(() => {
      getInputFile('some-file');
    }).toThrow('Input file path is not valid');
  });
});

describe('writeToOutputFile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should write content to file when directory exists', () => {
    const outputFilePath = 'output/file.txt';
    const responseFile = 'some content';

    fs.existsSync.mockReturnValue(true);

    const writeStreamMock = {
      write: jest.fn(),
      close: jest.fn(),
    };
    fs.createWriteStream.mockReturnValue(writeStreamMock);

    writeToOutputFile(outputFilePath, responseFile);

    expect(fs.existsSync).toHaveBeenCalledWith('output');
    expect(fs.mkdirSync).not.toHaveBeenCalled();
    expect(fs.createWriteStream).toHaveBeenCalledWith(outputFilePath);
    expect(writeStreamMock.write).toHaveBeenCalledWith(responseFile);
    expect(writeStreamMock.close).toHaveBeenCalled();
  });

  test('should create directory and write content when directory does not exist', () => {
    const outputFilePath = 'output/file.txt';
    const responseFile = 'some content';

    fs.existsSync.mockReturnValue(false);

    const writeStreamMock = {
      write: jest.fn(),
      close: jest.fn(),
    };
    fs.createWriteStream.mockReturnValue(writeStreamMock);

    writeToOutputFile(outputFilePath, responseFile);

    expect(fs.existsSync).toHaveBeenCalledWith('output');
    expect(fs.mkdirSync).toHaveBeenCalledWith('output', { recursive: true });
    expect(fs.createWriteStream).toHaveBeenCalledWith(outputFilePath);
    expect(writeStreamMock.write).toHaveBeenCalledWith(responseFile);
    expect(writeStreamMock.close).toHaveBeenCalled();
  });
});
