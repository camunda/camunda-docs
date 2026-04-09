// Compilable usage examples for deployment operations.
// These examples are type-checked during build to guard against API regressions.

import {
  createCamundaClient,
  type ProcessDefinitionKey,
} from '@camunda8/orchestration-cluster-api';

//#region CreateDeployment
async function createDeploymentExample() {
  const camunda = createCamundaClient();

  const file = new File(['<xml/>'], 'order-process.bpmn', { type: 'application/xml' });

  const result = await camunda.createDeployment({
    resources: [file],
  });

  console.log(`Deployment key: ${result.deploymentKey}`);
  for (const process of result.processes ?? []) {
    console.log(`  Process: ${process.processDefinitionId} v${process.processDefinitionVersion}`);
  }
}
//#endregion CreateDeployment

//#region DeleteResource
async function deleteResourceExample(resourceKey: ProcessDefinitionKey) {
  const camunda = createCamundaClient();

  // Use a process definition key as a resource key for deletion
  await camunda.deleteResource({
    resourceKey,
  });
}
//#endregion DeleteResource

// Suppress "declared but never read"
void createDeploymentExample;
void deleteResourceExample;
