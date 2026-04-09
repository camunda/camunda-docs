// This is a strategy dispatcher to support the enhanced Camunda Orchestration Cluster API specification
// without impacting earlier versions.

const legacy = require("./generation-strategy-legacy");
const v88 = require("./generation-strategy-8.8");
const next = require("./generation-strategy-next");

function pick(apiConfig) {
  const { version } = apiConfig;
  switch (version) {
    case "next":
      return next;

    case parseFloat(version) > 8.8:
      return next;

    case "8.8":
      console.log(`is v88`, true, version);
      return v88;

    default:
      console.log(`is legacy`, true, version);
      return legacy;
  }
}

module.exports = {
  preGenerateDocs(apiConfig) {
    return pick(apiConfig).preGenerateDocs(apiConfig);
  },
  postGenerateDocs(apiConfig) {
    return pick(apiConfig).postGenerateDocs(apiConfig);
  },
};
