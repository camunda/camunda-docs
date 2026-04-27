// Compilable usage examples for extended process instance, process definition, and variable operations.
// These examples are type-checked during build to guard against API regressions.

import {
  createCamundaClient,
  type ElementId,
  type ElementInstanceKey,
  type ProcessDefinitionId,
  type ProcessDefinitionKey,
  type ProcessInstanceKey,
  type VariableKey,
} from '@camunda8/orchestration-cluster-api';

//#region DeleteProcessInstance
async function deleteProcessInstanceExample(processInstanceKey: ProcessInstanceKey) {
  const camunda = createCamundaClient();

  await camunda.deleteProcessInstance({ processInstanceKey });
}
//#endregion DeleteProcessInstance

//#region MigrateProcessInstance
async function migrateProcessInstanceExample(
  processInstanceKey: ProcessInstanceKey,
  targetProcessDefinitionKey: ProcessDefinitionKey,
  sourceElementId: ElementId,
  targetElementId: ElementId
) {
  const camunda = createCamundaClient();

  await camunda.migrateProcessInstance({
    processInstanceKey,
    targetProcessDefinitionKey,
    mappingInstructions: [
      {
        sourceElementId,
        targetElementId,
      },
    ],
  });
}
//#endregion MigrateProcessInstance

//#region ModifyProcessInstance
async function modifyProcessInstanceExample(
  processInstanceKey: ProcessInstanceKey,
  elementId: ElementId,
  elementInstanceKey: ElementInstanceKey
) {
  const camunda = createCamundaClient();

  await camunda.modifyProcessInstance({
    processInstanceKey,
    activateInstructions: [{ elementId }],
    terminateInstructions: [{ elementInstanceKey }],
  });
}
//#endregion ModifyProcessInstance

