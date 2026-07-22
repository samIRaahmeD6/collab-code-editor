const axios = require("axios");

const languageMap = {
  javascript: 63,
  typescript: 74,
  python: 71,
  java: 62,
  cpp: 54,
  c: 50,
  go: 60,
};

const executeCode = async (language, code) => {
  const language_id = languageMap[language];

  if (!language_id) {
    throw new Error("Unsupported language");
  }

  const response = await axios.post(
    `https://${process.env.RAPIDAPI_HOST}/submissions?base64_encoded=false&wait=true`,
    {
      language_id,
      source_code: code,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
      },
    }
  );

  return response.data;
};

module.exports = {
  executeCode,
};