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
- `tdd-helper`: A wizard that will generate a jest unit test suite for the provided rules, and optionally generate the function that is being tested

## Generate unit tests ##
```bash
npm start generate-unit-tests files/sample
```

It will generate a file called `files/sample.test.js`

## TDD Wizard ##

```bash
npm start tdd-helper files/fizzBuzz
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
isDivisibleFor(number), that returns true or false

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
