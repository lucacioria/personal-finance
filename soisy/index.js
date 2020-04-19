const api = require("./api");
const soisy = require("./soisy.js");

async function run() {
  let rawAPIInvestments;
  try {
    rawAPIInvestments = await api.getInvestments();
  } catch (e) {
    if (e === 401) {
      await api.login();
    }
  }

  if (!rawAPIInvestments) {
    rawAPIInvestments = await api.getInvestments();
  }

  const parsedInvestments = soisy.parseInvestments(rawAPIInvestments);
  soisy.writeOutputToJSON(undefined, parsedInvestments, rawAPIInvestments);
}

module.exports = {
  run,
};
