const { writeToOutputFile } = require("../utils/fileUtils");
const generateCompletion = require("../openai/generateCompletion");
const getCommandArguments = require("../utils/getCommandArgument");
const getPrompt = require("../utils/getPrompt");

async function startTddSection({
  functionName,
  mainGoal,
  inputParameters,
  outputParameters,
  dependencies,
  rules
}) {

  let prompt = `Generate a jest describe block test for a function called ${functionName}.
The main goal of this function is: ${mainGoal}.`;

  if (inputParameters) {
    prompt += `\nThis function receives the following parameters: ${inputParameters}}.`;
  }

  if (outputParameters) {
    prompt += `\nThis function returns the following parameters: ${outputParameters}.`;
  }

  if (dependencies) {
    prompt += `\nThis function has the following dependencies: ${dependencies}.`;
  }

  prompt+= `Create tests for the following rules:\n ${rules.join('\n')}.`;

  prompt += 'The dependencies need to be mocked using jest.mock. Return just the code.';

  console.log('...Generating tests');
  return await generateCompletion(prompt);
}

function getRules() {
  const rules = [];

  while(true) {
    const rule = getPrompt('Include the next rule. (Type enter to finish)  ');

    if (!rule) {
      return rules;
    }

    rules.push(rule);
  }
}

async function generateFunctionFromTests({functionName, tests}) {
  const prompt = `Generate the function ${functionName} that passes all the tests provided in the following file:
${tests}`;

  console.log('...Generating function');
  const result = await generateCompletion(prompt);
  writeToOutputFile(`${functionName}.js`, result);
}

async function tddHelper() {

  const functionName = getCommandArguments(3);

  if (!functionName) {
    throw new Error('Please provide your input javascript input file (without .js extension)');
  }


  const mainGoal = getPrompt('What is the function main goal? ')

  const inputParameters = getPrompt('What are the input parameters of this function? ');

  const outputParameters = getPrompt('What are the output parameters of this function? ')

  const dependencies = getPrompt('What dependencies does it have? (any imported function that you will want to mock. ');

  const rules = getRules();

  const result = await startTddSection({
    functionName,
    mainGoal,
    inputParameters,
    outputParameters,
    dependencies,
    rules,
  });

  writeToOutputFile(`${functionName}.test.js`, result);

  const shouldGenerateFunction = getPrompt('Do you wanna generate the function that passes the unit tests? [y/n] ');

  if (shouldGenerateFunction !== 'y') {
    return;
  }

  await generateFunctionFromTests({
    functionName,
    tests: result
  });
}

module.exports = tddHelper;
