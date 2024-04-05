const { execSync } = require("child_process");

// More strategies to come, for other APIs.
const operate = require("./operate/generation-strategy");
const zeebe = require("./zeebe/generation-strategy");
const tasklist = require("./tasklist/generation-strategy");
const apiStrategies = {
  operate,
  zeebe,
  tasklist,
};

// Execute a command as if we were in the terminal
function runCommand(command) {
  const result = execSync(command, { stdio: "inherit" });
  return result;
}

// API name must be passed in as an arg.
const api = process.argv[2];
if (api === undefined) {
  const validAPIs = string.join(apiStrategies.join, ", ");
  console.log(`Please specify an API name. Valid names: ${validAPIs}`);
  process.exit();
}

// The API name must be recognized.
const strategy = apiStrategies[api];
if (strategy === undefined) {
  const validAPIs = string.join(apiStrategies.join, ", ");
  console.error(`Invalid API name ${api}. Valid names: ${validAPIs}`);
  process.exit();
}

// All APIs will execute these same steps, with custom-per-API steps
//   implemented by each API's generation-strategy.js.
const steps = [
  // Remove old docs
  () => runCommand(`docusaurus clean-api-docs ${api} -p api-${api}-openapi`),

  // Run any custom steps before generation
  strategy.preGenerateDocs,

  // Generate the docs
  () => runCommand(`docusaurus gen-api-docs ${api} -p api-${api}-openapi`),

  // Run any custom steps after generation
  strategy.postGenerateDocs,

  // Run prettier against the generated docs. Twice. Yes, twice.
  //   I don't know why, but the first run always leaves an extra blank line,
  //   which the second execution removes.
  () => runCommand(`prettier --write ${strategy.outputDir}`),
  () => runCommand(`prettier --write ${strategy.outputDir}`),
];

// Run the steps!
steps.forEach((step) => step());
