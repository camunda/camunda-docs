// Compilable usage examples for cluster variables, system configuration,
// global task listeners, clock, expression, and other admin operations.
// These examples are type-checked during build to guard against API regressions.

import {
  type AuditLogKey,
  createCamundaClient,
  type GlobalListenerId,
  type ProcessDefinitionKey,
  type TenantId,
} from '@camunda8/orchestration-cluster-api';

//#region GetGlobalClusterVariable
async function getGlobalClusterVariableExample() {
  const camunda = createCamundaClient();

  const variable = await camunda.getGlobalClusterVariable(
    { name: 'feature-flags' },
    { consistency: { waitUpToMs: 5000 } }
  );

  console.log(`${variable.name} = ${variable.value}`);
}
//#endregion GetGlobalClusterVariable

//#region CreateGlobalClusterVariable
async function createGlobalClusterVariableExample() {
  const camunda = createCamundaClient();

  const result = await camunda.createGlobalClusterVariable({
    name: 'feature-flags',
    value: { darkMode: true },
  });

  console.log(`Created: ${result.name}`);
}
//#endregion CreateGlobalClusterVariable

//#region UpdateGlobalClusterVariable
async function updateGlobalClusterVariableExample() {
  const camunda = createCamundaClient();

  await camunda.updateGlobalClusterVariable({
    name: 'feature-flags',
    value: { darkMode: false },
  });
}
//#endregion UpdateGlobalClusterVariable

//#region DeleteGlobalClusterVariable
async function deleteGlobalClusterVariableExample() {
  const camunda = createCamundaClient();

  await camunda.deleteGlobalClusterVariable({ name: 'feature-flags' });
}
//#endregion DeleteGlobalClusterVariable

