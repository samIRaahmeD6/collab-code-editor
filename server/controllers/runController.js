const { executeCode } = require("../services/judgeService");

const runCode = async (req, res) => {
  try {
    const { language, code } = req.body;

    const result = await executeCode(language, code);

    res.json(result);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Execution failed",
    });
  }
};

module.exports = {
  runCode,
};