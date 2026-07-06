// Compilable usage examples for decision instances, requirements, documents, and other operations.
// These examples are type-checked during build to guard against API regressions.

import {
  createCamundaClient,
  type DecisionDefinitionKey,
  type DecisionEvaluationInstanceKey,
  type DecisionEvaluationKey,
  type DecisionRequirementsKey,
  type DocumentId,
  type JobKey,
  type UserTaskKey,
} from '@camunda8/orchestration-cluster-api';

//#region GetDecisionDefinitionXml
async function getDecisionDefinitionXmlExample(decisionDefinitionKey: DecisionDefinitionKey) {
  const camunda = createCamundaClient();

  const xml = await camunda.getDecisionDefinitionXml(
    { decisionDefinitionKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  console.log(`XML length: ${JSON.stringify(xml).length}`);
}
//#endregion GetDecisionDefinitionXml

//#region GetDecisionInstance
async function getDecisionInstanceExample(
  decisionEvaluationInstanceKey: DecisionEvaluationInstanceKey
) {
  const camunda = createCamundaClient();

  const instance = await camunda.getDecisionInstance(
    { decisionEvaluationInstanceKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  console.log(`Decision: ${instance.decisionDefinitionId}`);
}
//#endregion GetDecisionInstance

//#region SearchDecisionInstances
async function searchDecisionInstancesExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchDecisionInstances(
    {
      page: { limit: 10 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const instance of result.items ?? []) {
    console.log(`${instance.decisionEvaluationKey}: ${instance.decisionDefinitionId}`);
  }
}
//#endregion SearchDecisionInstances

//#region DeleteDecisionInstance
async function deleteDecisionInstanceExample(decisionEvaluationKey: DecisionEvaluationKey) {
  const camunda = createCamundaClient();

  await camunda.deleteDecisionInstance({ decisionEvaluationKey });
}
//#endregion DeleteDecisionInstance

//#region GetDecisionRequirements
async function getDecisionRequirementsExample(decisionRequirementsKey: DecisionRequirementsKey) {
  const camunda = createCamundaClient();

  const requirements = await camunda.getDecisionRequirements(
    { decisionRequirementsKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  console.log(`Requirements: ${requirements.decisionRequirementsId}`);
}
//#endregion GetDecisionRequirements

//#region GetDecisionRequirementsXml
async function getDecisionRequirementsXmlExample(decisionRequirementsKey: DecisionRequirementsKey) {
  const camunda = createCamundaClient();

  const xml = await camunda.getDecisionRequirementsXml(
    { decisionRequirementsKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  console.log(`XML length: ${JSON.stringify(xml).length}`);
}
//#endregion GetDecisionRequirementsXml

//#region SearchDecisionRequirements
async function searchDecisionRequirementsExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchDecisionRequirements(
    {
      page: { limit: 10 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const req of result.items ?? []) {
    console.log(`${req.decisionRequirementsKey}: ${req.decisionRequirementsId}`);
  }
}
//#endregion SearchDecisionRequirements

//#region CreateDocumentLink
async function createDocumentLinkExample(documentId: DocumentId) {
  const camunda = createCamundaClient();

  const link = await camunda.createDocumentLink({
    documentId,
    timeToLive: 3600000,
  });

  console.log(`Document link: ${link.url}`);
}
//#endregion CreateDocumentLink

//#region DeleteDocument
async function deleteDocumentExample(documentId: DocumentId) {
  const camunda = createCamundaClient();

  await camunda.deleteDocument({ documentId });
}
//#endregion DeleteDocument

//#region ThrowJobError
async function throwJobErrorExample(jobKey: JobKey) {
  const camunda = createCamundaClient();

  await camunda.throwJobError({
    jobKey,
    errorCode: 'PAYMENT_FAILED',
    errorMessage: 'Payment provider returned error',
  });
}
//#endregion ThrowJobError

//#region UpdateJob
async function updateJobExample(jobKey: JobKey) {
  const camunda = createCamundaClient();

  await camunda.updateJob({
    jobKey,
    changeset: { retries: 5, timeout: 60000 },
  });
}
//#endregion UpdateJob

//#region SearchJobs
async function searchJobsExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchJobs(
    {
      filter: { type: 'payment-processing', state: 'CREATED' },
      page: { limit: 10 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const job of result.items ?? []) {
    console.log(`Job ${job.jobKey}: ${job.type} (${job.state})`);
  }
}
//#endregion SearchJobs

//#region GetUserTask
async function getUserTaskExample(userTaskKey: UserTaskKey) {
  const camunda = createCamundaClient();

  const task = await camunda.getUserTask({ userTaskKey }, { consistency: { waitUpToMs: 5000 } });

  console.log(`Task: ${task.name} (${task.state})`);
}
//#endregion GetUserTask

//#region UpdateUserTask
async function updateUserTaskExample(userTaskKey: UserTaskKey) {
  const camunda = createCamundaClient();

  await camunda.updateUserTask({
    userTaskKey,
    changeset: {
      candidateUsers: ['alice', 'bob'],
      dueDate: '2025-12-31T23:59:59Z',
      priority: 80,
    },
  });
}
//#endregion UpdateUserTask

//#region GetUserTaskForm
async function getUserTaskFormExample(userTaskKey: UserTaskKey) {
  const camunda = createCamundaClient();

  const form = await camunda.getUserTaskForm(
    { userTaskKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  if (form) {
    console.log(`Form key: ${form.formKey}`);
  }
}
//#endregion GetUserTaskForm

//#region SearchUserTaskVariables
async function searchUserTaskVariablesExample(userTaskKey: UserTaskKey) {
  const camunda = createCamundaClient();

  const result = await camunda.searchUserTaskVariables(
    { userTaskKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const variable of result.items ?? []) {
    console.log(`${variable.name} = ${variable.value}`);
  }
}
//#endregion SearchUserTaskVariables

//#region SearchUserTaskAuditLogs
async function searchUserTaskAuditLogsExample(userTaskKey: UserTaskKey) {
  const camunda = createCamundaClient();

  const result = await camunda.searchUserTaskAuditLogs(
    { userTaskKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const log of result.items ?? []) {
    console.log(`Audit: ${log.operationType} at ${log.timestamp}`);
  }
}
//#endregion SearchUserTaskAuditLogs

//#region CreateDocument
async function createDocumentExample() {
  const camunda = createCamundaClient();

  const file = new Blob(['Hello, world!'], { type: 'text/plain' });

  const result = await camunda.createDocument({
    file,
    metadata: { fileName: 'hello.txt' },
  });

  console.log(`Document ID: ${result.documentId}`);
}
//#endregion CreateDocument

//#region CreateDocuments
async function createDocumentsExample() {
  const camunda = createCamundaClient();

  const file1 = new Blob(['File one'], { type: 'text/plain' });
  const file2 = new Blob(['File two'], { type: 'text/plain' });

  const result = await camunda.createDocuments({
    files: [file1, file2],
    metadataList: [{ fileName: 'one.txt' }, { fileName: 'two.txt' }],
  });

  for (const doc of result.createdDocuments ?? []) {
    console.log(`Created: ${doc.documentId}`);
  }
}
//#endregion CreateDocuments

//#region GetDocument
async function getDocumentExample(documentId: DocumentId) {
  const camunda = createCamundaClient();

  await camunda.getDocument({ documentId });

  console.log(`Downloaded document: ${documentId}`);
}
//#endregion GetDocument

//#region SearchUserTaskEffectiveVariables
async function searchUserTaskEffectiveVariablesExample(userTaskKey: UserTaskKey) {
  const camunda = createCamundaClient();

  const result = await camunda.searchUserTaskEffectiveVariables(
    { userTaskKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const variable of result.items ?? []) {
    console.log(`${variable.name} = ${variable.value}`);
  }
}
//#endregion SearchUserTaskEffectiveVariables

// Suppress "declared but never read"
void getDecisionDefinitionXmlExample;
void getDecisionInstanceExample;
void searchDecisionInstancesExample;
void deleteDecisionInstanceExample;
void getDecisionRequirementsExample;
void getDecisionRequirementsXmlExample;
void searchDecisionRequirementsExample;
void createDocumentLinkExample;
void deleteDocumentExample;
void throwJobErrorExample;
void updateJobExample;
void searchJobsExample;
void getUserTaskExample;
void updateUserTaskExample;
void getUserTaskFormExample;
void searchUserTaskVariablesExample;
void searchUserTaskAuditLogsExample;
void createDocumentExample;
void createDocumentsExample;
void getDocumentExample;
void searchUserTaskEffectiveVariablesExample;
