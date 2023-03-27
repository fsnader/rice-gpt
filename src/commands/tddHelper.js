const { writeToOutputFile } = require("../fileUtils");
const generateCompletion = require("./generateCompletion");
const prompt = require("prompt-sync")();

async function startTddSection({
  functionName,
  mainGoal,
  inputParameters,
  outputParameters,
  dependencies,
  rules
}) {

  let prompt = `Generate a jest describe block test for a function called ${functionName}.
The main goal of this function is: ${mainGoal}`;

  if (inputParameters) {
    prompt += `\nfunction receives the following parameters: ${inputParameters}}`;
  }

  if (outputParameters) {
    prompt += `\nThis function returns the following parameters: ${outputParameters}`;
  }

  if (dependencies) {
    prompt += `\nThis function has the following dependencies: ${dependencies}`;
  }

  prompt+= `Create tests for the following rules:\n ${rules.join('\n')}`;

  prompt += 'The dependencies need to be mocked using jest.mock. Return just the code.';

  return await generateCompletion(prompt);
}

function getRules() {
  const rules = [];

  while(true) {
    const rule = prompt('Include the next rule. (Type enter to finish)  ');

    if (!rule) {
      return rules;
    }

    rules.push(rule);
  }
}

async function generateFunctionFromTests({functionName, tests}) {
  const prompt = `Generate the function ${functionName} that passes all the tests provided in the following file:
${tests}`;

  const result = await generateCompletion(prompt);
  writeToOutputFile(`${functionName}.js`, result);
}

async function tddHelper() {
  console.clear();

  const functionName = process.argv[3];

  if (!functionName) {
    console.error('Please provide your input javascript input file (without .js extension)');
    process.exit(1);
  }


  const mainGoal = prompt('What is the function main goal? ')

  const inputParameters = prompt('What are the input parameters of this function? ');

  const outputParameters = prompt('What are the output parameters of this function? ')

  const dependencies = prompt('What dependencies does it have? (any imported function that you will want to mock. ');

  const rules = getRules();

  const result = await startTddSection({
    functionName,
    mainGoal,
    inputParameters,
    outputParameters,
    dependencies,
    rules,
  });

  console.log(result);
  writeToOutputFile(`${functionName}.test.js`, result);

  const shouldGenerateFunction = prompt('Do you wanna generate the function that passes the unit tests? [y/n] ');

  if (shouldGenerateFunction !== 'y') {
    return;
  }

  await generateFunctionFromTests({
    functionName,
    tests: result
  });
}

module.exports = tddHelper;