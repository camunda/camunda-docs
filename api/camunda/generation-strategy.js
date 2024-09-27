const removeDuplicateVersionBadge = require("../remove-duplicate-version-badge");
const replace = require("replace-in-file");
const outputDir = "docs/apis-tools/camunda-api-rest/specifications";
const specFile = "api/camunda/camunda-openapi.yaml";
const fs = require("fs");

function preGenerateDocs() {
  // Make this a repeatable task by bailing if the spec already contains our changes.
  const specContents = fs.readFileSync(specFile, "utf8");
  if (specContents.includes("CreateProcessInstanceRequestBase")) {
    console.log(
      "skipping because C8 spec file might already contain union types..."
    );
    return;
  }

  console.log("adjusting C8 spec file...");

  const specUpdates = [
    ...redefineCreateProcessInstanceRequest(),
    ...redefineEvaluateDecisionRequest(),
  ];

  replace.sync({
    files: specFile,
    from: specUpdates.map((x) => x.from),
    to: specUpdates.map((x) => x.to),
  });
}

function postGenerateDocs() {
  removeDuplicateVersionBadge(`${outputDir}/camunda-8-rest-api.info.mdx`);
}

function redefineCreateProcessInstanceRequest() {
  // Redefines the CreateProcessInstanceRequest schema to describe a union of two possible request bodies.
  //   This union type does not work upstream, but we can rewrite it here to more clearly describe the schema.

  // Before:
  // CreateProcessInstanceRequest:
  //   type: object
  //   properties:
  //     processDefinitionKey:
  //       ...
  //     processDefinitionId:
  //       ...
  //     processDefinitionVersion:
  //       ...
  //     variables:
  //       ...
  //     tenantId:
  //       ...
  //     ...

  // After:
  // CreateProcessInstanceRequest:
  //   type: object
  //   oneOf:
  //     - $ref: "#/components/schemas/CreateProcessInstanceRequestByKey"
  //     - $ref: "#/components/schemas/CreateProcessInstanceRequestById"
  // CreateProcessInstanceRequestByKey:
  //   type: object
  //   allOf:
  //     - $ref: "#/components/schemas/CreateProcessInstanceRequestBase"
  //   properties:
  //     processDefinitionKey:
  //       ...
  // CreateProcessInstanceRequestById:
  //   type: object
  //   allOf:
  //     - $ref: "#/components/schemas/CreateProcessInstanceRequestBase"
  //   properties:
  //     processDefinitionId:
  //       ...
  //     processDefinitionVersion:
  //       ...
  // CreateProcessInstanceRequestBase:
  //   type: object
  //   properties:
  //     variables:
  //       ...
  //     tenantId:
  //       ...
  //     ...

  return [
    // Convert the main request to a oneOf union and define the first possible type.
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

    // Define the second possible type, to include the `processDefinitionId` property.
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

    // Define a base type to contain the common properties, starting before the `variables` property.
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

function redefineEvaluateDecisionRequest() {
  return [];
}

module.exports = {
  outputDir,
  preGenerateDocs,
  postGenerateDocs,
};
