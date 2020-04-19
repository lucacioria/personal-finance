const fs = require("fs");

function parseInvestments(APIinvestments) {
  const res = {};
  APIinvestments.map((investment) => {
    investment.matches
      .filter((investmentMatch) => investmentMatch.isOverdue)
      .map((investmentMatch) => {
        if (!res[investmentMatch.instalmentsOverdue]) {
          res[investmentMatch.instalmentsOverdue] = {
            count: 0,
            remainingInvest: 0,
          };
        }
        res[investmentMatch.instalmentsOverdue].count =
          res[investmentMatch.instalmentsOverdue].count + 1;
        res[investmentMatch.instalmentsOverdue].remainingInvest =
          res[investmentMatch.instalmentsOverdue].remainingInvest +
          investmentMatch.remainingInvest / 100;
      }, {});
  });

  res.totalRemainingInvest = Object.keys(res)
    .map((key) => res[key].remainingInvest)
    .reduce((a, p) => a + p, 0);

  return res;
}

function writeOutputToJSON(
  filename = "soisy.json",
  parsedInvestments,
  rawAPIInvestments
) {
  const rawOutput = {
    moneyAtRisk: parsedInvestments,
    rawInvestments: rawAPIInvestments,
    date: new Date().toUTCString(),
  };

  fs.writeFileSync(`./${filename}`, JSON.stringify(rawOutput));
}

module.exports = {
  parseInvestments,
  writeOutputToJSON,
};
