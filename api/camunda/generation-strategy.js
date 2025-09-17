// This is a strategy dispatcher to support the enhanced Camunda Orchestration Cluster API specification
// without impacting earlier versions.

const legacy = require("./generation-strategy-legacy");
const v88 = require("./generation-strategy-8.8");

function pick(apiConfig) {
  const isv88 =
    apiConfig.version === "next" || ["8.8"].includes(apiConfig.version);

  console.log(`is v88`, isv88, apiConfig.version);
  return isv88 ? v88 : legacy;
}

module.exports = {
  preGenerateDocs(apiConfig) {
    return pick(apiConfig).preGenerateDocs(apiConfig);
  },
  postGenerateDocs(apiConfig) {
    return pick(apiConfig).postGenerateDocs(apiConfig);
  },
};
