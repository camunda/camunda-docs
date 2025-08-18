const { execSync } = require("child_process");
const springSdk = require("./spring-sdk/generation-strategy");
const fs = require("fs");
const mustache = require("mustache");
const { config } = require("process");
const configRefStrategies = {
  "spring-sdk": springSdk,
};

const typeReplacements = {
  "java.lang.String": "string",
  "java.nio.file.Path": "file",
  "java.time.Duration": "duration",
  "io.camunda.spring.client.properties.CamundaClientAuthProperties$AuthMethod":
    "enum[none, basic, oidc]",
  "java.net.URI": "url",
  "java.lang.Boolean": "boolean",
  "java.lang.Integer": "integer",
  "java.lang.Long": "integer",
  "org.springframework.util.unit.DataSize": "dataSize",
  "io.camunda.spring.client.properties.CamundaClientProperties$ClientMode":
    "enum[self-managed, saas]",
  "java.util.List<java.lang.String>": "array[string]",
  "java.net.URL": "url",
};

const preserveGroups = ["camunda.client.worker.override"];
const preserveDeprecatedGroups = [
  "camunda.client.zeebe.override",
  "zeebe.client.worker.override",
];

// API name must be passed in as an arg.
const configRefStrategyName = process.argv[2];
if (configRefStrategyName === undefined) {
  const validConfigReferences = Object.keys(configRefStrategies).join(", ");
  console.log(
    `Please specify a config reference name. Valid names: ${validConfigReferences}`
  );
  process.exit();
}

// The API name must be recognized.
const strategy = configRefStrategies[configRefStrategyName];
if (strategy === undefined) {
  const validConfigReferences = Object.keys(configRefStrategies).join(", ");
  console.error(
    `Invalid config reference name ${validConfigReferences}. Valid names: ${validConfigReferences}`
  );
  process.exit();
}

// Version is an optional argument. If not provided, we assume "vNext".
const requestedVersion = process.argv[3];

const generationConfig = {
  version: requestedVersion,
  outputDir: strategy.getOutputDir(requestedVersion),
  metadata: strategy.getMetadata(requestedVersion),
  filename: strategy.getFilename(requestedVersion),
};

const template = fs.readFileSync(
  require.resolve("./configuration-reference.mustache"),
  { encoding: "utf8" }
);

if (requestedVersion === undefined) {
  console.log(`Generating config reference for ${configRefStrategyName}`);
} else {
  console.log(
    `Generating config reference for ${configRefStrategyName} for version ${requestedVersion}`
  );
}

const cleanConfigReference = (config) => {
  console.log(
    `Cleaning config reference output file: ${config.outputDir}/${config.filename}`
  );
  if (fs.existsSync(config.outputDir)) {
    fs.rmSync(`${config.outputDir}/${config.filename}`, {
      recursive: true,
      force: true,
    });
  }
  fs.mkdirSync(config.outputDir, { recursive: true });
};

const generateConfigReference = (config) => {
  console.log(
    `Generating config reference: ${config.outputDir}/${config.filename}`
  );
  config.metadata.groups
    .filter((group) => group.type === "java.util.Map")
    .forEach((group) => {
      console.log(
        `Group ${group.name} has type map and requires custom mapping`
      );
    });
  const metadata = {
    groups: config.metadata.groups
      .map((group) => {
        const properties = config.metadata.properties
          .filter((property) => property.deprecation === undefined)
          .filter((property) => property.sourceType === group.type);
        return {
          group,
          properties,
        };
      })
      .filter(
        (group) =>
          group.properties.length > 0 ||
          preserveGroups.includes(group.group.name)
      )
      .map((group) => {
        group.table = group.properties.length > 0;
        return group;
      }),
    deprecatedGroups: config.metadata.groups
      .map((group) => {
        const properties = config.metadata.properties
          .filter((property) => property.deprecation)
          .filter((property) => property.sourceType === group.type);
        const clonedGroup = JSON.parse(JSON.stringify(group));
        if (clonedGroup.description) {
          if (clonedGroup.description.startsWith("Zeebe")) {
          } else if (clonedGroup.description.startsWith("Keycloak")) {
          } else {
            clonedGroup.description =
              clonedGroup.description.charAt(0).toLowerCase() +
              clonedGroup.description.slice(1);
          }
        }
        return {
          group: clonedGroup,
          properties,
        };
      })
      .filter(
        (group) =>
          group.properties.length > 0 ||
          preserveDeprecatedGroups.includes(group.group.name)
      )
      .map((group) => {
        group.table = group.properties.length > 0;
        return group;
      }),
  };
  const output = mustache.render(template, metadata);
  fs.writeFileSync(`${config.outputDir}/${config.filename}`, output);
  console.log(
    `Config reference generated: ${config.outputDir}/${config.filename}`
  );
};

const runCommand = (command) => {
  const result = execSync(command, { stdio: "inherit" });
  return result;
};

const preGenerateDocs = (config) => {
  config.metadata.properties.forEach((property) => {
    if (property.type in typeReplacements) {
      property.type = typeReplacements[property.type];
    }
    property.defaultValue = JSON.stringify(property.defaultValue);
    if (property.defaultValue === undefined) {
      property.defaultValue = "null";
    }
    property.env = property.name
      .toUpperCase()
      .replaceAll(/\./g, "_")
      .replaceAll(/-/g, "");
  });
};
const postGenerateDocs = (config) => {};
// All APIs will execute these same steps, with custom-per-API steps
//   implemented by each API's generation-strategy.js.
const steps = [
  // Remove old docs
  () => cleanConfigReference(generationConfig),

  // Run any custom steps before generation
  () => preGenerateDocs(generationConfig),
  () => strategy.preGenerateDocs(generationConfig),

  // Generate the docs
  () => generateConfigReference(generationConfig),

  // Run any custom steps after generation
  () => postGenerateDocs(generationConfig),
  () => strategy.postGenerateDocs(generationConfig),

  // Run prettier against the generated docs. Twice. Yes, twice.
  //   I don't know why, but the first run always leaves an extra blank line,
  //   which the second execution removes.
  () => runCommand(`prettier --write ${generationConfig.outputDir}`),
  () => runCommand(`prettier --write ${generationConfig.outputDir}`),
];

// Run the steps!
steps.forEach((step) => step());