//#region GetProcessInstanceStatistics
async function getProcessInstanceStatisticsExample(processInstanceKey: ProcessInstanceKey) {
  const camunda = createCamundaClient();

  const result = await camunda.getProcessInstanceStatistics(
    { processInstanceKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const stat of result.items ?? []) {
    console.log(`Element ${stat.elementId}: active=${stat.active}`);
  }
}
//#endregion GetProcessInstanceStatistics

//#region GetProcessInstanceSequenceFlows
async function getProcessInstanceSequenceFlowsExample(processInstanceKey: ProcessInstanceKey) {
  const camunda = createCamundaClient();

  const result = await camunda.getProcessInstanceSequenceFlows(
    { processInstanceKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const flow of result.items ?? []) {
    console.log(`Sequence flow: ${flow.sequenceFlowId}`);
  }
}
//#endregion GetProcessInstanceSequenceFlows

//#region GetProcessInstanceCallHierarchy
async function getProcessInstanceCallHierarchyExample(processInstanceKey: ProcessInstanceKey) {
  const camunda = createCamundaClient();

  const result = await camunda.getProcessInstanceCallHierarchy(
    { processInstanceKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  console.log(`Call hierarchy entries: ${result.length}`);
}
//#endregion GetProcessInstanceCallHierarchy

//#region SearchProcessInstanceIncidents
async function searchProcessInstanceIncidentsExample(processInstanceKey: ProcessInstanceKey) {
  const camunda = createCamundaClient();

  const result = await camunda.searchProcessInstanceIncidents(
    {
      processInstanceKey,
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const incident of result.items ?? []) {
    console.log(`Incident: ${incident.errorType} - ${incident.errorMessage}`);
  }
}
//#endregion SearchProcessInstanceIncidents

//#region ResolveProcessInstanceIncidents
async function resolveProcessInstanceIncidentsExample(processInstanceKey: ProcessInstanceKey) {
  const camunda = createCamundaClient();

  const result = await camunda.resolveProcessInstanceIncidents({ processInstanceKey });

  console.log(`Batch operation key: ${result.batchOperationKey}`);
}
//#endregion ResolveProcessInstanceIncidents

//#region GetProcessDefinition
async function getProcessDefinitionExample(processDefinitionKey: ProcessDefinitionKey) {
  const camunda = createCamundaClient();

  const definition = await camunda.getProcessDefinition(
    { processDefinitionKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  console.log(`Process: ${definition.processDefinitionId} v${definition.version}`);
}
//#endregion GetProcessDefinition

//#region GetProcessDefinitionXml
async function getProcessDefinitionXmlExample(processDefinitionKey: ProcessDefinitionKey) {
  const camunda = createCamundaClient();

  const xml = await camunda.getProcessDefinitionXml(
    { processDefinitionKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  console.log(`XML length: ${JSON.stringify(xml).length}`);
}
//#endregion GetProcessDefinitionXml

//#region SearchProcessDefinitions
async function searchProcessDefinitionsExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchProcessDefinitions(
    {
      page: { limit: 10 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const def of result.items ?? []) {
    console.log(`${def.processDefinitionKey}: ${def.processDefinitionId} v${def.version}`);
  }
}
//#endregion SearchProcessDefinitions

//#region GetProcessDefinitionStatistics
async function getProcessDefinitionStatisticsExample(processDefinitionKey: ProcessDefinitionKey) {
  const camunda = createCamundaClient();

  const result = await camunda.getProcessDefinitionStatistics(
    { processDefinitionKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const stat of result.items ?? []) {
    console.log(`Element ${stat.elementId}: active=${stat.active}`);
  }
}
//#endregion GetProcessDefinitionStatistics

//#region GetProcessDefinitionInstanceStatistics
async function getProcessDefinitionInstanceStatisticsExample() {
  const camunda = createCamundaClient();

  const result = await camunda.getProcessDefinitionInstanceStatistics(
    {},
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const stat of result.items ?? []) {
    console.log(
      `Definition ${stat.processDefinitionId}: ${stat.activeInstancesWithoutIncidentCount} active`
    );
  }
}
//#endregion GetProcessDefinitionInstanceStatistics

//#region GetProcessDefinitionInstanceVersionStatistics
async function getProcessDefinitionInstanceVersionStatisticsExample(
  processDefinitionId: ProcessDefinitionId
) {
  const camunda = createCamundaClient();

  const result = await camunda.getProcessDefinitionInstanceVersionStatistics(
    {
      filter: {
        processDefinitionId,
      },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const stat of result.items ?? []) {
    console.log(
      `Version ${stat.processDefinitionVersion}: ${stat.activeInstancesWithoutIncidentCount} active`
    );
  }
}
//#endregion GetProcessDefinitionInstanceVersionStatistics

//#region GetProcessDefinitionMessageSubscriptionStatistics
async function getProcessDefinitionMessageSubscriptionStatisticsExample() {
  const camunda = createCamundaClient();

  const result = await camunda.getProcessDefinitionMessageSubscriptionStatistics(
    {},
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const stat of result.items ?? []) {
    console.log(
      `Definition ${stat.processDefinitionId}: ${stat.activeSubscriptions} subscriptions`
    );
  }
}
//#endregion GetProcessDefinitionMessageSubscriptionStatistics

//#region GetStartProcessForm
async function getStartProcessFormExample(processDefinitionKey: ProcessDefinitionKey) {
  const camunda = createCamundaClient();

  const form = await camunda.getStartProcessForm(
    { processDefinitionKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  if (form) {
    console.log(`Form key: ${form.formKey}`);
  }
}
//#endregion GetStartProcessForm

//#region GetVariable
async function getVariableExample(variableKey: VariableKey) {
  const camunda = createCamundaClient();

  const variable = await camunda.getVariable(
    { variableKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  console.log(`${variable.name} = ${variable.value}`);
}
//#endregion GetVariable

//#region SearchVariables
async function searchVariablesExample(processInstanceKey: ProcessInstanceKey) {
  const camunda = createCamundaClient();

  const result = await camunda.searchVariables(
    {
      filter: {
        processInstanceKey,
      },
      page: { limit: 10 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const variable of result.items ?? []) {
    console.log(`${variable.name} = ${variable.value}`);
  }
}
//#endregion SearchVariables

//#region GetElementInstance
async function getElementInstanceExample(elementInstanceKey: ElementInstanceKey) {
  const camunda = createCamundaClient();

  const element = await camunda.getElementInstance(
    { elementInstanceKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  console.log(`Element: ${element.elementId} (${element.type})`);
}
//#endregion GetElementInstance

//#region SearchElementInstances
async function searchElementInstancesExample(processInstanceKey: ProcessInstanceKey) {
  const camunda = createCamundaClient();

  const result = await camunda.searchElementInstances(
    {
      filter: {
        processInstanceKey,
      },
      page: { limit: 10 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const element of result.items ?? []) {
    console.log(`${element.elementId}: ${element.type} (${element.state})`);
  }
}
//#endregion SearchElementInstances

//#region SearchElementInstanceIncidents
async function searchElementInstanceIncidentsExample(elementInstanceKey: ElementInstanceKey) {
  const camunda = createCamundaClient();

  const result = await camunda.searchElementInstanceIncidents(
    { elementInstanceKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const incident of result.items ?? []) {
    console.log(`Incident: ${incident.errorType}`);
  }
}
//#endregion SearchElementInstanceIncidents

//#region CreateElementInstanceVariables
async function createElementInstanceVariablesExample(elementInstanceKey: ElementInstanceKey) {
  const camunda = createCamundaClient();

  await camunda.createElementInstanceVariables({
    elementInstanceKey,
    variables: { orderId: 'ORD-12345', status: 'processing' },
  });
}
//#endregion CreateElementInstanceVariables

//#region ActivateAdHocSubProcessActivities
async function activateAdHocSubProcessActivitiesExample(
  adHocSubProcessInstanceKey: ElementInstanceKey,
  elementId: ElementId
) {
  const camunda = createCamundaClient();

  await camunda.activateAdHocSubProcessActivities({
    adHocSubProcessInstanceKey,
    elements: [{ elementId }],
  });
}
//#endregion ActivateAdHocSubProcessActivities

// Suppress "declared but never read"
void deleteProcessInstanceExample;
void migrateProcessInstanceExample;
void modifyProcessInstanceExample;
void getProcessInstanceStatisticsExample;
void getProcessInstanceSequenceFlowsExample;
void getProcessInstanceCallHierarchyExample;
void searchProcessInstanceIncidentsExample;
void resolveProcessInstanceIncidentsExample;
void getProcessDefinitionExample;
void getProcessDefinitionXmlExample;
void searchProcessDefinitionsExample;
void getProcessDefinitionStatisticsExample;
void getProcessDefinitionInstanceStatisticsExample;
void getProcessDefinitionInstanceVersionStatisticsExample;
void getProcessDefinitionMessageSubscriptionStatisticsExample;
void getStartProcessFormExample;
void getVariableExample;
void searchVariablesExample;
void getElementInstanceExample;
void searchElementInstancesExample;
void searchElementInstanceIncidentsExample;
void createElementInstanceVariablesExample;
void activateAdHocSubProcessActivitiesExample;
