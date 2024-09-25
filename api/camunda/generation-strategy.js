const removeDuplicateVersionBadge = require("../remove-duplicate-version-badge");
const replace = require("replace-in-file");
const outputDir = "docs/apis-tools/camunda-api-rest/specifications";
const specFile = "api/camunda/camunda-openapi.yaml";

function preGenerateDocs() {
  console.log("adjusting spec file...");

  const specUpdates = [
    temporarilyAddCreateProcessInstanceExamples(),
    temporarilyAddEvaluateDecisionExamples(),
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

module.exports = {
  outputDir,
  preGenerateDocs,
  postGenerateDocs,
};

function temporarilyAddCreateProcessInstanceExamples() {
  // This is a temporary hack, to add example requests to the `Create Process Instance` endpoint.
  //   After the upcoming release, this will be incorporated into the source spec, but the source spec is currently frozen.
  return {
    from: /\$ref: "#\/components\/schemas\/CreateProcessInstanceRequest"\n      responses:/m,
    to: `$ref: "#/components/schemas/CreateProcessInstanceRequest"
            examples:
              "By process decision key":
                summary: "Create a process instance by processDefinitionKey."
                value:
                  processDefinitionKey: 12345
                  variables: {}
              "By BPMN process ID":
                summary: "Create a process instance by bpmnProcessID and version."
                value:
                  bpmnProcessId: "1234-5678"
                  version: 1
                  variables: {}
      responses:`,
  };
}

function temporarilyAddEvaluateDecisionExamples() {
  // This is a temporary hack, to add example requests to the `Evaluate Decision` endpoint.
  //   After the upcoming release, this will be incorporated into the source spec, but the source spec is currently frozen.
  return {
    from: /\$ref: "#\/components\/schemas\/EvaluateDecisionRequest"\n      responses:/m,
    to: `$ref: "#/components/schemas/EvaluateDecisionRequest"
            examples:
              "By decision key":
                summary: "Evaluate the decision by decisionKey."
                value:
                  decisionKey: 12345
                  variables: {}
              "By decision ID":
                summary: "Evaluate the decision by decisionId."
                value:
                  decisionId: "1234-5678"
                  variables: {}
      responses:`,
  };
}
