const removeDuplicateVersionBadge = require("../remove-duplicate-version-badge");
const fs = require("fs");

function preGenerateDocs(config) {
  const originalSpec = fs.readFileSync(config.specPath, "utf8");

  console.log("adjusting C8 spec file...");

  const specUpdates = [
    ...addDisclaimer(originalSpec),
    ...redefineCreateProcessInstanceRequest(originalSpec),
    ...redefineEvaluateDecisionRequest(originalSpec),
    ...addAlphaAdmonition(), // needs to go before addFrequentlyLinkedDocs
    ...addFrequentlyLinkedDocs(config.version),
  ];

  let updatedSpec = originalSpec;

  for (const update of specUpdates) {
    updatedSpec = updatedSpec.replace(update.from, update.to);
  }

  fs.writeFileSync(config.specPath, updatedSpec);
}

function postGenerateDocs(config) {
  removeDuplicateVersionBadge(
    `${config.outputDir}/camunda-8-rest-api.info.mdx`
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
      to: "The [Orchestration cluster API (REST) Overview page](/apis-tools/camunda-api-rest/camunda-api-rest-overview.md#query-api)",
    },
    {
      from: /endpoint is an alpha feature/g,
      to: `endpoint is an [alpha feature](${alphaPath})`,
    },
  ];
}

module.exports = {
  preGenerateDocs,
  postGenerateDocs,
};
