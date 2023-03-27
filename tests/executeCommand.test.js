describe('executeCommand unit tests', () => {
  jest.mock('../src/commands', () => ({
    foo: jest.fn(),
    includes: jest.fn()
  }));

  const commands = require('../src/commands');
  const executeCommand = require('../src/executeCommand');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the corresponding command function when a valid command is provided', async () => {
    // Arrange
    const command = 'foo';
    commands.includes.mockReturnValueOnce(true);

    // Act
    await executeCommand(command);

    // Assert
    expect(commands[command]).toHaveBeenCalled();
  });

  it('should throw an error when an invalid command is provided', async () => {
    // Arrange
    const command = 'bar';
    commands.includes.mockReturnValueOnce(false);

    // Act & Assert
    await expect(executeCommand(command)).rejects.toThrow('Please provide a valid command');
  });
});
