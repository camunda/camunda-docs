const { execSync } = require("child_process");

// Each API has a custom strategy, for modifying the schema or generated docs.
const operate = require("./operate/generation-strategy");
const tasklist = require("./tasklist/generation-strategy");
const adminsm = require("./administration-sm/generation-strategy");
const camunda = require("./camunda/generation-strategy");
const zeebe = require("./zeebe/generation-strategy");
const apiStrategies = {
  operate,
  tasklist,
  adminsm,
  camunda,
  zeebe,
};

// API name must be passed in as an arg.
const requestedAPI = process.argv[2];
if (requestedAPI === undefined) {
  const validAPIs = Object.keys(apiStrategies).join(", ");
  console.log(`Please specify an API name. Valid names: ${validAPIs}`);
  process.exit();
}

// The API name must be recognized.
const strategy = apiStrategies[requestedAPI];
if (strategy === undefined) {
  const validAPIs = Object.keys(apiStrategies).join(", ");
  console.error(`Invalid API name ${requestedAPI}. Valid names: ${validAPIs}`);
  process.exit();
}

// Version is an optional argument. If not provided, we assume "vNext".
const requestedVersion = process.argv[3];

// Hack: zeebe API is removed at version 8.7, don't allow regeneration in vNext.
if (requestedAPI === "zeebe" && requestedVersion === undefined) {
  console.error("Zeebe API docs are no longer in active development.");
  process.exit();
}

// Find the corresponding configuration in docusaurus.config.js.
const configs = loadAPIConfigs();
const apiConfig = buildAPIConfig(configs, requestedAPI, requestedVersion);

// All APIs will execute these same steps, with custom-per-API steps
//   implemented by each API's generation-strategy.js.
const steps = [
  // Remove old docs
  () => runCommand(buildCleanCommand(apiConfig)),

  // Run any custom steps before generation
  () => strategy.preGenerateDocs(apiConfig),

  // Generate the docs
  () => runCommand(buildGenerateCommand(apiConfig)),

  // Run any custom steps after generation
  () => strategy.postGenerateDocs(apiConfig),

  // Run prettier against the generated docs. Twice. Yes, twice.
  //   I don't know why, but the first run always leaves an extra blank line,
  //   which the second execution removes.
  () => runCommand(`prettier --write ${apiConfig.outputDir}`),
  () => runCommand(`prettier --write ${apiConfig.outputDir}`),
];

// Run the steps!
steps.forEach((step) => step());

// ---------- vvvvvvv helper functions vvvvvvv ----------

// Execute a command as if we were in the terminal
function runCommand(command) {
  const result = execSync(command, { stdio: "inherit" });
  return result;
}

// Load the API configs from the docusaurus.config.js file.
function loadAPIConfigs() {
  const config = require("../docusaurus.config");
  const apiConfigs = config.plugins
    .filter(
      (plugin) =>
        Array.isArray(plugin) && plugin[0] === "docusaurus-plugin-openapi-docs"
    )
    .reduce((acc, plugin) => {
      const [_, options] = plugin;
      configObject = options.config;
      const apiName = Object.keys(configObject)[0];
      acc[apiName] = configObject[apiName];
      return acc;
    }, {});

  // Reduce should give a shape like this:
  // {
  //   "operate": {
  //     "specPath": "api/operate/operate-openapi.yaml",
  //     "outputDir": "docs/apis-tools/operate-api/specifications",
  //     ...
  //     "versions": {
  //       "8.6": {
  //         "specPath": "api/operate/version-8.6/operate-openapi.yaml",
  //         "outputDir": "versioned_docs/version-8.6/apis-tools/operate-api/specifications",
  //         ...
  //       }
  //     }
  //   },
  //   "tasklist": {
  // ....

  return apiConfigs;
}

// Find the API config for the given API and version.
function buildAPIConfig(apiConfigs, requestedAPI, requestedVersion) {
  const apiConfig = apiConfigs[requestedAPI];
  if (apiConfig === undefined) {
    console.error(
      `No configuration found for API ${requestedAPI}. Check docusaurus.config.js.`
    );
    process.exit();
  }

  let matchingConfig = apiConfig;

  if (requestedVersion !== undefined) {
    matchingConfig = apiConfig.versions[requestedVersion];
    if (matchingConfig === undefined) {
      console.error(
        `No config found for API ${requestedAPI} version ${requestedVersion}. Check docusaurus.config.js.`
      );
      process.exit();
    }
  }

  return {
    apiName: requestedAPI,
    specPath: matchingConfig.specPath,
    outputDir: matchingConfig.outputDir,
    version: requestedVersion || "next",
  };
}

// Build the command to clean the API docs.
function buildCleanCommand(apiConfig) {
  const { apiName, version } = apiConfig;
  if (version === "next") {
    return `docusaurus clean-api-docs ${apiName} -p api-${apiName}-openapi`;
  }
  return `docusaurus clean-api-docs:version ${apiName}:${version} -p api-${apiName}-openapi`;
}

// Build the command to generate the API docs.
function buildGenerateCommand(apiConfig) {
  const { apiName, version } = apiConfig;
  if (version === "next") {
    return `docusaurus gen-api-docs ${apiName} -p api-${apiName}-openapi`;
  }
  return `docusaurus gen-api-docs:version ${apiName}:${version} -p api-${apiName}-openapi`;
}
