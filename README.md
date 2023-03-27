# rice-gpt
A node.js cli tool that uses GPT to automate a lot of different javascript programming tasks, like unit testing, repositories generation, etc

How to run this project:

1. Create an .env file with your openai API KEY

```env
OPENAI_API_KEY=<YOUR_API_KEY>
```

2. Run the project using the following command. The input file should be provided *without* the .js extension

```bash
npm start <command> <input-file>
```

Available commands:
- `generate-unit-tests:` Generates a jest describe fixture for the input file. The file will be generated in the same with `input-file.test.js`

**Example**
```bash
npm start generate-unit-tests files/sample
```

It will generate a file called files/sample.test.js
