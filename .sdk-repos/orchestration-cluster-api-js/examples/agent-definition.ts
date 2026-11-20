// Compilable usage examples for agent definition operations.
// These examples are type-checked during build to guard against API regressions.

import { type AgentDefinitionKey, createCamundaClient } from '@camunda8/orchestration-cluster-api';

//#region GetAgentDefinition
async function getAgentDefinitionExample(agentDefinitionKey: AgentDefinitionKey) {
  const camunda = createCamundaClient();

  const definition = await camunda.getAgentDefinition(
    { agentDefinitionKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  console.log(`Name: ${definition.name}`);
  console.log(`Type: ${definition.agentType}`);
  console.log(`Element: ${definition.elementId}`);
}
//#endregion GetAgentDefinition

//#region SearchAgentDefinitions
async function searchAgentDefinitionsExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchAgentDefinitions(
    {
      filter: { agentType: { $eq: 'AI_AGENT_TASK' } },
      sort: [{ field: 'name', order: 'ASC' }],
      page: { limit: 10 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const definition of result.items ?? []) {
    console.log(`${definition.agentDefinitionKey}: ${definition.name} (${definition.agentType})`);
  }
  console.log(`Total: ${result.page.totalItems}`);
}
//#endregion SearchAgentDefinitions

// Suppress "declared but never read"
void getAgentDefinitionExample;
void searchAgentDefinitionsExample;
