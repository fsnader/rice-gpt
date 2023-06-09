require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

function createClient() {
  const API_KEY = process.env.OPENAI_API_KEY;

  if (!API_KEY) {
    throw new Error('OpenAI API key is missing. Please provide the API key in the OPENAI_API_KEY environment variable');
  }

  const configuration = new Configuration({
    apiKey: API_KEY
  });

  return  new OpenAIApi(configuration);
}

module.exports = createClient();
