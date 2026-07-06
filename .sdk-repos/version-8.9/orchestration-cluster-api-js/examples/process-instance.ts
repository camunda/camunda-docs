// Compilable usage examples for process instance operations.
// These examples are type-checked during build to guard against API regressions.

import {
  createCamundaClient,
  type ProcessDefinitionId,
  type ProcessDefinitionKey,
  type ProcessInstanceKey,
} from '@camunda8/orchestration-cluster-api';

//#region CreateProcessInstanceById
async function createProcessInstanceByIdExample(processDefinitionId: ProcessDefinitionId) {
  const camunda = createCamundaClient();

  const result = await camunda.createProcessInstance({
    processDefinitionId,
    variables: {
      orderId: 'ORD-12345',
      amount: 99.95,
    },
  });

  console.log(`Started process instance: ${result.processInstanceKey}`);
}
//#endregion CreateProcessInstanceById

//#region CreateProcessInstanceByKey
async function createProcessInstanceByKeyExample(processDefinitionKey: ProcessDefinitionKey) {
  const camunda = createCamundaClient();

  // Key from a previous API response (e.g. deployment)
  const result = await camunda.createProcessInstance({
    processDefinitionKey,
    variables: {
      orderId: 'ORD-12345',
      amount: 99.95,
    },
  });

  console.log(`Started process instance: ${result.processInstanceKey}`);
}
//#endregion CreateProcessInstanceByKey

//#region CancelProcessInstance
async function cancelProcessInstanceExample(processDefinitionId: ProcessDefinitionId) {
  const camunda = createCamundaClient();

  // Create a process instance and get its key from the response
  const created = await camunda.createProcessInstance({
    processDefinitionId,
  });

  // Cancel the process instance using the key from the creation response
  await camunda.cancelProcessInstance({
    processInstanceKey: created.processInstanceKey,
  });
}
//#endregion CancelProcessInstance

//#region GetProcessInstance
async function getProcessInstanceExample(processInstanceKey: ProcessInstanceKey) {
  const camunda = createCamundaClient();

  const instance = await camunda.getProcessInstance(
    { processInstanceKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  console.log(`State: ${instance.state}`);
  console.log(`Process: ${instance.processDefinitionId}`);
}
//#endregion GetProcessInstance

//#region SearchProcessInstances
async function searchProcessInstancesExample(processDefinitionId: ProcessDefinitionId) {
  const camunda = createCamundaClient();

  const result = await camunda.searchProcessInstances(
    {
      filter: { processDefinitionId },
      sort: [{ field: 'startDate', order: 'DESC' }],
      page: { limit: 10 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const instance of result.items ?? []) {
    console.log(`${instance.processInstanceKey}: ${instance.state}`);
  }
  console.log(`Total: ${result.page.totalItems}`);
}
//#endregion SearchProcessInstances

// Suppress "declared but never read"
void createProcessInstanceByIdExample;
void createProcessInstanceByKeyExample;
void cancelProcessInstanceExample;
void getProcessInstanceExample;
void searchProcessInstancesExample;
