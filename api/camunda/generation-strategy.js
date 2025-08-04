const removeDuplicateVersionBadge = require("../remove-duplicate-version-badge");
const fs = require("fs");
const yaml = require("js-yaml");

function preGenerateDocs(config) {
  const originalSpec = fs.readFileSync(config.specPath, "utf8");

  console.log("adjusting C8 spec file...");

  const specUpdates = [
    ...addDisclaimer(originalSpec),
    ...redefineCreateProcessInstanceRequest(originalSpec),
    ...redefineEvaluateDecisionRequest(originalSpec),
    ...addAlphaAdmonition(), // needs to go before addFrequentlyLinkedDocs
    ...addFrequentlyLinkedDocs(config.version),
    ...flattenPathParams(originalSpec),
    ...stripCamundaKeyConstraintsForDocs(originalSpec),
  ];

  let updatedSpec = originalSpec;

  for (const update of specUpdates) {
    updatedSpec = updatedSpec.replace(update.from, update.to);
  }

  fs.writeFileSync(config.specPath, updatedSpec);

  // Add eventual consistency admonitions based on vendor extension `x-eventually-consistent: true`
  addEventualConsistencyAdmonition(config.specPath);

  // This must happen after eventual consistency admonitions (and any other transforms that need vendor extensions)
  // Remove all vendor extensions. Docusaurus does not like them. See: https://github.com/PaloAltoNetworks/docusaurus-openapi-docs/issues/891
  removeVendorExtensions(config.specPath);
}

function postGenerateDocs(config) {
  removeDuplicateVersionBadge(
    `${config.outputDir}/orchestration-cluster-rest-api.info.mdx`
  );
}

function addDisclaimer(originalSpec) {
  // Make this a repeatable task by checking if it's run already.
  if (
    originalSpec.includes(
      "Disclaimer: This is a modified version of the Camunda REST API specification, optimized for the documentation."
    )
  ) {
    console.log("skipping addDisclaimer...");
    return [];
  }

  // Adds a disclaimer to the very beginning of the file, so that people know this isn't the true spec.
  return [
    {
      from: /^/,
      to: `# Disclaimer: This is a modified version of the Camunda REST API specification, optimized for the documentation.

`,
    },
  ];
}

function redefineCreateProcessInstanceRequest(originalSpec) {
  // Redefines the CreateProcessInstanceRequest schema to describe a union of two possible request bodies.
  //   This union type does not work upstream, but we can rewrite it here to more clearly describe the schema.

  if (originalSpec.includes("CreateProcessInstanceRequestBase")) {
    // Make this a repeatable task by checking if it's run already.
    console.log("skipping redefineCreateProcessInstanceRequest...");
    return [];
  }

  // Diff created by these changes:
  //   CreateProcessInstanceRequest:
  //     type: object
  //+    oneOf:
  //+      - $ref: "#/components/schemas/CreateProcessInstanceRequestByKey"
  //+      - $ref: "#/components/schemas/CreateProcessInstanceRequestById"
  //+   CreateProcessInstanceRequestByKey:
  //+    type: object
  //+    allOf:
  //+      - $ref: "#/components/schemas/CreateProcessInstanceRequestBase"
  //     properties:
  //       processDefinitionKey:
  //         ...
  //+  CreateProcessInstanceRequestById:
  //+    type: object
  //+    allOf:
  //+      - $ref: "#/components/schemas/CreateProcessInstanceRequestBase"
  //+    properties:
  //       processDefinitionId:
  //         ...
  //       processDefinitionVersion:
  //         ...
  //+  CreateProcessInstanceRequestBase:
  //+    type: object
  //+    properties:
  //       variables:
  //         ...
  //       tenantId:
  //         ...
  //       ...

  return [
    // 1. Convert the main request to a oneOf union and define the first possible type.
    {
      // match the start of the CreateProcessInstanceRequest object
      from: /    CreateProcessInstanceRequest:\n      type: object/m,

      // append the `oneOf` declaration to define the union type.
      //   Then a definition for the first possible type, so that it includes the `processDefinitionKey` property.
      to: `    CreateProcessInstanceRequest:
      type: object
      oneOf:
        - $ref: "#/components/schemas/CreateProcessInstanceRequestByKey"
        - $ref: "#/components/schemas/CreateProcessInstanceRequestById"
    CreateProcessInstanceRequestByKey:
      type: object
      allOf:
        - $ref: "#/components/schemas/CreateProcessInstanceRequestBase"`,
    },

    // 2. Define the second possible type, to include the `processDefinitionId` property.
    {
      // match the start of the CreateProcessInstanceRequestByKey object, up until the `processDefinitionId` property (non-inclusive).
      from: /    CreateProcessInstanceRequestByKey:[\s\S]*?(?=\s*processDefinitionId:)/m,

      // append the second possible type definition, so that it includes the `processDefinitionId`.
      to: `$&
    CreateProcessInstanceRequestById:
      type: object
      allOf:
        - $ref: "#/components/schemas/CreateProcessInstanceRequestBase"
      properties:`,
    },

    // 3. Define a base type to contain the common properties, starting before the `variables` property.
    {
      // match the start of the CreateProcessInstanceRequestById object, up until the `variables` property (non-inclusive).
      from: /    CreateProcessInstanceRequestById:[\s\S]*?(?=\s*variables:)/m,
      // append the base type definition, so that it includes all remaining properties.
      to: `$&
    CreateProcessInstanceRequestBase:
      type: object
      properties:`,
    },
  ];
}

