// Compilable usage examples for agent instance operations.
// These examples are type-checked during build to guard against API regressions.

import {
  type AgentInstanceKey,
  createCamundaClient,
  type ElementInstanceKey,
} from "@camunda8/orchestration-cluster-api";

//#region GetAgentInstance
async function getAgentInstanceExample(agentInstanceKey: AgentInstanceKey) {
  const camunda = createCamundaClient();

  const instance = await camunda.getAgentInstance(
    { agentInstanceKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  console.log(`Status: ${instance.status}`);
  console.log(`Element: ${instance.elementId}`);
}
//#endregion GetAgentInstance

//#region SearchAgentInstances
async function searchAgentInstancesExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchAgentInstances(
    {
      filter: { status: { $eq: "IDLE" } },
      sort: [{ field: "creationDate", order: "DESC" }],
      page: { limit: 10 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const instance of result.items ?? []) {
    console.log(`${instance.agentInstanceKey}: ${instance.status}`);
  }
  console.log(`Total: ${result.page.totalItems}`);
}
//#endregion SearchAgentInstances

//#region CreateAgentInstance
async function createAgentInstanceExample(
  elementInstanceKey: ElementInstanceKey
) {
  const camunda = createCamundaClient();

  const result = await camunda.createAgentInstance({
    elementInstanceKey,
    definition: {
      model: "gpt-4o",
      provider: "openai",
      systemPrompt: "You are a helpful assistant.",
    },
  });

  console.log(`Created agent instance: ${result.agentInstanceKey}`);
}
//#endregion CreateAgentInstance

//#region UpdateAgentInstance
async function updateAgentInstanceExample(agentInstanceKey: AgentInstanceKey) {
  const camunda = createCamundaClient();

  await camunda.updateAgentInstance({
    agentInstanceKey,
    status: "THINKING",
    metrics: {
      inputTokens: 150,
      outputTokens: 50,
      modelCalls: 1,
    },
  });

  console.log(`Updated agent instance: ${agentInstanceKey}`);
}
//#endregion UpdateAgentInstance

// Suppress "declared but never read"
void getAgentInstanceExample;
void searchAgentInstancesExample;
void createAgentInstanceExample;
void updateAgentInstanceExample;