//#region GetTenantClusterVariable
async function getTenantClusterVariableExample(tenantId: TenantId) {
  const camunda = createCamundaClient();

  const variable = await camunda.getTenantClusterVariable(
    {
      tenantId,
      name: 'config',
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  console.log(`${variable.name} = ${variable.value}`);
}
//#endregion GetTenantClusterVariable

//#region CreateTenantClusterVariable
async function createTenantClusterVariableExample(tenantId: TenantId) {
  const camunda = createCamundaClient();

  const result = await camunda.createTenantClusterVariable({
    tenantId,
    name: 'config',
    value: { region: 'us-east-1' },
  });

  console.log(`Created: ${result.name}`);
}
//#endregion CreateTenantClusterVariable

//#region UpdateTenantClusterVariable
async function updateTenantClusterVariableExample(tenantId: TenantId) {
  const camunda = createCamundaClient();

  await camunda.updateTenantClusterVariable({
    tenantId,
    name: 'config',
    value: { region: 'eu-west-1' },
  });
}
//#endregion UpdateTenantClusterVariable

//#region DeleteTenantClusterVariable
async function deleteTenantClusterVariableExample(tenantId: TenantId) {
  const camunda = createCamundaClient();

  await camunda.deleteTenantClusterVariable({
    tenantId,
    name: 'config',
  });
}
//#endregion DeleteTenantClusterVariable

//#region SearchClusterVariables
async function searchClusterVariablesExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchClusterVariables(
    {
      page: { limit: 10 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const variable of result.items ?? []) {
    console.log(`${variable.name} = ${variable.value}`);
  }
}
//#endregion SearchClusterVariables

//#region CreateGlobalTaskListener
async function createGlobalTaskListenerExample(id: GlobalListenerId) {
  const camunda = createCamundaClient();

  const result = await camunda.createGlobalTaskListener({
    id,
    eventTypes: ['completing'],
    type: 'audit-log-listener',
  });

  console.log(`Created listener: ${result.id}`);
}
//#endregion CreateGlobalTaskListener

//#region GetGlobalTaskListener
async function getGlobalTaskListenerExample(id: GlobalListenerId) {
  const camunda = createCamundaClient();

  const listener = await camunda.getGlobalTaskListener(
    { id },
    { consistency: { waitUpToMs: 5000 } }
  );

  console.log(`Listener: ${listener.type} (${listener.eventTypes})`);
}
//#endregion GetGlobalTaskListener

//#region UpdateGlobalTaskListener
async function updateGlobalTaskListenerExample(id: GlobalListenerId) {
  const camunda = createCamundaClient();

  await camunda.updateGlobalTaskListener({
    id,
    eventTypes: ['completing'],
    type: 'updated-audit-listener',
  });
}
//#endregion UpdateGlobalTaskListener

//#region DeleteGlobalTaskListener
async function deleteGlobalTaskListenerExample(id: GlobalListenerId) {
  const camunda = createCamundaClient();

  await camunda.deleteGlobalTaskListener({
    id,
  });
}
//#endregion DeleteGlobalTaskListener

//#region SearchGlobalTaskListeners
async function searchGlobalTaskListenersExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchGlobalTaskListeners(
    {
      page: { limit: 10 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const listener of result.items ?? []) {
    console.log(`${listener.id}: ${listener.type} (${listener.eventTypes})`);
  }
}
//#endregion SearchGlobalTaskListeners

//#region GetLicense
async function getLicenseExample() {
  const camunda = createCamundaClient();

  const license = await camunda.getLicense();

  console.log(`License type: ${license.validLicense}`);
}
//#endregion GetLicense

//#region GetSystemConfiguration
async function getSystemConfigurationExample() {
  const camunda = createCamundaClient();

  const config = await camunda.getSystemConfiguration();

  console.log(`Configuration loaded: ${JSON.stringify(config)}`);
}
//#endregion GetSystemConfiguration

//#region GetAuthentication
async function getAuthenticationExample() {
  const camunda = createCamundaClient();

  const user = await camunda.getAuthentication();

  console.log(`Authenticated as: ${user.username}`);
}
//#endregion GetAuthentication

//#region GetStatus
async function getStatusExample() {
  const camunda = createCamundaClient();

  await camunda.getStatus();

  console.log('Cluster is healthy');
}
//#endregion GetStatus

//#region PinClock
async function pinClockExample() {
  const camunda = createCamundaClient();

  await camunda.pinClock({
    timestamp: 1735689599000,
  });

  console.log('Clock pinned');
}
//#endregion PinClock

//#region ResetClock
async function resetClockExample() {
  const camunda = createCamundaClient();

  await camunda.resetClock();

  console.log('Clock reset');
}
//#endregion ResetClock

//#region EvaluateConditionals
async function evaluateConditionalsExample(tenantId: TenantId) {
  const camunda = createCamundaClient();

  const result = await camunda.evaluateConditionals({
    variables: { orderReady: true },
    tenantId,
  });

  console.log(`Evaluated conditionals: ${JSON.stringify(result)}`);
}
//#endregion EvaluateConditionals

//#region EvaluateExpression
async function evaluateExpressionExample() {
  const camunda = createCamundaClient();

  const result = await camunda.evaluateExpression({
    expression: '= x + y',
    variables: { x: 10, y: 20 },
  });

  console.log(`Result: ${result.result}`);
}
//#endregion EvaluateExpression

//#region GetResource
async function getResourceExample(resourceKey: ProcessDefinitionKey) {
  const camunda = createCamundaClient();

  const resource = await camunda.getResource({
    resourceKey,
  });

  console.log(`Resource: ${resource.resourceName} (${resource.resourceId})`);
}
//#endregion GetResource

//#region GetResourceContent
async function getResourceContentExample(resourceKey: ProcessDefinitionKey) {
  const camunda = createCamundaClient();

  const content = await camunda.getResourceContent({
    resourceKey,
  });

  console.log(`Content retrieved (type: ${typeof content})`);
}
//#endregion GetResourceContent

//#region GetUsageMetrics
async function getUsageMetricsExample() {
  const camunda = createCamundaClient();

  const metrics = await camunda.getUsageMetrics(
    {
      startTime: '2025-01-01T00:00:00Z',
      endTime: '2025-12-31T23:59:59Z',
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  console.log(`Usage metrics retrieved: ${JSON.stringify(metrics)}`);
}
//#endregion GetUsageMetrics

//#region SearchMessageSubscriptions
async function searchMessageSubscriptionsExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchMessageSubscriptions(
    {
      page: { limit: 10 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const sub of result.items ?? []) {
    console.log(`Subscription: ${sub.messageName}`);
  }
}
//#endregion SearchMessageSubscriptions

//#region SearchCorrelatedMessageSubscriptions
async function searchCorrelatedMessageSubscriptionsExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchCorrelatedMessageSubscriptions(
    {
      page: { limit: 10 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const sub of result.items ?? []) {
    console.log(`Correlated subscription: ${sub.messageName}`);
  }
}
//#endregion SearchCorrelatedMessageSubscriptions

//#region GetAuditLog
async function getAuditLogExample(auditLogKey: AuditLogKey) {
  const camunda = createCamundaClient();

  const log = await camunda.getAuditLog({ auditLogKey }, { consistency: { waitUpToMs: 5000 } });

  console.log(`Audit log: ${log.operationType}`);
}
//#endregion GetAuditLog

//#region SearchAuditLogs
async function searchAuditLogsExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchAuditLogs(
    {
      page: { limit: 10 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const log of result.items ?? []) {
    console.log(`${log.auditLogKey}: ${log.operationType}`);
  }
}
//#endregion SearchAuditLogs

//#region GetProcessInstanceStatisticsByError
async function getProcessInstanceStatisticsByErrorExample() {
  const camunda = createCamundaClient();

  const result = await camunda.getProcessInstanceStatisticsByError(
    {},
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const stat of result.items ?? []) {
    console.log(`Error: ${stat.errorMessage}, count: ${stat.activeInstancesWithErrorCount}`);
  }
}
//#endregion GetProcessInstanceStatisticsByError

//#region GetProcessInstanceStatisticsByDefinition
async function getProcessInstanceStatisticsByDefinitionExample() {
  const camunda = createCamundaClient();

  const result = await camunda.getProcessInstanceStatisticsByDefinition(
    {
      filter: {
        errorHashCode: 12345,
      },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const stat of result.items ?? []) {
    console.log(
      `Definition ${stat.processDefinitionId}: ${stat.activeInstancesWithErrorCount} incidents`
    );
  }
}
//#endregion GetProcessInstanceStatisticsByDefinition

//#region GetJobErrorStatistics
async function getJobErrorStatisticsExample() {
  const camunda = createCamundaClient();

  const result = await camunda.getJobErrorStatistics(
    {
      filter: {
        from: '2025-01-01T00:00:00Z',
        to: '2025-12-31T23:59:59Z',
        jobType: 'payment-processing',
      },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const stat of result.items ?? []) {
    console.log(`Error: ${stat.errorMessage}, workers: ${stat.workers}`);
  }
}
//#endregion GetJobErrorStatistics

//#region GetJobTimeSeriesStatistics
async function getJobTimeSeriesStatisticsExample() {
  const camunda = createCamundaClient();

  const result = await camunda.getJobTimeSeriesStatistics(
    {
      filter: {
        from: '2025-01-01T00:00:00Z',
        to: '2025-12-31T23:59:59Z',
        jobType: 'payment-processing',
      },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const point of result.items ?? []) {
    console.log(`Time: ${point.time}, created: ${point.created.count}`);
  }
}
//#endregion GetJobTimeSeriesStatistics

//#region GetJobTypeStatistics
async function getJobTypeStatisticsExample() {
  const camunda = createCamundaClient();

  const result = await camunda.getJobTypeStatistics({}, { consistency: { waitUpToMs: 5000 } });

  for (const stat of result.items ?? []) {
    console.log(`Type: ${stat.jobType}, workers: ${stat.workers}`);
  }
}
//#endregion GetJobTypeStatistics

//#region GetJobWorkerStatistics
async function getJobWorkerStatisticsExample() {
  const camunda = createCamundaClient();

  const result = await camunda.getJobWorkerStatistics(
    {
      filter: {
        from: '2025-01-01T00:00:00Z',
        to: '2025-12-31T23:59:59Z',
        jobType: 'payment-processing',
      },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const stat of result.items ?? []) {
    console.log(`Worker: ${stat.worker}, completed: ${stat.completed.count}`);
  }
}
//#endregion GetJobWorkerStatistics

//#region GetGlobalJobStatistics
async function getGlobalJobStatisticsExample() {
  const camunda = createCamundaClient();

  const result = await camunda.getGlobalJobStatistics(
    {
      from: '2025-01-01T00:00:00Z',
      to: '2025-12-31T23:59:59Z',
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  console.log(`Statistics retrieved: ${JSON.stringify(result)}`);
}
//#endregion GetGlobalJobStatistics

// Suppress "declared but never read"
void getGlobalClusterVariableExample;
void createGlobalClusterVariableExample;
void updateGlobalClusterVariableExample;
void deleteGlobalClusterVariableExample;
void getTenantClusterVariableExample;
void createTenantClusterVariableExample;
void updateTenantClusterVariableExample;
void deleteTenantClusterVariableExample;
void searchClusterVariablesExample;
void createGlobalTaskListenerExample;
void getGlobalTaskListenerExample;
void updateGlobalTaskListenerExample;
void deleteGlobalTaskListenerExample;
void searchGlobalTaskListenersExample;
void getLicenseExample;
void getSystemConfigurationExample;
void getAuthenticationExample;
void getStatusExample;
void pinClockExample;
void resetClockExample;
void evaluateConditionalsExample;
void evaluateExpressionExample;
void getResourceExample;
void getResourceContentExample;
void getUsageMetricsExample;
void searchMessageSubscriptionsExample;
void searchCorrelatedMessageSubscriptionsExample;
void getAuditLogExample;
void searchAuditLogsExample;
void getProcessInstanceStatisticsByErrorExample;
void getProcessInstanceStatisticsByDefinitionExample;
void getJobErrorStatisticsExample;
void getJobTimeSeriesStatisticsExample;
void getJobTypeStatisticsExample;
void getJobWorkerStatisticsExample;
void getGlobalJobStatisticsExample;