function redefineEvaluateDecisionRequest(originalSpec) {
  // Redefines the EvaluateDecisionRequest schema to describe a union of two possible request bodies.
  //   This union type does not work upstream, but we can rewrite it here to more clearly describe the schema.

  if (originalSpec.includes("EvaluateDecisionRequestBase")) {
    // Make this a repeatable task by checking if it's run already.
    console.log("skipping redefineEvaluateDecisionRequest...");
    return [];
  }

  // Diff created by these changes:
  //   EvaluateDecisionRequest:
  //     type: object
  //+    oneOf:
  //+      - $ref: "#/components/schemas/EvaluateDecisionRequestByKey"
  //+      - $ref: "#/components/schemas/EvaluateDecisionRequestById"
  //+  EvaluateDecisionRequestByKey:
  //+    type: object
  //+    allOf:
  //+      - $ref: "#/components/schemas/EvaluateDecisionRequestBase"
  //     properties:
  //       decisionDefinitionKey:
  //         ...
  //+  EvaluateDecisionRequestById:
  //+    type: object
  //+    allOf:
  //+      - $ref: "#/components/schemas/EvaluateDecisionRequestBase"
  //+    properties:
  //       decisionDefinitionId:
  //         ...
  //+  EvaluateDecisionRequestBase:
  //+    type: object
  //+    properties:
  //       variables:
  //         ...
  //       tenantId:
  //         ...
  //       ...

  return [
    // 1. Convert the main request to a oneOf union and define the first possible type.
    {
      // match the start of the EvaluateDecisionRequest object
      from: /    EvaluateDecisionRequest:\n      type: object/m,

      // append the `oneOf` declaration to define the union type.
      //   Then a definition for the first possible type, so that it includes the `decisionDefinitionKey` property.
      to: `    EvaluateDecisionRequest:
      type: object
      oneOf:
        - $ref: "#/components/schemas/EvaluateDecisionRequestByKey"
        - $ref: "#/components/schemas/EvaluateDecisionRequestById"
    EvaluateDecisionRequestByKey:
      type: object
      allOf:
        - $ref: "#/components/schemas/EvaluateDecisionRequestBase"`,
    },

    // 2. Define the second possible type, to include the `decisionDefinitionId` property.
    {
      // match the start of the EvaluateDecisionRequestByKey object, up until the `decisionDefinitionId` property (non-inclusive).
      from: /    EvaluateDecisionRequestByKey:[\s\S]*?(?=\s*decisionDefinitionId:)/m,

      // append the second possible type definition, so that it includes the `decisionDefinitionId`.
      to: `$&
    EvaluateDecisionRequestById:
      type: object
      allOf:
        - $ref: "#/components/schemas/EvaluateDecisionRequestBase"
      properties:`,
    },

    // 3. Define a base type to contain the common properties, starting before the `variables` property.
    {
      // match the start of the CreateProcessInstanceRequestById object, up until the `variables` property (non-inclusive).
      from: /    EvaluateDecisionRequestById:[\s\S]*?(?=\s*variables:)/m,
      // append the base type definition, so that it includes all remaining properties.
      to: `$&
    EvaluateDecisionRequestBase:
      type: object
      properties:`,
    },
  ];
}

