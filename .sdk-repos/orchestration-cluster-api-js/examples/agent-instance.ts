// Compilable usage examples for agent instance operations.
// These examples are type-checked during build to guard against API regressions.

import {
  type AgentInstanceKey,
  createCamundaClient,
  type ElementInstanceKey,
  type JobKey,
} from '@camunda8/orchestration-cluster-api';

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
      filter: { status: { $eq: 'IDLE' } },
      sort: [{ field: 'creationDate', order: 'DESC' }],
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
  elementInstanceKey: ElementInstanceKey,
  jobKey: JobKey,
  jobLease: string
) {
  const camunda = createCamundaClient();

  // The batch must open with a CONFIGURATION item; it establishes the model,
  // provider and system prompt for the instance.
  const result = await camunda.createAgentInstance({
    elementInstanceKey,
    jobKey,
    jobLease,
    history: [
      {
        historyItemId: 'configuration-1',
        loopIteration: 1,
        role: 'CONFIGURATION',
        content: [],
        producedAt: new Date().toISOString(),
        model: 'gpt-4o',
        provider: 'openai',
        systemPrompt: [{ contentType: 'TEXT', text: 'You are a helpful assistant.' }],
      },
    ],
  });

  console.log(`Created agent instance: ${result.agentInstanceKey}`);
}
//#endregion CreateAgentInstance

//#region UpdateAgentInstance
async function updateAgentInstanceExample(
  agentInstanceKey: AgentInstanceKey,
  elementInstanceKey: ElementInstanceKey,
  jobKey: JobKey,
  jobLease: string
) {
  const camunda = createCamundaClient();

  await camunda.updateAgentInstance({
    agentInstanceKey,
    elementInstanceKey,
    jobKey,
    jobLease,
    status: 'THINKING',
    history: [
      {
        historyItemId: 'assistant-1',
        loopIteration: 1,
        role: 'ASSISTANT',
        content: [{ contentType: 'TEXT', text: 'How can I help you?' }],
        producedAt: new Date().toISOString(),
        metrics: { inputTokens: 150, outputTokens: 50, durationMs: 820 },
      },
    ],
  });

  console.log(`Updated agent instance: ${agentInstanceKey}`);
}
//#endregion UpdateAgentInstance

//#region SearchAgentInstanceHistory
async function searchAgentInstanceHistoryExample(agentInstanceKey: AgentInstanceKey) {
  const camunda = createCamundaClient();

  const result = await camunda.searchAgentInstanceHistory(
    {
      agentInstanceKey,
      filter: { role: { $eq: 'ASSISTANT' } },
      sort: [{ field: 'producedAt', order: 'ASC' }],
      page: { limit: 20 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const item of result.items ?? []) {
    console.log(`${item.historyItemKey} (${item.role})`);
  }
  console.log(`Total: ${result.page.totalItems}`);
}
//#endregion SearchAgentInstanceHistory

// Suppress "declared but never read"
void getAgentInstanceExample;
void searchAgentInstancesExample;
void createAgentInstanceExample;
void updateAgentInstanceExample;
void searchAgentInstanceHistoryExample;
