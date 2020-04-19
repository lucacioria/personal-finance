const api = require("./api");
const soisy = require("./soisy.js");
const credentials = require("./credential");

async function run() {
  console.log("[Soisy module] Starting up");

  console.log("[Soisy module] Testing if token is valid...");
  try {
    await api.getInvestments();
  } catch (e) {
    if (e === 401) {
      console.log("token not valid");
      await api.login();
    }
  }

  const rawAPIInvestments = await api.getInvestments();

  const parsedInvestments = soisy.parseInvestments(rawAPIInvestments);
  soisy.writeOutputToJSON(undefined, parsedInvestments, rawAPIInvestments);
}

module.exports = {
  run,
};