function addAlphaAdmonition() {
  // This task is inherently repeatable, because the `match` is replaced by something that won't match again.

  return [
    {
      // Matches an empty line, followed by an alpha warning, with these capture groups:
      //  $1: the blank line before the warning
      //  $2: the indentation before the warning
      //  $3: the warning text
      from: /^([^\S\n]*\n)([^\S\n]*)(This endpoint is an alpha feature and may be subject to change\n[\s]*in future releases.\n)/gm,

      // Surrounds the warning with `:::note` and `:::`, creating an admonition.
      to: "$1$2:::note\n$2$3$2:::\n",
    },
  ];
}

function addFrequentlyLinkedDocs(version) {
  // This task is inherently repeatable, because the `match` is replaced by something that won't match again.

  // The path to the alpha doc varies by version.
  const otherAlphaPaths = {
    8.6: "/reference/alpha-features.md",
    8.5: "/reference/alpha-features.md",
    8.4: "/reference/alpha-features.md",
    8.3: "/reference/alpha-features.md",
  };
  const alphaPath =
    otherAlphaPaths[version] ||
    "/components/early-access/alpha/alpha-features.md";

  // Adds links to the Camunda Alpha REST API documentation, so that they don't have to live in the upstream spec.
  return [
    {
      from: /The Orchestration cluster API \(REST\) Overview page/g,
      to: "The [Orchestration cluster API (REST) Overview page](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md#query-api)",
    },
    {
      from: /endpoint is an alpha feature/g,
      to: `endpoint is an [alpha feature](${alphaPath})`,
    },
  ];
}

