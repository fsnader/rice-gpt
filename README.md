# rice-gpt
A node.js cli tool that uses GPT to automate a lot of different javascript programming tasks, like unit testing, repositories generation, etc

`All tests in this project have been created using the tool`

[DEMO VIDEO](https://loom.com/share/7a29f683901846bf87c7dedeb2a03c17)

## How to run locally ##

1. Set your OpenAI API key to the env

```batch
// This adds the OPENAI_API_KEY env variable to the current terminal session temporarily (until it closes)
export OPENAI_API_KEY=<YOUR_API_KEY>
```

2. Install rice-gpt globally

```bash
npm install -g
```

3. Run the project using the following command. The input file should be provided *without* the .js extension

```bash
rice-gpt <command> <input-file>
```

Available commands:
- `generate-unit-tests:` Generates a jest describe fixture for the input file. The file will be generated in the same with `input-file.test.js`
- `tdd-helper`: A wizard that will generate a jest unit test suite for the provided rules, and optionally generate the function that is being tested
- `freestyle`: Receives any command you provide and executes the prompt. The output will be saved on the provided input-file.
- `refactor`: Receives a command and refactor the provided file accordingly

## Generate unit tests ##
```bash
rice-gpt generate-unit-tests files/sample
```

It will generate a file called `files/sample.test.js`

![generate-unit-tests](/images/generate-unit-tests.gif?raw=true)

## TDD Wizard ##

```bash
rice-gpt tdd-helper files/fizzBuzz
```
The wizard will use fizzBuzz as the name of the function you want to create.
After that, it will ask you for more information before generating the tests

```bash
What is the function main goal?
It will return 'Fizz', 'Buzz', 'FizzBuzz' or the number itself, depending of the input

What are the input parameters of this function?
A number from 0 to 100

What are the output parameters of this function?
A string with 'Fizz', 'Buzz', 'FizzBuzz', or the number itself in a string format

What dependencies does it have? (any imported function that you will want to mock.
isDivisibleFor(number, number)

Include the next rule. (Type enter to finish)

A number is a multiple of 3, return 'Fizz'

Include the next rule. (Type enter to finish)
A number is a multiple of 5, return 'Buzz'

Include the next rule. (Type enter to finish)
A number is a multiple of both 3 and 5, return 'FizzBuzz'

Include the next rule. (Type enter to finish)
A number is not divisible by 3 or 5, return the number itself

Include the next rule. (Type enter to finish)
```

It will generate a file called `files/fizzBuzz.test.js` and will ask you if you want to create the function itself.

```bash
Do you wanna generate the function that passes the unit tests? [y/n]
y
```

It will generate a file called `files/fizzBuzz.js` with the actual function

## Free style ##

```bash
rice-gpt freestyle extractHtmlHeaders.js
```

The cli will ask for your prompt and will generate the output on `extractHtmlHeaders.js`

```bash
Insert your prompt:

Generate a function that receives a string in the html format and extracts all header tags to an array
```

## Refactor ##
```bash
rice-gpt refactor sample.js
```
The cli will ask for your prompt and will refactor `sample.js` accordingly

```bash
Insert your prompt
Refactor the function to receive 3 numbers instead of two
```
