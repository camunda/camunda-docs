// Compilable usage examples for decision operations.
// These examples are type-checked during build to guard against API regressions.

import {
  createCamundaClient,
  type DecisionDefinitionId,
  type DecisionDefinitionKey,
} from '@camunda8/orchestration-cluster-api';

//#region EvaluateDecisionById
async function evaluateDecisionByIdExample(decisionDefinitionId: DecisionDefinitionId) {
  const camunda = createCamundaClient();

  const result = await camunda.evaluateDecision({
    decisionDefinitionId,
    variables: {
      amount: 1000,
      invoiceCategory: 'Misc',
    },
  });

  console.log(`Decision: ${result.decisionDefinitionId}`);
  console.log(`Output: ${result.output}`);
}
//#endregion EvaluateDecisionById

//#region EvaluateDecisionByKey
async function evaluateDecisionByKeyExample(decisionDefinitionKey: DecisionDefinitionKey) {
  const camunda = createCamundaClient();

  const result = await camunda.evaluateDecision({
    decisionDefinitionKey,
    variables: {
      amount: 1000,
      invoiceCategory: 'Misc',
    },
  });

  console.log(`Decision output: ${result.output}`);
}
//#endregion EvaluateDecisionByKey

//#region GetDecisionDefinition
async function getDecisionDefinitionExample(decisionDefinitionKey: DecisionDefinitionKey) {
  const camunda = createCamundaClient();

  const definition = await camunda.getDecisionDefinition(
    { decisionDefinitionKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  console.log(`Decision: ${definition.decisionDefinitionId}`);
  console.log(`Version: ${definition.version}`);
}
//#endregion GetDecisionDefinition

//#region SearchDecisionDefinitions
async function searchDecisionDefinitionsExample(decisionDefinitionId: DecisionDefinitionId) {
  const camunda = createCamundaClient();

  const result = await camunda.searchDecisionDefinitions(
    {
      filter: { decisionDefinitionId },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const definition of result.items ?? []) {
    console.log(`${definition.decisionDefinitionId} v${definition.version}`);
  }
}
//#endregion SearchDecisionDefinitions

// Suppress "declared but never read"
void evaluateDecisionByIdExample;
void evaluateDecisionByKeyExample;
void getDecisionDefinitionExample;
void searchDecisionDefinitionsExample;