// Make path parameters more readable by flattening them into inline primitive types, so they display as `string<ProcessInstanceKey>` instead of `object`.
// Flattens $ref-based path parameter schemas into inline primitive types
// by resolving one level of allOf inheritance. Preserves format, pattern, and description.
// This is necessary because the Camunda REST API uses schema inheritance to express domain types for
// Camunda keys, which results in a complex schema structure
//   e.g. { $ref: "#/components/schemas/ProcessInstanceKey" },
//          allOf: [ { $ref: "#/components/schemas/CamundaKey
// If we don't flatten this, the docs say it is a complex object, which is not true.
// We also modify the format to include the schema name, so that it is clear what domain type it is.
//   e.g. format: "string<ProcessInstanceKey>"
// Otherwise Docusaurus will not render the type correctly, and it will be displayed as the generic `Camunda Key`
function flattenPathParams(originalSpec) {
  const doc = yaml.load(originalSpec);

  const schemas = doc.components?.schemas || {};

  // Traverse all paths and operations
  for (const path of Object.values(doc.paths || {})) {
    for (const operation of Object.values(path)) {
      const parameters = operation.parameters;
      if (!Array.isArray(parameters)) continue;

      for (const param of parameters) {
        if (param.schema && param.schema.$ref) {
          const ref = param.schema.$ref;
          const match = ref.match(/^#\/components\/schemas\/(.+)$/);
          if (!match) continue;

          const schemaName = match[1];
          const schema = schemas[schemaName];
          if (!schema || !schema.allOf) continue;

          // Flatten one level of allOf: [ {$ref}, {description} ]
          const refSchema = schema.allOf.find((entry) => entry.$ref);
          const extraProps = schema.allOf.find(
            (entry) => entry.description || entry.type
          );

          const baseMatch = refSchema?.$ref?.match(
            /^#\/components\/schemas\/(.+)$/
          );
          if (!baseMatch) continue;

          const baseSchema = schemas[baseMatch[1]];
          if (!baseSchema) continue;

          // Merge baseSchema + extraProps
          const merged = {
            type: baseSchema.type,
            format: `string<${schemaName}>`, // baseSchema.format,
            pattern: baseSchema.pattern,
            example: baseSchema.example,
            minLength: baseSchema.minLength,
            maxLength: baseSchema.maxLength,
            description: extraProps?.description || baseSchema.description,
          };

          // Replace the $ref schema with the flattened one
          param.schema = merged;
        }
      }
    }
  }

  return [
    {
      from: /[\s\S]*/, // match entire document
      to: yaml.dump(doc, { lineWidth: -1 }), // prevent line wrapping
    },
  ];
}

/**
 * Get rid of the constraints on CamundaKey schemas. We don't want to clutter the docs with these constraints,
 * but we do want them to be present in the schema for validation purposes.
 */
function stripCamundaKeyConstraintsForDocs(originalSpec) {
  const doc = yaml.load(originalSpec);

  const camundaKey = doc.components?.schemas?.CamundaKey;
  if (camundaKey) {
    delete camundaKey.pattern;
    delete camundaKey.minLength;
    delete camundaKey.maxLength;
  }

  return [
    {
      from: /[\s\S]*/, // match entire document
      to: yaml.dump(doc, { lineWidth: -1 }),
    },
  ];
}

/**
 * Add a documentation note for eventual consistency to all endpoints that need it.
 */
function addEventualConsistencyAdmonition(specFilePath) {
  try {
    // Read and parse the YAML file
    const fileContents = fs.readFileSync(specFilePath, "utf8");
    const spec = yaml.load(fileContents);
    let admonitionsAdded = 0;
    // Process each path and operation for eventual consistency
    if (spec.paths) {
      Object.keys(spec.paths).forEach((pathKey) => {
        const pathItem = spec.paths[pathKey];

        // Check if the path item itself has the eventual consistency marker
        const pathHasEventualConsistency =
          pathItem["x-eventually-consistent"] === true;

        Object.keys(pathItem).forEach((method) => {
          const operation = pathItem[method];

          // Skip non-operation properties (like x-eventually-consistent, parameters, etc.)
          if (
            !operation ||
            typeof operation !== "object" ||
            ![
              "get",
              "post",
              "put",
              "patch",
              "delete",
              "options",
              "head",
              "trace",
            ].includes(method)
          ) {
            return;
          }

          // Check if this operation has the eventual consistency marker (either on the operation or inherited from path)
          const operationHasEventualConsistency =
            operation["x-eventually-consistent"] === true;

          if (operationHasEventualConsistency || pathHasEventualConsistency) {
            // Add the admonition to the description
            const admonition =
              "\n\n:::tip\nThis endpoint provides eventually consistent data. There may be a slight delay between when data is written and when it becomes available for reading.\n:::\n";

            if (operation.description) {
              operation.description += admonition;
            } else {
              operation.description = admonition.trim();
            }
            admonitionsAdded++;
          }
        });
      });
    }

    // Write the updated spec back to the file
    const updatedYaml = yaml.dump(spec, {
      lineWidth: -1,
      noRefs: true,
      sortKeys: false,
    });
    fs.writeFileSync(specFilePath, updatedYaml, "utf8");

    console.log(
      `✅ Added ${admonitionsAdded} eventual consistency admonitions`
    );
  } catch (error) {
    console.error("❌ Error processing eventual consistency:", error);
  }
}

// Remove all vendor extensions recursively (x-eventually-consistent, x-semantic-type, etc.)
function removeVendorExtensions(specFilePath) {
  function recursivelyRemoveVendorExtension(obj) {
    if (obj && typeof obj === "object") {
      if (Array.isArray(obj)) {
        obj.forEach((item) => recursivelyRemoveVendorExtension(item));
      } else {
        Object.keys(obj).forEach((key) => {
          if (key.startsWith("x-")) {
            delete obj[key];
          } else {
            recursivelyRemoveVendorExtension(obj[key]);
          }
        });
      }
    }
  }

  try {
    // Read and parse the YAML file
    const fileContents = fs.readFileSync(specFilePath, "utf8");
    const spec = yaml.load(fileContents);

    recursivelyRemoveVendorExtension(spec);

    // Write the updated spec back to the file
    const updatedYaml = yaml.dump(spec, {
      lineWidth: -1,
      noRefs: true,
      sortKeys: false,
    });
    fs.writeFileSync(specFilePath, updatedYaml, "utf8");

    console.log("✅ Removed all vendor extensions");
  } catch (error) {
    console.error("❌ Error removing vendor extensions:", error);
  }
}

module.exports = {
  preGenerateDocs,
  postGenerateDocs,
};
