---
title: "Class: CamundaClient"
sidebar_label: "CamundaClient"
mdx:
  format: md
---

# Class: CamundaClient

Defined in: [gen/CamundaClient.ts:1186](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1186)

## Constructors

### Constructor

```ts
new CamundaClient(opts): CamundaClient;
```

Defined in: [gen/CamundaClient.ts:1212](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1212)

#### Parameters

##### opts

[`CamundaOptions`](../interfaces/CamundaOptions.md) = `{}`

#### Returns

`CamundaClient`

## Accessors

### config

#### Get Signature

```ts
get config(): Readonly<CamundaConfig>;
```

Defined in: [gen/CamundaClient.ts:1330](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1330)

##### Returns

`Readonly`\<[`CamundaConfig`](../interfaces/CamundaConfig.md)\>

## Methods

### \_getSupportLogger()

```ts
_getSupportLogger(): SupportLogger;
```

Defined in: [gen/CamundaClient.ts:1459](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1459)

Internal accessor for support logger (no public API commitment yet).

#### Returns

[`SupportLogger`](../interfaces/SupportLogger.md)

---

### \_invokeWithRetry()

```ts
_invokeWithRetry<T>(op, opts): Promise<T>;
```

Defined in: [gen/CamundaClient.ts:1492](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1492)

Internal invocation helper to apply global backpressure gating + retry + normalization

#### Type Parameters

##### T

`T`

#### Parameters

##### op

() => `Promise`\<`T`\>

##### opts

###### classify?

(`e`) => `object`

###### exempt?

`boolean`

###### opId

`string`

#### Returns

`Promise`\<`T`\>

---

### activateAdHocSubProcessActivities()

```ts
activateAdHocSubProcessActivities(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:1578](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1578)

Activate activities within an ad-hoc sub-process

Activates selected activities within an ad-hoc sub-process identified by element ID.
The provided element IDs must exist within the ad-hoc sub-process instance identified by the
provided adHocSubProcessInstanceKey.

-

#### Parameters

##### input

[`activateAdHocSubProcessActivitiesInput`](../type-aliases/activateAdHocSubProcessActivitiesInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

activateAdHocSubProcessActivities

#### Tags

Ad-hoc sub-process

---

### activateJobs()

```ts
activateJobs(input): CancelablePromise<{
  jobs: EnrichedActivatedJob[];
}>;
```

Defined in: [gen/CamundaClient.ts:1641](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1641)

Activate jobs

Iterate through all known partitions and activate jobs up to the requested maximum.

-

#### Parameters

##### input

[`JobActivationRequest`](../type-aliases/JobActivationRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`jobs`: [`EnrichedActivatedJob`](../interfaces/EnrichedActivatedJob.md)[];
\}\>

#### Example

```ts
async function activateJobsExample() {
  const camunda = createCamundaClient();

  const result = await camunda.activateJobs({
    type: "payment-processing",
    timeout: 30000,
    maxJobsToActivate: 5,
  });

  for (const job of result.jobs) {
    console.log(`Job ${job.jobKey}: ${job.type}`);

    // Each enriched job has helper methods
    await job.complete({ paymentId: "PAY-123" });
  }
}
```

#### Operation Id

activateJobs

#### Tags

Job

---

### assignClientToGroup()

```ts
assignClientToGroup(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:1702](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1702)

Assign a client to a group

Assigns a client to a group, making it a member of the group.
Members of the group inherit the group authorizations, roles, and tenant assignments.

-

#### Parameters

##### input

[`assignClientToGroupInput`](../type-aliases/assignClientToGroupInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignClientToGroup

#### Tags

Group

---

### assignClientToTenant()

```ts
assignClientToTenant(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:1762](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1762)

Assign a client to a tenant

Assign the client to the specified tenant.
The client can then access tenant data and perform authorized actions.

-

#### Parameters

##### input

[`assignClientToTenantInput`](../type-aliases/assignClientToTenantInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignClientToTenant

#### Tags

Tenant

---

### assignGroupToTenant()

```ts
assignGroupToTenant(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:1822](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1822)

Assign a group to a tenant

Assigns a group to a specified tenant.
Group members (users, clients) can then access tenant data and perform authorized actions.

-

#### Parameters

##### input

[`assignGroupToTenantInput`](../type-aliases/assignGroupToTenantInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignGroupToTenant

#### Tags

Tenant

---

### assignMappingRuleToGroup()

```ts
assignMappingRuleToGroup(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:1880](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1880)

Assign a mapping rule to a group

Assigns a mapping rule to a group.

-

#### Parameters

##### input

[`assignMappingRuleToGroupInput`](../type-aliases/assignMappingRuleToGroupInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignMappingRuleToGroup

#### Tags

Group

---

### assignMappingRuleToTenant()

```ts
assignMappingRuleToTenant(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:1938](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1938)

Assign a mapping rule to a tenant

Assign a single mapping rule to a specified tenant.

-

#### Parameters

##### input

[`assignMappingRuleToTenantInput`](../type-aliases/assignMappingRuleToTenantInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignMappingRuleToTenant

#### Tags

Tenant

---

### assignRoleToClient()

```ts
assignRoleToClient(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:1996](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1996)

Assign a role to a client

Assigns the specified role to the client. The client will inherit the authorizations associated with this role.

-

#### Parameters

##### input

[`assignRoleToClientInput`](../type-aliases/assignRoleToClientInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignRoleToClient

#### Tags

Role

---

### assignRoleToGroup()

```ts
assignRoleToGroup(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2054](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L2054)

Assign a role to a group

Assigns the specified role to the group. Every member of the group (user or client) will inherit the authorizations associated with this role.

-

#### Parameters

##### input

[`assignRoleToGroupInput`](../type-aliases/assignRoleToGroupInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignRoleToGroup

#### Tags

Role

---

### assignRoleToMappingRule()

```ts
assignRoleToMappingRule(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2112](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L2112)

Assign a role to a mapping rule

Assigns a role to a mapping rule.

-

#### Parameters

##### input

[`assignRoleToMappingRuleInput`](../type-aliases/assignRoleToMappingRuleInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignRoleToMappingRule

#### Tags

Role

---

### assignRoleToTenant()

```ts
assignRoleToTenant(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2172](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L2172)

Assign a role to a tenant

Assigns a role to a specified tenant.
Users, Clients or Groups, that have the role assigned, will get access to the tenant's data and can perform actions according to their authorizations.

-

#### Parameters

##### input

[`assignRoleToTenantInput`](../type-aliases/assignRoleToTenantInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignRoleToTenant

#### Tags

Tenant

---

### assignRoleToUser()

```ts
assignRoleToUser(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2230](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L2230)

Assign a role to a user

Assigns the specified role to the user. The user will inherit the authorizations associated with this role.

-

#### Parameters

##### input

[`assignRoleToUserInput`](../type-aliases/assignRoleToUserInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignRoleToUser

#### Tags

Role

---

### assignUserTask()

```ts
assignUserTask(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2290](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L2290)

Assign user task

Assigns a user task with the given key to the given assignee.

-

#### Parameters

##### input

[`assignUserTaskInput`](../type-aliases/assignUserTaskInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Example

```ts
async function assignUserTaskExample() {
  const camunda = createCamundaClient();

  const userTaskKey = UserTaskKey.assumeExists("2251799813685249");

  await camunda.assignUserTask({
    userTaskKey,
    assignee: "alice",
    allowOverride: true,
  });
}
```

#### Operation Id

assignUserTask

#### Tags

User task

---

### assignUserToGroup()

```ts
assignUserToGroup(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2352](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L2352)

Assign a user to a group

Assigns a user to a group, making the user a member of the group.
Group members inherit the group authorizations, roles, and tenant assignments.

-

#### Parameters

##### input

[`assignUserToGroupInput`](../type-aliases/assignUserToGroupInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignUserToGroup

#### Tags

Group

---

### assignUserToTenant()

```ts
assignUserToTenant(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2410](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L2410)

Assign a user to a tenant

Assign a single user to a specified tenant. The user can then access tenant data and perform authorized actions.

-

#### Parameters

##### input

[`assignUserToTenantInput`](../type-aliases/assignUserToTenantInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignUserToTenant

#### Tags

Tenant

---

### broadcastSignal()

```ts
broadcastSignal(input): CancelablePromise<SignalBroadcastResult>;
```

Defined in: [gen/CamundaClient.ts:2470](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L2470)

Broadcast signal

Broadcasts a signal.

-

#### Parameters

##### input

[`SignalBroadcastRequest`](../type-aliases/SignalBroadcastRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SignalBroadcastResult`](../type-aliases/SignalBroadcastResult.md)\>

#### Example

```ts
async function broadcastSignalExample() {
  const camunda = createCamundaClient();

  const result = await camunda.broadcastSignal({
    signalName: "system-shutdown",
    variables: {
      reason: "Scheduled maintenance",
    },
  });

  console.log(`Signal broadcast key: ${result.signalKey}`);
}
```

#### Operation Id

broadcastSignal

#### Tags

Signal

---

### cancelBatchOperation()

```ts
cancelBatchOperation(input, consistencyManagement): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2535](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L2535)

Cancel Batch operation

Cancels a running batch operation.
This is done asynchronously, the progress can be tracked using the batch operation status endpoint (/batch-operations/{batchOperationKey}).

-

#### Parameters

##### input

###### batchOperationKey

[`BatchOperationKey`](../type-aliases/BatchOperationKey.md)

##### consistencyManagement

[`cancelBatchOperationConsistency`](../type-aliases/cancelBatchOperationConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

cancelBatchOperation

#### Tags

Batch operation

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### cancelProcessInstance()

```ts
cancelProcessInstance(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2601](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L2601)

Cancel process instance

Cancels a running process instance. As a cancellation includes more than just the removal of the process instance resource, the cancellation resource must be posted.

-

#### Parameters

##### input

`object` & `object`

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Example

```ts
async function cancelProcessInstanceExample() {
  const camunda = createCamundaClient();

  // Create a process instance and get its key from the response
  const created = await camunda.createProcessInstance({
    processDefinitionId: ProcessDefinitionId.assumeExists("order-process"),
  });

  // Cancel the process instance using the key from the creation response
  await camunda.cancelProcessInstance({
    processInstanceKey: created.processInstanceKey,
  });
}
```

#### Operation Id

cancelProcessInstance

#### Tags

Process instance

---

### cancelProcessInstancesBatchOperation()

```ts
cancelProcessInstancesBatchOperation(input, consistencyManagement): CancelablePromise<BatchOperationCreatedResult>;
```

Defined in: [gen/CamundaClient.ts:2666](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L2666)

Cancel process instances (batch)

Cancels multiple running process instances.
Since only ACTIVE root instances can be cancelled, any given filters for state and
parentProcessInstanceKey are ignored and overridden during this batch operation.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

-

#### Parameters

##### input

###### filter

[`ProcessInstanceFilter`](../type-aliases/ProcessInstanceFilter.md)

The process instance filter.

###### operationReference?

`number`

##### consistencyManagement

[`cancelProcessInstancesBatchOperationConsistency`](../type-aliases/cancelProcessInstancesBatchOperationConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`BatchOperationCreatedResult`](../type-aliases/BatchOperationCreatedResult.md)\>

#### Operation Id

cancelProcessInstancesBatchOperation

#### Tags

Process instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### clearAuthCache()

```ts
clearAuthCache(opts?): void;
```

Defined in: [gen/CamundaClient.ts:1438](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1438)

#### Parameters

##### opts?

###### disk?

`boolean`

###### memory?

`boolean`

#### Returns

`void`

---

### completeJob()

```ts
completeJob(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2731](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L2731)

Complete job

Complete a job with the given payload, which allows completing the associated service task.

-

#### Parameters

##### input

[`completeJobInput`](../type-aliases/completeJobInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Example

```ts
async function completeJobExample() {
  const camunda = createCamundaClient();

  const jobKey = JobKey.assumeExists("2251799813685249");

  await camunda.completeJob({
    jobKey,
    variables: {
      paymentId: "PAY-123",
      status: "completed",
    },
  });
}
```

#### Operation Id

completeJob

#### Tags

Job

---

### completeUserTask()

```ts
completeUserTask(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2793](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L2793)

Complete user task

Completes a user task with the given key.

-

#### Parameters

##### input

[`completeUserTaskInput`](../type-aliases/completeUserTaskInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Example

```ts
async function completeUserTaskExample() {
  const camunda = createCamundaClient();

  const userTaskKey = UserTaskKey.assumeExists("2251799813685249");

  await camunda.completeUserTask({
    userTaskKey,
    variables: {
      approved: true,
      comment: "Looks good",
    },
  });
}
```

#### Operation Id

completeUserTask

#### Tags

User task

---

### configure()

```ts
configure(next): void;
```

Defined in: [gen/CamundaClient.ts:1342](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1342)

#### Parameters

##### next

[`CamundaOptions`](../interfaces/CamundaOptions.md)

#### Returns

`void`

---

### correlateMessage()

```ts
correlateMessage(input): CancelablePromise<MessageCorrelationResult>;
```

Defined in: [gen/CamundaClient.ts:2859](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L2859)

Correlate message

Publishes a message and correlates it to a subscription.
If correlation is successful it will return the first process instance key the message correlated with.
The message is not buffered.
Use the publish message endpoint to send messages that can be buffered.

-

#### Parameters

##### input

[`MessageCorrelationRequest`](../type-aliases/MessageCorrelationRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`MessageCorrelationResult`](../type-aliases/MessageCorrelationResult.md)\>

#### Example

```ts
async function correlateMessageExample() {
  const camunda = createCamundaClient();

  const result = await camunda.correlateMessage({
    name: "order-payment-received",
    correlationKey: "ORD-12345",
    variables: {
      paymentId: "PAY-123",
      amount: 99.95,
    },
  });

  console.log(`Message correlated to: ${result.processInstanceKey}`);
}
```

#### Operation Id

correlateMessage

#### Tags

Message

---

### createAdminUser()

```ts
createAdminUser(input, consistencyManagement): CancelablePromise<UserCreateResult>;
```

Defined in: [gen/CamundaClient.ts:2922](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L2922)

Create admin user

Creates a new user and assigns the admin role to it. This endpoint is only usable when users are managed in the Orchestration Cluster and while no user is assigned to the admin role.

-

#### Parameters

##### input

[`UserRequest`](../type-aliases/UserRequest.md)

##### consistencyManagement

[`createAdminUserConsistency`](../type-aliases/createAdminUserConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`UserCreateResult`](../type-aliases/UserCreateResult.md)\>

#### Operation Id

createAdminUser

#### Tags

Setup

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### createAuthorization()

```ts
createAuthorization(input): CancelablePromise<AuthorizationCreateResult>;
```

Defined in: [gen/CamundaClient.ts:2984](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L2984)

Create authorization

Create the authorization.

-

#### Parameters

##### input

[`AuthorizationIdBasedRequest`](../type-aliases/AuthorizationIdBasedRequest.md) | [`AuthorizationPropertyBasedRequest`](../type-aliases/AuthorizationPropertyBasedRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`AuthorizationCreateResult`](../type-aliases/AuthorizationCreateResult.md)\>

#### Operation Id

createAuthorization

#### Tags

Authorization

---

### createDeployment()

```ts
createDeployment(input): CancelablePromise<ExtendedDeploymentResult>;
```

Defined in: [gen/CamundaClient.ts:3047](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L3047)

Deploy resources

Deploys one or more resources (e.g. processes, decision models, or forms).
This is an atomic call, i.e. either all resources are deployed or none of them are.

-

#### Parameters

##### input

[`createDeploymentInput`](../type-aliases/createDeploymentInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ExtendedDeploymentResult`](../interfaces/ExtendedDeploymentResult.md)\>

Enriched deployment result with typed arrays (processes, decisions, decisionRequirements, forms, resources).

#### Example

```ts
async function createDeploymentExample() {
  const camunda = createCamundaClient();

  const file = new File(["<xml/>"], "order-process.bpmn", {
    type: "application/xml",
  });

  const result = await camunda.createDeployment({
    resources: [file],
  });

  console.log(`Deployment key: ${result.deploymentKey}`);
  for (const process of result.processes ?? []) {
    console.log(
      `  Process: ${process.processDefinitionId} v${process.processDefinitionVersion}`
    );
  }
}
```

#### Operation Id

createDeployment

#### Tags

Resource

---

### createDocument()

```ts
createDocument(input): CancelablePromise<DocumentReference>;
```

Defined in: [gen/CamundaClient.ts:3127](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L3127)

Upload document

Upload a document to the Camunda 8 cluster.

Note that this is currently supported for document stores of type: AWS, GCP, in-memory (non-production), local (non-production)

-

#### Parameters

##### input

[`createDocumentInput`](../type-aliases/createDocumentInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`DocumentReference`](../type-aliases/DocumentReference.md)\>

#### Operation Id

createDocument

#### Tags

Document

---

### createDocumentLink()

```ts
createDocumentLink(input): CancelablePromise<DocumentLink>;
```

Defined in: [gen/CamundaClient.ts:3190](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L3190)

Create document link

Create a link to a document in the Camunda 8 cluster.

Note that this is currently supported for document stores of type: AWS, GCP

-

#### Parameters

##### input

[`createDocumentLinkInput`](../type-aliases/createDocumentLinkInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`DocumentLink`](../type-aliases/DocumentLink.md)\>

#### Operation Id

createDocumentLink

#### Tags

Document

---

### createDocuments()

```ts
createDocuments(input): CancelablePromise<DocumentCreationBatchResponse>;
```

Defined in: [gen/CamundaClient.ts:3267](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L3267)

Upload multiple documents

Upload multiple documents to the Camunda 8 cluster.

The caller must provide a file name for each document, which will be used in case of a multi-status response
to identify which documents failed to upload. The file name can be provided in the `Content-Disposition` header
of the file part or in the `fileName` field of the metadata. You can add a parallel array of metadata objects. These
are matched with the files based on index, and must have the same length as the files array.
To pass homogenous metadata for all files, spread the metadata over the metadata array.
A filename value provided explicitly via the metadata array in the request overrides the `Content-Disposition` header
of the file part.

In case of a multi-status response, the response body will contain a list of `DocumentBatchProblemDetail` objects,
each of which contains the file name of the document that failed to upload and the reason for the failure.
The client can choose to retry the whole batch or individual documents based on the response.

Note that this is currently supported for document stores of type: AWS, GCP, in-memory (non-production), local (non-production)

-

#### Parameters

##### input

[`createDocumentsInput`](../type-aliases/createDocumentsInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`DocumentCreationBatchResponse`](../type-aliases/DocumentCreationBatchResponse.md)\>

#### Operation Id

createDocuments

#### Tags

Document

---

### createElementInstanceVariables()

```ts
createElementInstanceVariables(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:3329](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L3329)

Update element instance variables

Updates all the variables of a particular scope (for example, process instance, element instance) with the given variable data.
Specify the element instance in the `elementInstanceKey` parameter.

-

#### Parameters

##### input

[`createElementInstanceVariablesInput`](../type-aliases/createElementInstanceVariablesInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

createElementInstanceVariables

#### Tags

Element instance

---

### createGlobalClusterVariable()

```ts
createGlobalClusterVariable(input): CancelablePromise<ClusterVariableResult>;
```

Defined in: [gen/CamundaClient.ts:3389](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L3389)

Create a global-scoped cluster variable

Create a global-scoped cluster variable.

-

#### Parameters

##### input

[`CreateClusterVariableRequest`](../type-aliases/CreateClusterVariableRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ClusterVariableResult`](../type-aliases/ClusterVariableResult.md)\>

#### Operation Id

createGlobalClusterVariable

#### Tags

Cluster Variable

---

### createGroup()

```ts
createGroup(input): CancelablePromise<GroupCreateResult>;
```

Defined in: [gen/CamundaClient.ts:3447](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L3447)

Create group

Create a new group.

-

#### Parameters

##### input

[`GroupCreateRequest`](../type-aliases/GroupCreateRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`GroupCreateResult`](../type-aliases/GroupCreateResult.md)\>

#### Operation Id

createGroup

#### Tags

Group

---

### createJobWorker()

```ts
createJobWorker<In, Out, Headers>(cfg): JobWorker;
```

Defined in: [gen/CamundaClient.ts:12362](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L12362)

Create a job worker that activates and processes jobs of the given type.

#### Type Parameters

##### In

`In` _extends_ `ZodType`\<`unknown`, `unknown`, `$ZodTypeInternals`\<`unknown`, `unknown`\>\> = `any`

##### Out

`Out` _extends_ `ZodType`\<`unknown`, `unknown`, `$ZodTypeInternals`\<`unknown`, `unknown`\>\> = `any`

##### Headers

`Headers` _extends_ `ZodType`\<`unknown`, `unknown`, `$ZodTypeInternals`\<`unknown`, `unknown`\>\> = `any`

#### Parameters

##### cfg

[`JobWorkerConfig`](../interfaces/JobWorkerConfig.md)\<`In`, `Out`, `Headers`\>

Worker configuration

#### Returns

[`JobWorker`](../interfaces/JobWorker.md)

#### Examples

```ts
async function createJobWorkerExample() {
  const camunda = createCamundaClient();

  const worker = camunda.createJobWorker({
    jobType: "payment-processing",
    jobTimeoutMs: 30000,
    maxParallelJobs: 5,
    jobHandler: async (job): Promise<JobActionReceipt> => {
      console.log(`Processing job ${job.jobKey}`);
      return job.complete({ processed: true });
    },
  });

  // Workers run continuously until closed
  // worker.close();
}
```

```ts
async function jobWorkerWithErrorHandlingExample() {
  const camunda = createCamundaClient();

  const worker = camunda.createJobWorker({
    jobType: "email-sending",
    jobTimeoutMs: 60000,
    maxParallelJobs: 10,
    pollIntervalMs: 300,
    jobHandler: async (job): Promise<JobActionReceipt> => {
      try {
        console.log(`Sending email for job ${job.jobKey}`);
        return job.complete({ sent: true });
      } catch (err) {
        return job.fail({
          errorMessage: String(err),
          retries: (job.retries ?? 1) - 1,
        });
      }
    },
  });

  void worker;
}
```

---

### createMappingRule()

```ts
createMappingRule(input): CancelablePromise<MappingRuleCreateUpdateResult>;
```

Defined in: [gen/CamundaClient.ts:3506](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L3506)

Create mapping rule

Create a new mapping rule

-

#### Parameters

##### input

[`MappingRuleCreateRequest`](../type-aliases/MappingRuleCreateRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`MappingRuleCreateUpdateResult`](../type-aliases/MappingRuleCreateUpdateResult.md)\>

#### Operation Id

createMappingRule

#### Tags

Mapping rule

---

### createProcessInstance()

```ts
createProcessInstance(input): CancelablePromise<CreateProcessInstanceResult>;
```

Defined in: [gen/CamundaClient.ts:3574](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L3574)

Create process instance

Creates and starts an instance of the specified process.
The process definition to use to create the instance can be specified either using its unique key
(as returned by Deploy resources), or using the BPMN process id and a version.

Waits for the completion of the process instance before returning a result
when awaitCompletion is enabled.

-

#### Parameters

##### input

\{
`awaitCompletion?`: `boolean`;
`fetchVariables?`: `string`[];
`operationReference?`: `number`;
`processDefinitionId`: [`ProcessDefinitionId`](../type-aliases/ProcessDefinitionId.md);
`processDefinitionVersion?`: `number`;
`requestTimeout?`: `number`;
`runtimeInstructions?`: [`ProcessInstanceCreationRuntimeInstruction`](../type-aliases/ProcessInstanceCreationRuntimeInstruction.md)[];
`startInstructions?`: [`ProcessInstanceCreationStartInstruction`](../type-aliases/ProcessInstanceCreationStartInstruction.md)[];
`tags?`: [`TagSet`](../type-aliases/TagSet.md);
`tenantId?`: [`TenantId`](../type-aliases/TenantId.md);
`variables?`: \{
\[`key`: `string`\]: `unknown`;
\};
\}

###### awaitCompletion?

`boolean`

Wait for the process instance to complete. If the process instance completion does
not occur within the requestTimeout, the request will be closed. This can lead to a 504
response status. Disabled by default.

###### fetchVariables?

`string`[]

List of variables by name to be included in the response when awaitCompletion is set to true.
If empty, all visible variables in the root scope will be returned.

###### operationReference?

`number`

###### processDefinitionId

[`ProcessDefinitionId`](../type-aliases/ProcessDefinitionId.md)

The BPMN process id of the process definition to start an instance of.

###### processDefinitionVersion?

`number`

The version of the process. By default, the latest version of the process is used.

###### requestTimeout?

`number`

Timeout (in ms) the request waits for the process to complete. By default or
when set to 0, the generic request timeout configured in the cluster is applied.

###### runtimeInstructions?

[`ProcessInstanceCreationRuntimeInstruction`](../type-aliases/ProcessInstanceCreationRuntimeInstruction.md)[]

Runtime instructions (alpha). List of instructions that affect the runtime behavior of
the process instance. Refer to specific instruction types for more details.

This parameter is an alpha feature and may be subject to change
in future releases.

###### startInstructions?

[`ProcessInstanceCreationStartInstruction`](../type-aliases/ProcessInstanceCreationStartInstruction.md)[]

List of start instructions. By default, the process instance will start at
the start event. If provided, the process instance will apply start instructions
after it has been created.

###### tags?

[`TagSet`](../type-aliases/TagSet.md)

###### tenantId?

[`TenantId`](../type-aliases/TenantId.md)

The tenant id of the process definition.

###### variables?

\{
\[`key`: `string`\]: `unknown`;
\}

JSON object that will instantiate the variables for the root variable scope
of the process instance.

|

\{
`awaitCompletion?`: `boolean`;
`fetchVariables?`: `string`[];
`operationReference?`: `number`;
`processDefinitionKey`: [`ProcessDefinitionKey`](../type-aliases/ProcessDefinitionKey.md);
`processDefinitionVersion?`: `number`;
`requestTimeout?`: `number`;
`runtimeInstructions?`: [`ProcessInstanceCreationRuntimeInstruction`](../type-aliases/ProcessInstanceCreationRuntimeInstruction.md)[];
`startInstructions?`: [`ProcessInstanceCreationStartInstruction`](../type-aliases/ProcessInstanceCreationStartInstruction.md)[];
`tags?`: [`TagSet`](../type-aliases/TagSet.md);
`tenantId?`: [`TenantId`](../type-aliases/TenantId.md);
`variables?`: \{
\[`key`: `string`\]: `unknown`;
\};
\}

###### awaitCompletion?

`boolean`

Wait for the process instance to complete. If the process instance completion does
not occur within the requestTimeout, the request will be closed. This can lead to a 504
response status. Disabled by default.

###### fetchVariables?

`string`[]

List of variables by name to be included in the response when awaitCompletion is set to true.
If empty, all visible variables in the root scope will be returned.

###### operationReference?

`number`

###### processDefinitionKey

[`ProcessDefinitionKey`](../type-aliases/ProcessDefinitionKey.md)

The unique key identifying the process definition, for example, returned for a process in the
deploy resources endpoint.

###### processDefinitionVersion?

`number`

As the version is already identified by the `processDefinitionKey`, the value of this field is ignored.
It's here for backwards-compatibility only as previous releases accepted it in request bodies.

###### requestTimeout?

`number`

Timeout (in ms) the request waits for the process to complete. By default or
when set to 0, the generic request timeout configured in the cluster is applied.

###### runtimeInstructions?

[`ProcessInstanceCreationRuntimeInstruction`](../type-aliases/ProcessInstanceCreationRuntimeInstruction.md)[]

Runtime instructions (alpha). List of instructions that affect the runtime behavior of
the process instance. Refer to specific instruction types for more details.

This parameter is an alpha feature and may be subject to change
in future releases.

###### startInstructions?

[`ProcessInstanceCreationStartInstruction`](../type-aliases/ProcessInstanceCreationStartInstruction.md)[]

List of start instructions. By default, the process instance will start at
the start event. If provided, the process instance will apply start instructions
after it has been created.

###### tags?

[`TagSet`](../type-aliases/TagSet.md)

###### tenantId?

[`TenantId`](../type-aliases/TenantId.md)

The tenant id of the process definition.

###### variables?

\{
\[`key`: `string`\]: `unknown`;
\}

JSON object that will instantiate the variables for the root variable scope
of the process instance.

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`CreateProcessInstanceResult`](../type-aliases/CreateProcessInstanceResult.md)\>

#### Examples

```ts
async function createProcessInstanceByIdExample() {
  const camunda = createCamundaClient();

  const result = await camunda.createProcessInstance({
    processDefinitionId: ProcessDefinitionId.assumeExists("order-process"),
    variables: {
      orderId: "ORD-12345",
      amount: 99.95,
    },
  });

  console.log(`Started process instance: ${result.processInstanceKey}`);
}
```

```ts
async function createProcessInstanceByKeyExample() {
  const camunda = createCamundaClient();

  // Key from a previous API response (e.g. deployment)
  const processDefinitionKey =
    ProcessDefinitionKey.assumeExists("2251799813685249");

  const result = await camunda.createProcessInstance({
    processDefinitionKey,
    variables: {
      orderId: "ORD-12345",
      amount: 99.95,
    },
  });

  console.log(`Started process instance: ${result.processInstanceKey}`);
}
```

#### Operation Id

createProcessInstance

#### Tags

Process instance

---

### createRole()

```ts
createRole(input): CancelablePromise<RoleCreateResult>;
```

Defined in: [gen/CamundaClient.ts:3636](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L3636)

Create role

Create a new role.

-

#### Parameters

##### input

[`RoleCreateRequest`](../type-aliases/RoleCreateRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`RoleCreateResult`](../type-aliases/RoleCreateResult.md)\>

#### Operation Id

createRole

#### Tags

Role

---

### createTenant()

```ts
createTenant(input): CancelablePromise<TenantCreateResult>;
```

Defined in: [gen/CamundaClient.ts:3694](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L3694)

Create tenant

Creates a new tenant.

-

#### Parameters

##### input

[`TenantCreateRequest`](../type-aliases/TenantCreateRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`TenantCreateResult`](../type-aliases/TenantCreateResult.md)\>

#### Operation Id

createTenant

#### Tags

Tenant

---

### createTenantClusterVariable()

```ts
createTenantClusterVariable(input): CancelablePromise<ClusterVariableResult>;
```

Defined in: [gen/CamundaClient.ts:3752](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L3752)

Create a tenant-scoped cluster variable

Create a new cluster variable for the given tenant.

-

#### Parameters

##### input

[`createTenantClusterVariableInput`](../type-aliases/createTenantClusterVariableInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ClusterVariableResult`](../type-aliases/ClusterVariableResult.md)\>

#### Operation Id

createTenantClusterVariable

#### Tags

Cluster Variable

---

### createUser()

```ts
createUser(input, consistencyManagement): CancelablePromise<UserCreateResult>;
```

Defined in: [gen/CamundaClient.ts:3813](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L3813)

Create user

Create a new user.

-

#### Parameters

##### input

[`UserRequest`](../type-aliases/UserRequest.md)

##### consistencyManagement

[`createUserConsistency`](../type-aliases/createUserConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`UserCreateResult`](../type-aliases/UserCreateResult.md)\>

#### Operation Id

createUser

#### Tags

User

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### deleteAuthorization()

```ts
deleteAuthorization(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:3875](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L3875)

Delete authorization

Deletes the authorization with the given key.

-

#### Parameters

##### input

[`deleteAuthorizationInput`](../type-aliases/deleteAuthorizationInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteAuthorization

#### Tags

Authorization

---

### deleteDecisionInstance()

```ts
deleteDecisionInstance(input, consistencyManagement): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:3934](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L3934)

Delete decision instance

Delete all associated decision evaluations based on provided key.

-

#### Parameters

##### input

`object` & `object`

##### consistencyManagement

[`deleteDecisionInstanceConsistency`](../type-aliases/deleteDecisionInstanceConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteDecisionInstance

#### Tags

Decision instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### deleteDecisionInstancesBatchOperation()

```ts
deleteDecisionInstancesBatchOperation(input, consistencyManagement): CancelablePromise<BatchOperationCreatedResult>;
```

Defined in: [gen/CamundaClient.ts:4001](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L4001)

Delete decision instances (batch)

Delete multiple decision instances. This will delete the historic data from secondary storage.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

-

#### Parameters

##### input

###### filter

\{
`decisionDefinitionId?`: [`DecisionDefinitionId`](../type-aliases/DecisionDefinitionId.md);
`decisionDefinitionKey?`: [`DecisionDefinitionKeyFilterProperty`](../type-aliases/DecisionDefinitionKeyFilterProperty.md);
`decisionDefinitionName?`: `string`;
`decisionDefinitionType?`: [`DecisionDefinitionTypeEnum`](../type-aliases/DecisionDefinitionTypeEnum.md);
`decisionDefinitionVersion?`: `number`;
`decisionEvaluationInstanceKey?`: [`DecisionEvaluationInstanceKeyFilterProperty`](../type-aliases/DecisionEvaluationInstanceKeyFilterProperty.md);
`decisionEvaluationKey?`: [`DecisionEvaluationKey`](../type-aliases/DecisionEvaluationKey.md);
`decisionRequirementsKey?`: [`DecisionRequirementsKeyFilterProperty`](../type-aliases/DecisionRequirementsKeyFilterProperty.md);
`elementInstanceKey?`: [`ElementInstanceKeyFilterProperty`](../type-aliases/ElementInstanceKeyFilterProperty.md);
`evaluationDate?`: [`DateTimeFilterProperty`](../type-aliases/DateTimeFilterProperty.md);
`evaluationFailure?`: `string`;
`processDefinitionKey?`: [`ProcessDefinitionKey`](../type-aliases/ProcessDefinitionKey.md);
`processInstanceKey?`: [`ProcessInstanceKey`](../type-aliases/ProcessInstanceKey.md);
`rootDecisionDefinitionKey?`: [`DecisionDefinitionKeyFilterProperty`](../type-aliases/DecisionDefinitionKeyFilterProperty.md);
`state?`: [`DecisionInstanceStateFilterProperty`](../type-aliases/DecisionInstanceStateFilterProperty.md);
`tenantId?`: [`TenantId`](../type-aliases/TenantId.md);
\}

Decision instance search filter.

###### filter.decisionDefinitionId?

[`DecisionDefinitionId`](../type-aliases/DecisionDefinitionId.md)

The ID of the DMN decision.

###### filter.decisionDefinitionKey?

[`DecisionDefinitionKeyFilterProperty`](../type-aliases/DecisionDefinitionKeyFilterProperty.md)

The key of the decision.

###### filter.decisionDefinitionName?

`string`

The name of the DMN decision.

###### filter.decisionDefinitionType?

[`DecisionDefinitionTypeEnum`](../type-aliases/DecisionDefinitionTypeEnum.md)

###### filter.decisionDefinitionVersion?

`number`

The version of the decision.

###### filter.decisionEvaluationInstanceKey?

[`DecisionEvaluationInstanceKeyFilterProperty`](../type-aliases/DecisionEvaluationInstanceKeyFilterProperty.md)

The key of the decision evaluation instance.

###### filter.decisionEvaluationKey?

[`DecisionEvaluationKey`](../type-aliases/DecisionEvaluationKey.md)

The key of the parent decision evaluation. Note that this is not the identifier of an individual decision instance; the `decisionEvaluationInstanceKey` is the identifier for a decision instance.

###### filter.decisionRequirementsKey?

[`DecisionRequirementsKeyFilterProperty`](../type-aliases/DecisionRequirementsKeyFilterProperty.md)

The key of the decision requirements definition.

###### filter.elementInstanceKey?

[`ElementInstanceKeyFilterProperty`](../type-aliases/ElementInstanceKeyFilterProperty.md)

The key of the element instance this decision instance is linked to.

###### filter.evaluationDate?

[`DateTimeFilterProperty`](../type-aliases/DateTimeFilterProperty.md)

The evaluation date of the decision instance.

###### filter.evaluationFailure?

`string`

The evaluation failure of the decision instance.

###### filter.processDefinitionKey?

[`ProcessDefinitionKey`](../type-aliases/ProcessDefinitionKey.md)

The key of the process definition.

###### filter.processInstanceKey?

[`ProcessInstanceKey`](../type-aliases/ProcessInstanceKey.md)

The key of the process instance.

###### filter.rootDecisionDefinitionKey?

[`DecisionDefinitionKeyFilterProperty`](../type-aliases/DecisionDefinitionKeyFilterProperty.md)

The key of the root decision definition.

###### filter.state?

[`DecisionInstanceStateFilterProperty`](../type-aliases/DecisionInstanceStateFilterProperty.md)

The state of the decision instance.

###### filter.tenantId?

[`TenantId`](../type-aliases/TenantId.md)

The tenant ID of the decision instance.

###### operationReference?

`number`

##### consistencyManagement

[`deleteDecisionInstancesBatchOperationConsistency`](../type-aliases/deleteDecisionInstancesBatchOperationConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`BatchOperationCreatedResult`](../type-aliases/BatchOperationCreatedResult.md)\>

#### Operation Id

deleteDecisionInstancesBatchOperation

#### Tags

Decision instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### deleteDocument()

```ts
deleteDocument(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4066](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L4066)

Delete document

Delete a document from the Camunda 8 cluster.

Note that this is currently supported for document stores of type: AWS, GCP, in-memory (non-production), local (non-production)

-

#### Parameters

##### input

[`deleteDocumentInput`](../type-aliases/deleteDocumentInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteDocument

#### Tags

Document

---

### deleteGlobalClusterVariable()

```ts
deleteGlobalClusterVariable(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4126](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L4126)

Delete a global-scoped cluster variable

Delete a global-scoped cluster variable.

-

#### Parameters

##### input

[`deleteGlobalClusterVariableInput`](../type-aliases/deleteGlobalClusterVariableInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteGlobalClusterVariable

#### Tags

Cluster Variable

---

### deleteGroup()

```ts
deleteGroup(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4184](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L4184)

Delete group

Deletes the group with the given ID.

-

#### Parameters

##### input

[`deleteGroupInput`](../type-aliases/deleteGroupInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteGroup

#### Tags

Group

---

### deleteMappingRule()

```ts
deleteMappingRule(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4243](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L4243)

Delete a mapping rule

Deletes the mapping rule with the given ID.

-

#### Parameters

##### input

[`deleteMappingRuleInput`](../type-aliases/deleteMappingRuleInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteMappingRule

#### Tags

Mapping rule

---

### deleteProcessInstance()

```ts
deleteProcessInstance(input, consistencyManagement): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4302](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L4302)

Delete process instance

Deletes a process instance. Only instances that are completed or terminated can be deleted.

-

#### Parameters

##### input

`object` & `object`

##### consistencyManagement

[`deleteProcessInstanceConsistency`](../type-aliases/deleteProcessInstanceConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteProcessInstance

#### Tags

Process instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### deleteProcessInstancesBatchOperation()

```ts
deleteProcessInstancesBatchOperation(input, consistencyManagement): CancelablePromise<BatchOperationCreatedResult>;
```

Defined in: [gen/CamundaClient.ts:4370](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L4370)

Delete process instances (batch)

Delete multiple process instances. This will delete the historic data from secondary storage.
Only process instances in a final state (COMPLETED or TERMINATED) can be deleted.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

-

#### Parameters

##### input

###### filter

[`ProcessInstanceFilter`](../type-aliases/ProcessInstanceFilter.md)

The process instance filter.

###### operationReference?

`number`

##### consistencyManagement

[`deleteProcessInstancesBatchOperationConsistency`](../type-aliases/deleteProcessInstancesBatchOperationConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`BatchOperationCreatedResult`](../type-aliases/BatchOperationCreatedResult.md)\>

#### Operation Id

deleteProcessInstancesBatchOperation

#### Tags

Process instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### deleteResource()

```ts
deleteResource(input): CancelablePromise<DeleteResourceResponse>;
```

Defined in: [gen/CamundaClient.ts:4446](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L4446)

Delete resource

Deletes a deployed resource. This can be a process definition, decision requirements
definition, or form definition deployed using the deploy resources endpoint. Specify the
resource you want to delete in the `resourceKey` parameter.

Once a resource has been deleted it cannot be recovered. If the resource needs to be
available again, a new deployment of the resource is required.

By default, only the resource itself is deleted from the runtime state. To also delete the
historic data associated with a resource, set the `deleteHistory` flag in the request body
to `true`. The historic data is deleted asynchronously via a batch operation. The details of
the created batch operation are included in the response. Note that history deletion is only
supported for process resources; for other resource types this flag is ignored and no history
will be deleted.

-

#### Parameters

##### input

`object` & `object`

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`DeleteResourceResponse`](../type-aliases/DeleteResourceResponse.md)\>

#### Example

```ts
async function deleteResourceExample() {
  const camunda = createCamundaClient();

  // Use a process definition key as a resource key for deletion
  const resourceKey = ProcessDefinitionKey.assumeExists("2251799813685249");

  await camunda.deleteResource({
    resourceKey,
  });
}
```

#### Operation Id

deleteResource

#### Tags

Resource

---

### deleteRole()

```ts
deleteRole(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4506](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L4506)

Delete role

Deletes the role with the given ID.

-

#### Parameters

##### input

[`deleteRoleInput`](../type-aliases/deleteRoleInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteRole

#### Tags

Role

---

### deleteTenant()

```ts
deleteTenant(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4564](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L4564)

Delete tenant

Deletes an existing tenant.

-

#### Parameters

##### input

[`deleteTenantInput`](../type-aliases/deleteTenantInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteTenant

#### Tags

Tenant

---

### deleteTenantClusterVariable()

```ts
deleteTenantClusterVariable(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4622](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L4622)

Delete a tenant-scoped cluster variable

Delete a tenant-scoped cluster variable.

-

#### Parameters

##### input

[`deleteTenantClusterVariableInput`](../type-aliases/deleteTenantClusterVariableInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteTenantClusterVariable

#### Tags

Cluster Variable

---

### deleteUser()

```ts
deleteUser(input, consistencyManagement): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4681](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L4681)

Delete user

Deletes a user.

-

#### Parameters

##### input

[`deleteUserInput`](../type-aliases/deleteUserInput.md)

##### consistencyManagement

[`deleteUserConsistency`](../type-aliases/deleteUserConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteUser

#### Tags

User

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### deployResourcesFromFiles()

```ts
deployResourcesFromFiles(resourceFilenames, options?): CancelablePromise<ExtendedDeploymentResult>;
```

Defined in: [gen/CamundaClient.ts:12378](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L12378)

Node-only convenience: deploy resources from local filesystem paths.

#### Parameters

##### resourceFilenames

`string`[]

Absolute or relative file paths to BPMN/DMN/form/resource files.

##### options?

Optional: tenantId.

###### tenantId?

`string`

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ExtendedDeploymentResult`](../interfaces/ExtendedDeploymentResult.md)\>

ExtendedDeploymentResult

---

### emitSupportLogPreamble()

```ts
emitSupportLogPreamble(): void;
```

Defined in: [gen/CamundaClient.ts:1468](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1468)

Emit the standard support log preamble & redacted configuration to the current support logger.
Safe to call multiple times; subsequent calls are ignored (idempotent).
Useful when a custom supportLogger was injected and you still want the canonical header & config dump.

#### Returns

`void`

---

### evaluateConditionals()

```ts
evaluateConditionals(input): CancelablePromise<EvaluateConditionalResult>;
```

Defined in: [gen/CamundaClient.ts:4746](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L4746)

Evaluate root level conditional start events

Evaluates root-level conditional start events for process definitions.
If the evaluation is successful, it will return the keys of all created process instances, along with their associated process definition key.
Multiple root-level conditional start events of the same process definition can trigger if their conditions evaluate to true.

-

#### Parameters

##### input

[`ConditionalEvaluationInstruction`](../type-aliases/ConditionalEvaluationInstruction.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`EvaluateConditionalResult`](../type-aliases/EvaluateConditionalResult.md)\>

#### Operation Id

evaluateConditionals

#### Tags

Conditional

---

### evaluateDecision()

```ts
evaluateDecision(input): CancelablePromise<EvaluateDecisionResult>;
```

Defined in: [gen/CamundaClient.ts:4816](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L4816)

Evaluate decision

Evaluates a decision.
You specify the decision to evaluate either by using its unique key (as returned by
DeployResource), or using the decision ID. When using the decision ID, the latest deployed
version of the decision is used.

-

#### Parameters

##### input

[`DecisionEvaluationById`](../type-aliases/DecisionEvaluationById.md) | [`DecisionEvaluationByKey`](../type-aliases/DecisionEvaluationByKey.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`EvaluateDecisionResult`](../type-aliases/EvaluateDecisionResult.md)\>

#### Examples

```ts
async function evaluateDecisionByIdExample() {
  const camunda = createCamundaClient();

  const result = await camunda.evaluateDecision({
    decisionDefinitionId: DecisionDefinitionId.assumeExists(
      "invoice-classification"
    ),
    variables: {
      amount: 1000,
      invoiceCategory: "Misc",
    },
  });

  console.log(`Decision: ${result.decisionDefinitionId}`);
  console.log(`Output: ${result.output}`);
}
```

```ts
async function evaluateDecisionByKeyExample() {
  const camunda = createCamundaClient();

  const decisionDefinitionKey =
    DecisionDefinitionKey.assumeExists("2251799813685249");

  const result = await camunda.evaluateDecision({
    decisionDefinitionKey,
    variables: {
      amount: 1000,
      invoiceCategory: "Misc",
    },
  });

  console.log(`Decision output: ${result.output}`);
}
```

#### Operation Id

evaluateDecision

#### Tags

Decision definition

---

### evaluateExpression()

```ts
evaluateExpression(input): CancelablePromise<ExpressionEvaluationResult>;
```

Defined in: [gen/CamundaClient.ts:4878](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L4878)

Evaluate an expression

Evaluates a FEEL expression and returns the result. Supports references to tenant scoped cluster variables when a tenant ID is provided.

-

#### Parameters

##### input

[`ExpressionEvaluationRequest`](../type-aliases/ExpressionEvaluationRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ExpressionEvaluationResult`](../type-aliases/ExpressionEvaluationResult.md)\>

#### Operation Id

evaluateExpression

#### Tags

Expression

---

### failJob()

```ts
failJob(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4943](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L4943)

Fail job

Mark the job as failed.

-

#### Parameters

##### input

[`failJobInput`](../type-aliases/failJobInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Example

```ts
async function failJobExample() {
  const camunda = createCamundaClient();

  const jobKey = JobKey.assumeExists("2251799813685249");

  await camunda.failJob({
    jobKey,
    retries: 2,
    errorMessage: "Payment gateway timeout",
    retryBackOff: 5000,
  });
}
```

#### Operation Id

failJob

#### Tags

Job

---

### forceAuthRefresh()

```ts
forceAuthRefresh(): Promise<string | undefined>;
```

Defined in: [gen/CamundaClient.ts:1435](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1435)

#### Returns

`Promise`\<`string` \| `undefined`\>

---

### getAuditLog()

```ts
getAuditLog(input, consistencyManagement): CancelablePromise<{
  actorId?: string;
  actorType?: AuditLogActorTypeEnum;
  annotation?: string;
  auditLogKey?: AuditLogKey;
  batchOperationKey?: BatchOperationKey;
  batchOperationType?: BatchOperationTypeEnum;
  category?: AuditLogCategoryEnum;
  decisionDefinitionId?: DecisionDefinitionId;
  decisionDefinitionKey?: DecisionDefinitionKey;
  decisionEvaluationKey?: DecisionEvaluationKey;
  decisionRequirementsId?: string;
  decisionRequirementsKey?: DecisionRequirementsKey;
  deploymentKey?: DeploymentKey;
  elementInstanceKey?: ElementInstanceKey;
  entityDescription?: string;
  entityKey?: AuditLogEntityKey;
  entityType?: AuditLogEntityTypeEnum;
  formKey?: FormKey;
  jobKey?: JobKey;
  operationType?: AuditLogOperationTypeEnum;
  processDefinitionId?: ProcessDefinitionId;
  processDefinitionKey?: ProcessDefinitionKey;
  processInstanceKey?: ProcessInstanceKey;
  relatedEntityKey?: AuditLogEntityKey;
  relatedEntityType?: AuditLogEntityTypeEnum;
  resourceKey?: ResourceKey;
  result?: AuditLogResultEnum;
  rootProcessInstanceKey?: ProcessInstanceKey;
  tenantId?: TenantId;
  timestamp?: string;
  userTaskKey?: UserTaskKey;
}>;
```

Defined in: [gen/CamundaClient.ts:5004](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L5004)

Get audit log

Get an audit log entry by auditLogKey.

-

#### Parameters

##### input

[`getAuditLogInput`](../type-aliases/getAuditLogInput.md)

##### consistencyManagement

[`getAuditLogConsistency`](../type-aliases/getAuditLogConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`actorId?`: `string`;
`actorType?`: [`AuditLogActorTypeEnum`](../type-aliases/AuditLogActorTypeEnum.md);
`annotation?`: `string`;
`auditLogKey?`: [`AuditLogKey`](../type-aliases/AuditLogKey.md);
`batchOperationKey?`: [`BatchOperationKey`](../type-aliases/BatchOperationKey.md);
`batchOperationType?`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
`category?`: [`AuditLogCategoryEnum`](../type-aliases/AuditLogCategoryEnum.md);
`decisionDefinitionId?`: [`DecisionDefinitionId`](../type-aliases/DecisionDefinitionId.md);
`decisionDefinitionKey?`: [`DecisionDefinitionKey`](../type-aliases/DecisionDefinitionKey.md);
`decisionEvaluationKey?`: [`DecisionEvaluationKey`](../type-aliases/DecisionEvaluationKey.md);
`decisionRequirementsId?`: `string`;
`decisionRequirementsKey?`: [`DecisionRequirementsKey`](../type-aliases/DecisionRequirementsKey.md);
`deploymentKey?`: [`DeploymentKey`](../type-aliases/DeploymentKey.md);
`elementInstanceKey?`: [`ElementInstanceKey`](../type-aliases/ElementInstanceKey.md);
`entityDescription?`: `string`;
`entityKey?`: [`AuditLogEntityKey`](../type-aliases/AuditLogEntityKey.md);
`entityType?`: [`AuditLogEntityTypeEnum`](../type-aliases/AuditLogEntityTypeEnum.md);
`formKey?`: [`FormKey`](../type-aliases/FormKey.md);
`jobKey?`: [`JobKey`](../type-aliases/JobKey.md);
`operationType?`: [`AuditLogOperationTypeEnum`](../type-aliases/AuditLogOperationTypeEnum.md);
`processDefinitionId?`: [`ProcessDefinitionId`](../type-aliases/ProcessDefinitionId.md);
`processDefinitionKey?`: [`ProcessDefinitionKey`](../type-aliases/ProcessDefinitionKey.md);
`processInstanceKey?`: [`ProcessInstanceKey`](../type-aliases/ProcessInstanceKey.md);
`relatedEntityKey?`: [`AuditLogEntityKey`](../type-aliases/AuditLogEntityKey.md);
`relatedEntityType?`: [`AuditLogEntityTypeEnum`](../type-aliases/AuditLogEntityTypeEnum.md);
`resourceKey?`: [`ResourceKey`](../type-aliases/ResourceKey.md);
`result?`: [`AuditLogResultEnum`](../type-aliases/AuditLogResultEnum.md);
`rootProcessInstanceKey?`: [`ProcessInstanceKey`](../type-aliases/ProcessInstanceKey.md);
`tenantId?`: [`TenantId`](../type-aliases/TenantId.md);
`timestamp?`: `string`;
`userTaskKey?`: [`UserTaskKey`](../type-aliases/UserTaskKey.md);
\}\>

#### Operation Id

getAuditLog

#### Tags

Audit Log

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getAuthentication()

```ts
getAuthentication(): CancelablePromise<CamundaUserResult>;
```

Defined in: [gen/CamundaClient.ts:5066](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L5066)

Get current user

Retrieves the current authenticated user.

-

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`CamundaUserResult`](../type-aliases/CamundaUserResult.md)\>

#### Operation Id

getAuthentication

#### Tags

Authentication

---

### getAuthHeaders()

```ts
getAuthHeaders(): Promise<Record<string, string>>;
```

Defined in: [gen/CamundaClient.ts:1432](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1432)

#### Returns

`Promise`\<`Record`\<`string`, `string`\>\>

---

### getAuthorization()

```ts
getAuthorization(input, consistencyManagement): CancelablePromise<AuthorizationResult>;
```

Defined in: [gen/CamundaClient.ts:5116](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L5116)

Get authorization

Get authorization by the given key.

-

#### Parameters

##### input

[`getAuthorizationInput`](../type-aliases/getAuthorizationInput.md)

##### consistencyManagement

[`getAuthorizationConsistency`](../type-aliases/getAuthorizationConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`AuthorizationResult`](../type-aliases/AuthorizationResult.md)\>

#### Operation Id

getAuthorization

#### Tags

Authorization

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getBackpressureState()

```ts
getBackpressureState():
  | {
  consecutive: number;
  permitsCurrent: number;
  permitsMax: number | null;
  severity: BackpressureSeverity;
  waiters: number;
}
  | {
  consecutive: number;
  permitsCurrent: number;
  permitsMax: null;
  severity: string;
  waiters: number;
};
```

Defined in: [gen/CamundaClient.ts:1537](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1537)

Public accessor for current backpressure adaptive limiter state (stable)

#### Returns

\| \{
`consecutive`: `number`;
`permitsCurrent`: `number`;
`permitsMax`: `number` \| `null`;
`severity`: [`BackpressureSeverity`](../type-aliases/BackpressureSeverity.md);
`waiters`: `number`;
\}
\| \{
`consecutive`: `number`;
`permitsCurrent`: `number`;
`permitsMax`: `null`;
`severity`: `string`;
`waiters`: `number`;
\}

---

### getBatchOperation()

```ts
getBatchOperation(input, consistencyManagement): CancelablePromise<BatchOperationResponse>;
```

Defined in: [gen/CamundaClient.ts:5179](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L5179)

Get batch operation

Get batch operation by key.

-

#### Parameters

##### input

[`getBatchOperationInput`](../type-aliases/getBatchOperationInput.md)

##### consistencyManagement

[`getBatchOperationConsistency`](../type-aliases/getBatchOperationConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`BatchOperationResponse`](../type-aliases/BatchOperationResponse.md)\>

#### Operation Id

getBatchOperation

#### Tags

Batch operation

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getConfig()

```ts
getConfig(): Readonly<CamundaConfig>;
```

Defined in: [gen/CamundaClient.ts:1337](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1337)

Read-only snapshot of current hydrated configuration (do not mutate directly).
Use configure(...) to apply changes.

#### Returns

`Readonly`\<[`CamundaConfig`](../interfaces/CamundaConfig.md)\>

---

### getDecisionDefinition()

```ts
getDecisionDefinition(input, consistencyManagement): CancelablePromise<DecisionDefinitionResult>;
```

Defined in: [gen/CamundaClient.ts:5244](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L5244)

Get decision definition

Returns a decision definition by key.

-

#### Parameters

##### input

[`getDecisionDefinitionInput`](../type-aliases/getDecisionDefinitionInput.md)

##### consistencyManagement

[`getDecisionDefinitionConsistency`](../type-aliases/getDecisionDefinitionConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`DecisionDefinitionResult`](../type-aliases/DecisionDefinitionResult.md)\>

#### Example

```ts
async function getDecisionDefinitionExample() {
  const camunda = createCamundaClient();

  const decisionDefinitionKey =
    DecisionDefinitionKey.assumeExists("2251799813685249");

  const definition = await camunda.getDecisionDefinition(
    { decisionDefinitionKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  console.log(`Decision: ${definition.decisionDefinitionId}`);
  console.log(`Version: ${definition.version}`);
}
```

#### Operation Id

getDecisionDefinition

#### Tags

Decision definition

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getDecisionDefinitionXml()

```ts
getDecisionDefinitionXml(input, consistencyManagement): CancelablePromise<string>;
```

Defined in: [gen/CamundaClient.ts:5307](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L5307)

Get decision definition XML

Returns decision definition as XML.

-

#### Parameters

##### input

[`getDecisionDefinitionXmlInput`](../type-aliases/getDecisionDefinitionXmlInput.md)

##### consistencyManagement

[`getDecisionDefinitionXmlConsistency`](../type-aliases/getDecisionDefinitionXmlConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`string`\>

#### Operation Id

getDecisionDefinitionXML

#### Tags

Decision definition

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getDecisionInstance()

```ts
getDecisionInstance(input, consistencyManagement): CancelablePromise<object & object>;
```

Defined in: [gen/CamundaClient.ts:5370](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L5370)

Get decision instance

Returns a decision instance.

-

#### Parameters

##### input

[`getDecisionInstanceInput`](../type-aliases/getDecisionInstanceInput.md)

##### consistencyManagement

[`getDecisionInstanceConsistency`](../type-aliases/getDecisionInstanceConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`object` & `object`\>

#### Operation Id

getDecisionInstance

#### Tags

Decision instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getDecisionRequirements()

```ts
getDecisionRequirements(input, consistencyManagement): CancelablePromise<DecisionRequirementsResult>;
```

Defined in: [gen/CamundaClient.ts:5433](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L5433)

Get decision requirements

Returns Decision Requirements as JSON.

-

#### Parameters

##### input

[`getDecisionRequirementsInput`](../type-aliases/getDecisionRequirementsInput.md)

##### consistencyManagement

[`getDecisionRequirementsConsistency`](../type-aliases/getDecisionRequirementsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`DecisionRequirementsResult`](../type-aliases/DecisionRequirementsResult.md)\>

#### Operation Id

getDecisionRequirements

#### Tags

Decision requirements

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getDecisionRequirementsXml()

```ts
getDecisionRequirementsXml(input, consistencyManagement): CancelablePromise<string>;
```

Defined in: [gen/CamundaClient.ts:5496](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L5496)

Get decision requirements XML

Returns decision requirements as XML.

-

#### Parameters

##### input

[`getDecisionRequirementsXmlInput`](../type-aliases/getDecisionRequirementsXmlInput.md)

##### consistencyManagement

[`getDecisionRequirementsXmlConsistency`](../type-aliases/getDecisionRequirementsXmlConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`string`\>

#### Operation Id

getDecisionRequirementsXML

#### Tags

Decision requirements

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getDocument()

```ts
getDocument(input): CancelablePromise<Blob>;
```

Defined in: [gen/CamundaClient.ts:5561](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L5561)

Download document

Download a document from the Camunda 8 cluster.

Note that this is currently supported for document stores of type: AWS, GCP, in-memory (non-production), local (non-production)

-

#### Parameters

##### input

[`getDocumentInput`](../type-aliases/getDocumentInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`Blob`\>

#### Operation Id

getDocument

#### Tags

Document

---

### getElementInstance()

```ts
getElementInstance(input, consistencyManagement): CancelablePromise<{
  elementId: ElementId;
  elementInstanceKey: ElementInstanceKey;
  elementName: string;
  endDate?: string;
  hasIncident: boolean;
  incidentKey?: IncidentKey;
  processDefinitionId: ProcessDefinitionId;
  processDefinitionKey: ProcessDefinitionKey;
  processInstanceKey: ProcessInstanceKey;
  rootProcessInstanceKey?: ProcessInstanceKey;
  startDate: string;
  state: ElementInstanceStateEnum;
  tenantId: TenantId;
  type:   | "USER_TASK"
     | "UNKNOWN"
     | "UNSPECIFIED"
     | "PROCESS"
     | "SUB_PROCESS"
     | "EVENT_SUB_PROCESS"
     | "AD_HOC_SUB_PROCESS"
     | "AD_HOC_SUB_PROCESS_INNER_INSTANCE"
     | "START_EVENT"
     | "INTERMEDIATE_CATCH_EVENT"
     | "INTERMEDIATE_THROW_EVENT"
     | "BOUNDARY_EVENT"
     | "END_EVENT"
     | "SERVICE_TASK"
     | "RECEIVE_TASK"
     | "MANUAL_TASK"
     | "TASK"
     | "EXCLUSIVE_GATEWAY"
     | "INCLUSIVE_GATEWAY"
     | "PARALLEL_GATEWAY"
     | "EVENT_BASED_GATEWAY"
     | "SEQUENCE_FLOW"
     | "MULTI_INSTANCE_BODY"
     | "CALL_ACTIVITY"
     | "BUSINESS_RULE_TASK"
     | "SCRIPT_TASK"
     | "SEND_TASK";
}>;
```

Defined in: [gen/CamundaClient.ts:5622](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L5622)

Get element instance

Returns element instance as JSON.

-

#### Parameters

##### input

[`getElementInstanceInput`](../type-aliases/getElementInstanceInput.md)

##### consistencyManagement

[`getElementInstanceConsistency`](../type-aliases/getElementInstanceConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`elementId`: [`ElementId`](../type-aliases/ElementId.md);
`elementInstanceKey`: [`ElementInstanceKey`](../type-aliases/ElementInstanceKey.md);
`elementName`: `string`;
`endDate?`: `string`;
`hasIncident`: `boolean`;
`incidentKey?`: [`IncidentKey`](../type-aliases/IncidentKey.md);
`processDefinitionId`: [`ProcessDefinitionId`](../type-aliases/ProcessDefinitionId.md);
`processDefinitionKey`: [`ProcessDefinitionKey`](../type-aliases/ProcessDefinitionKey.md);
`processInstanceKey`: [`ProcessInstanceKey`](../type-aliases/ProcessInstanceKey.md);
`rootProcessInstanceKey?`: [`ProcessInstanceKey`](../type-aliases/ProcessInstanceKey.md);
`startDate`: `string`;
`state`: [`ElementInstanceStateEnum`](../type-aliases/ElementInstanceStateEnum.md);
`tenantId`: [`TenantId`](../type-aliases/TenantId.md);
`type`: \| `"USER_TASK"`
\| `"UNKNOWN"`
\| `"UNSPECIFIED"`
\| `"PROCESS"`
\| `"SUB_PROCESS"`
\| `"EVENT_SUB_PROCESS"`
\| `"AD_HOC_SUB_PROCESS"`
\| `"AD_HOC_SUB_PROCESS_INNER_INSTANCE"`
\| `"START_EVENT"`
\| `"INTERMEDIATE_CATCH_EVENT"`
\| `"INTERMEDIATE_THROW_EVENT"`
\| `"BOUNDARY_EVENT"`
\| `"END_EVENT"`
\| `"SERVICE_TASK"`
\| `"RECEIVE_TASK"`
\| `"MANUAL_TASK"`
\| `"TASK"`
\| `"EXCLUSIVE_GATEWAY"`
\| `"INCLUSIVE_GATEWAY"`
\| `"PARALLEL_GATEWAY"`
\| `"EVENT_BASED_GATEWAY"`
\| `"SEQUENCE_FLOW"`
\| `"MULTI_INSTANCE_BODY"`
\| `"CALL_ACTIVITY"`
\| `"BUSINESS_RULE_TASK"`
\| `"SCRIPT_TASK"`
\| `"SEND_TASK"`;
\}\>

#### Operation Id

getElementInstance

#### Tags

Element instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getErrorMode()

```ts
getErrorMode(): "result" | "throw";
```

Defined in: [gen/CamundaClient.ts:1454](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1454)

Internal accessor (read-only) for eventual consistency error mode.

#### Returns

`"result"` \| `"throw"`

---

### getGlobalClusterVariable()

```ts
getGlobalClusterVariable(input, consistencyManagement): CancelablePromise<ClusterVariableResult>;
```

Defined in: [gen/CamundaClient.ts:5685](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L5685)

Get a global-scoped cluster variable

Get a global-scoped cluster variable.

-

#### Parameters

##### input

[`getGlobalClusterVariableInput`](../type-aliases/getGlobalClusterVariableInput.md)

##### consistencyManagement

[`getGlobalClusterVariableConsistency`](../type-aliases/getGlobalClusterVariableConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ClusterVariableResult`](../type-aliases/ClusterVariableResult.md)\>

#### Operation Id

getGlobalClusterVariable

#### Tags

Cluster Variable

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getGlobalJobStatistics()

```ts
getGlobalJobStatistics(input, consistencyManagement): CancelablePromise<GlobalJobStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:5749](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L5749)

Global job statistics

Returns global aggregated counts for jobs. Optionally filter by the creation time window and/or jobType.

-

#### Parameters

##### input

[`getGlobalJobStatisticsInput`](../type-aliases/getGlobalJobStatisticsInput.md)

##### consistencyManagement

[`getGlobalJobStatisticsConsistency`](../type-aliases/getGlobalJobStatisticsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`GlobalJobStatisticsQueryResult`](../type-aliases/GlobalJobStatisticsQueryResult.md)\>

#### Operation Id

getGlobalJobStatistics

#### Tags

Job

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getGroup()

```ts
getGroup(input, consistencyManagement): CancelablePromise<GroupResult>;
```

Defined in: [gen/CamundaClient.ts:5812](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L5812)

Get group

Get a group by its ID.

-

#### Parameters

##### input

[`getGroupInput`](../type-aliases/getGroupInput.md)

##### consistencyManagement

[`getGroupConsistency`](../type-aliases/getGroupConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`GroupResult`](../type-aliases/GroupResult.md)\>

#### Operation Id

getGroup

#### Tags

Group

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getIncident()

```ts
getIncident(input, consistencyManagement): CancelablePromise<{
  creationTime?: string;
  elementId?: ElementId;
  elementInstanceKey?: ElementInstanceKey;
  errorMessage?: string;
  errorType?: IncidentErrorTypeEnum;
  incidentKey?: IncidentKey;
  jobKey?: JobKey;
  processDefinitionId?: ProcessDefinitionId;
  processDefinitionKey?: ProcessDefinitionKey;
  processInstanceKey?: ProcessInstanceKey;
  rootProcessInstanceKey?: ProcessInstanceKey;
  state?: IncidentStateEnum;
  tenantId?: TenantId;
}>;
```

Defined in: [gen/CamundaClient.ts:5878](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L5878)

Get incident

Returns incident as JSON.

-

#### Parameters

##### input

[`getIncidentInput`](../type-aliases/getIncidentInput.md)

##### consistencyManagement

[`getIncidentConsistency`](../type-aliases/getIncidentConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`creationTime?`: `string`;
`elementId?`: [`ElementId`](../type-aliases/ElementId.md);
`elementInstanceKey?`: [`ElementInstanceKey`](../type-aliases/ElementInstanceKey.md);
`errorMessage?`: `string`;
`errorType?`: [`IncidentErrorTypeEnum`](../type-aliases/IncidentErrorTypeEnum.md);
`incidentKey?`: [`IncidentKey`](../type-aliases/IncidentKey.md);
`jobKey?`: [`JobKey`](../type-aliases/JobKey.md);
`processDefinitionId?`: [`ProcessDefinitionId`](../type-aliases/ProcessDefinitionId.md);
`processDefinitionKey?`: [`ProcessDefinitionKey`](../type-aliases/ProcessDefinitionKey.md);
`processInstanceKey?`: [`ProcessInstanceKey`](../type-aliases/ProcessInstanceKey.md);
`rootProcessInstanceKey?`: [`ProcessInstanceKey`](../type-aliases/ProcessInstanceKey.md);
`state?`: [`IncidentStateEnum`](../type-aliases/IncidentStateEnum.md);
`tenantId?`: [`TenantId`](../type-aliases/TenantId.md);
\}\>

#### Example

```ts
async function getIncidentExample() {
  const camunda = createCamundaClient();

  const incidentKey = IncidentKey.assumeExists("2251799813685249");

  const incident = await camunda.getIncident(
    { incidentKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  console.log(`Type: ${incident.errorType}`);
  console.log(`State: ${incident.state}`);
  console.log(`Message: ${incident.errorMessage}`);
}
```

#### Operation Id

getIncident

#### Tags

Incident

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getLicense()

```ts
getLicense(): CancelablePromise<LicenseResponse>;
```

Defined in: [gen/CamundaClient.ts:5940](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L5940)

Get license status

Obtains the status of the current Camunda license.

-

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`LicenseResponse`](../type-aliases/LicenseResponse.md)\>

#### Operation Id

getLicense

#### Tags

License

---

### getMappingRule()

```ts
getMappingRule(input, consistencyManagement): CancelablePromise<MappingRuleResult>;
```

Defined in: [gen/CamundaClient.ts:5991](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L5991)

Get a mapping rule

Gets the mapping rule with the given ID.

-

#### Parameters

##### input

[`getMappingRuleInput`](../type-aliases/getMappingRuleInput.md)

##### consistencyManagement

[`getMappingRuleConsistency`](../type-aliases/getMappingRuleConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`MappingRuleResult`](../type-aliases/MappingRuleResult.md)\>

#### Operation Id

getMappingRule

#### Tags

Mapping rule

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getProcessDefinition()

```ts
getProcessDefinition(input, consistencyManagement): CancelablePromise<ProcessDefinitionResult>;
```

Defined in: [gen/CamundaClient.ts:6054](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L6054)

Get process definition

Returns process definition as JSON.

-

#### Parameters

##### input

[`getProcessDefinitionInput`](../type-aliases/getProcessDefinitionInput.md)

##### consistencyManagement

[`getProcessDefinitionConsistency`](../type-aliases/getProcessDefinitionConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ProcessDefinitionResult`](../type-aliases/ProcessDefinitionResult.md)\>

#### Operation Id

getProcessDefinition

#### Tags

Process definition

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getProcessDefinitionInstanceStatistics()

```ts
getProcessDefinitionInstanceStatistics(input, consistencyManagement): CancelablePromise<ProcessDefinitionInstanceStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6118](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L6118)

Get process instance statistics

Get statistics about process instances, grouped by process definition and tenant.

-

#### Parameters

##### input

###### page?

[`OffsetPagination`](../type-aliases/OffsetPagination.md)

###### sort?

`object`[]

Sort field criteria.

##### consistencyManagement

[`getProcessDefinitionInstanceStatisticsConsistency`](../type-aliases/getProcessDefinitionInstanceStatisticsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ProcessDefinitionInstanceStatisticsQueryResult`](../type-aliases/ProcessDefinitionInstanceStatisticsQueryResult.md)\>

#### Operation Id

getProcessDefinitionInstanceStatistics

#### Tags

Process definition

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getProcessDefinitionInstanceVersionStatistics()

```ts
getProcessDefinitionInstanceVersionStatistics(input, consistencyManagement): CancelablePromise<ProcessDefinitionInstanceVersionStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6183](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L6183)

Get process instance statistics by version

Get statistics about process instances, grouped by version for a given process definition.
The process definition ID must be provided as a required field in the request body filter.

-

#### Parameters

##### input

###### filter

[`ProcessDefinitionInstanceVersionStatisticsFilter`](../type-aliases/ProcessDefinitionInstanceVersionStatisticsFilter.md)

The process definition instance version statistics search filters.

###### page?

[`OffsetPagination`](../type-aliases/OffsetPagination.md)

Pagination criteria.

###### sort?

`object`[]

Sort field criteria.

##### consistencyManagement

[`getProcessDefinitionInstanceVersionStatisticsConsistency`](../type-aliases/getProcessDefinitionInstanceVersionStatisticsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ProcessDefinitionInstanceVersionStatisticsQueryResult`](../type-aliases/ProcessDefinitionInstanceVersionStatisticsQueryResult.md)\>

#### Operation Id

getProcessDefinitionInstanceVersionStatistics

#### Tags

Process definition

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getProcessDefinitionMessageSubscriptionStatistics()

```ts
getProcessDefinitionMessageSubscriptionStatistics(input, consistencyManagement): CancelablePromise<ProcessDefinitionMessageSubscriptionStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6247](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L6247)

Get message subscription statistics

Get message subscription statistics, grouped by process definition.

-

#### Parameters

##### input

###### filter?

\{
`correlationKey?`: [`StringFilterProperty`](../type-aliases/StringFilterProperty.md);
`elementId?`: [`StringFilterProperty`](../type-aliases/StringFilterProperty.md);
`elementInstanceKey?`: [`ElementInstanceKeyFilterProperty`](../type-aliases/ElementInstanceKeyFilterProperty.md);
`lastUpdatedDate?`: [`DateTimeFilterProperty`](../type-aliases/DateTimeFilterProperty.md);
`messageName?`: [`StringFilterProperty`](../type-aliases/StringFilterProperty.md);
`messageSubscriptionKey?`: [`MessageSubscriptionKeyFilterProperty`](../type-aliases/MessageSubscriptionKeyFilterProperty.md);
`messageSubscriptionState?`: [`MessageSubscriptionStateFilterProperty`](../type-aliases/MessageSubscriptionStateFilterProperty.md);
`processDefinitionId?`: [`StringFilterProperty`](../type-aliases/StringFilterProperty.md);
`processDefinitionKey?`: [`ProcessDefinitionKeyFilterProperty`](../type-aliases/ProcessDefinitionKeyFilterProperty.md);
`processInstanceKey?`: [`ProcessInstanceKeyFilterProperty`](../type-aliases/ProcessInstanceKeyFilterProperty.md);
`tenantId?`: [`StringFilterProperty`](../type-aliases/StringFilterProperty.md);
\}

Message subscription search filter.

###### filter.correlationKey?

[`StringFilterProperty`](../type-aliases/StringFilterProperty.md)

The correlation key of the message subscription.

###### filter.elementId?

[`StringFilterProperty`](../type-aliases/StringFilterProperty.md)

The element ID associated with this message subscription.

###### filter.elementInstanceKey?

[`ElementInstanceKeyFilterProperty`](../type-aliases/ElementInstanceKeyFilterProperty.md)

The element instance key associated with this message subscription.

###### filter.lastUpdatedDate?

[`DateTimeFilterProperty`](../type-aliases/DateTimeFilterProperty.md)

The last updated date of the message subscription.

###### filter.messageName?

[`StringFilterProperty`](../type-aliases/StringFilterProperty.md)

The name of the message associated with the message subscription.

###### filter.messageSubscriptionKey?

[`MessageSubscriptionKeyFilterProperty`](../type-aliases/MessageSubscriptionKeyFilterProperty.md)

The message subscription key associated with this message subscription.

###### filter.messageSubscriptionState?

[`MessageSubscriptionStateFilterProperty`](../type-aliases/MessageSubscriptionStateFilterProperty.md)

The message subscription state.

###### filter.processDefinitionId?

[`StringFilterProperty`](../type-aliases/StringFilterProperty.md)

The process definition ID associated with this message subscription.

###### filter.processDefinitionKey?

[`ProcessDefinitionKeyFilterProperty`](../type-aliases/ProcessDefinitionKeyFilterProperty.md)

The process definition key associated with this correlated message subscription. This only works for data created with 8.9 and later.

###### filter.processInstanceKey?

[`ProcessInstanceKeyFilterProperty`](../type-aliases/ProcessInstanceKeyFilterProperty.md)

The process instance key associated with this message subscription.

###### filter.tenantId?

[`StringFilterProperty`](../type-aliases/StringFilterProperty.md)

The unique external tenant ID.

###### page?

[`CursorForwardPagination`](../type-aliases/CursorForwardPagination.md)

##### consistencyManagement

[`getProcessDefinitionMessageSubscriptionStatisticsConsistency`](../type-aliases/getProcessDefinitionMessageSubscriptionStatisticsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ProcessDefinitionMessageSubscriptionStatisticsQueryResult`](../type-aliases/ProcessDefinitionMessageSubscriptionStatisticsQueryResult.md)\>

#### Operation Id

getProcessDefinitionMessageSubscriptionStatistics

#### Tags

Process definition

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getProcessDefinitionStatistics()

```ts
getProcessDefinitionStatistics(input, consistencyManagement): CancelablePromise<ProcessDefinitionElementStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6310](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L6310)

Get process definition statistics

Get statistics about elements in currently running process instances by process definition key and search filter.

-

#### Parameters

##### input

[`getProcessDefinitionStatisticsInput`](../type-aliases/getProcessDefinitionStatisticsInput.md)

##### consistencyManagement

[`getProcessDefinitionStatisticsConsistency`](../type-aliases/getProcessDefinitionStatisticsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ProcessDefinitionElementStatisticsQueryResult`](../type-aliases/ProcessDefinitionElementStatisticsQueryResult.md)\>

#### Operation Id

getProcessDefinitionStatistics

#### Tags

Process definition

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getProcessDefinitionXml()

```ts
getProcessDefinitionXml(input, consistencyManagement): CancelablePromise<string>;
```

Defined in: [gen/CamundaClient.ts:6375](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L6375)

Get process definition XML

Returns process definition as XML.

-

#### Parameters

##### input

[`getProcessDefinitionXmlInput`](../type-aliases/getProcessDefinitionXmlInput.md)

##### consistencyManagement

[`getProcessDefinitionXmlConsistency`](../type-aliases/getProcessDefinitionXmlConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`string`\>

#### Operation Id

getProcessDefinitionXML

#### Tags

Process definition

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getProcessInstance()

```ts
getProcessInstance(input, consistencyManagement): CancelablePromise<{
  endDate?: string;
  hasIncident: boolean;
  parentElementInstanceKey?: ElementInstanceKey;
  parentProcessInstanceKey?: ProcessInstanceKey;
  processDefinitionId: ProcessDefinitionId;
  processDefinitionKey: ProcessDefinitionKey;
  processDefinitionName: string;
  processDefinitionVersion: number;
  processDefinitionVersionTag?: string;
  processInstanceKey: ProcessInstanceKey;
  rootProcessInstanceKey?: ProcessInstanceKey;
  startDate: string;
  state: ProcessInstanceStateEnum;
  tags?: TagSet;
  tenantId: TenantId;
}>;
```

Defined in: [gen/CamundaClient.ts:6440](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L6440)

Get process instance

Get the process instance by the process instance key.

-

#### Parameters

##### input

[`getProcessInstanceInput`](../type-aliases/getProcessInstanceInput.md)

##### consistencyManagement

[`getProcessInstanceConsistency`](../type-aliases/getProcessInstanceConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`endDate?`: `string`;
`hasIncident`: `boolean`;
`parentElementInstanceKey?`: [`ElementInstanceKey`](../type-aliases/ElementInstanceKey.md);
`parentProcessInstanceKey?`: [`ProcessInstanceKey`](../type-aliases/ProcessInstanceKey.md);
`processDefinitionId`: [`ProcessDefinitionId`](../type-aliases/ProcessDefinitionId.md);
`processDefinitionKey`: [`ProcessDefinitionKey`](../type-aliases/ProcessDefinitionKey.md);
`processDefinitionName`: `string`;
`processDefinitionVersion`: `number`;
`processDefinitionVersionTag?`: `string`;
`processInstanceKey`: [`ProcessInstanceKey`](../type-aliases/ProcessInstanceKey.md);
`rootProcessInstanceKey?`: [`ProcessInstanceKey`](../type-aliases/ProcessInstanceKey.md);
`startDate`: `string`;
`state`: [`ProcessInstanceStateEnum`](../type-aliases/ProcessInstanceStateEnum.md);
`tags?`: [`TagSet`](../type-aliases/TagSet.md);
`tenantId`: [`TenantId`](../type-aliases/TenantId.md);
\}\>

#### Example

```ts
async function getProcessInstanceExample() {
  const camunda = createCamundaClient();

  const processInstanceKey =
    ProcessInstanceKey.assumeExists("2251799813685249");

  const instance = await camunda.getProcessInstance(
    { processInstanceKey },
    { consistency: { waitUpToMs: 5000 } }
  );

  console.log(`State: ${instance.state}`);
  console.log(`Process: ${instance.processDefinitionId}`);
}
```

#### Operation Id

getProcessInstance

#### Tags

Process instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getProcessInstanceCallHierarchy()

```ts
getProcessInstanceCallHierarchy(input, consistencyManagement): CancelablePromise<ProcessInstanceCallHierarchyEntry[]>;
```

Defined in: [gen/CamundaClient.ts:6503](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L6503)

Get call hierarchy

Returns the call hierarchy for a given process instance, showing its ancestry up to the root instance.

-

#### Parameters

##### input

[`getProcessInstanceCallHierarchyInput`](../type-aliases/getProcessInstanceCallHierarchyInput.md)

##### consistencyManagement

[`getProcessInstanceCallHierarchyConsistency`](../type-aliases/getProcessInstanceCallHierarchyConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ProcessInstanceCallHierarchyEntry`](../type-aliases/ProcessInstanceCallHierarchyEntry.md)[]\>

#### Operation Id

getProcessInstanceCallHierarchy

#### Tags

Process instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getProcessInstanceSequenceFlows()

```ts
getProcessInstanceSequenceFlows(input, consistencyManagement): CancelablePromise<{
  items?: object[];
}>;
```

Defined in: [gen/CamundaClient.ts:6566](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L6566)

Get sequence flows

Get sequence flows taken by the process instance.

-

#### Parameters

##### input

[`getProcessInstanceSequenceFlowsInput`](../type-aliases/getProcessInstanceSequenceFlowsInput.md)

##### consistencyManagement

[`getProcessInstanceSequenceFlowsConsistency`](../type-aliases/getProcessInstanceSequenceFlowsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
\}\>

#### Operation Id

getProcessInstanceSequenceFlows

#### Tags

Process instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getProcessInstanceStatistics()

```ts
getProcessInstanceStatistics(input, consistencyManagement): CancelablePromise<ProcessInstanceElementStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6629](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L6629)

Get element instance statistics

Get statistics about elements by the process instance key.

-

#### Parameters

##### input

[`getProcessInstanceStatisticsInput`](../type-aliases/getProcessInstanceStatisticsInput.md)

##### consistencyManagement

[`getProcessInstanceStatisticsConsistency`](../type-aliases/getProcessInstanceStatisticsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ProcessInstanceElementStatisticsQueryResult`](../type-aliases/ProcessInstanceElementStatisticsQueryResult.md)\>

#### Operation Id

getProcessInstanceStatistics

#### Tags

Process instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getProcessInstanceStatisticsByDefinition()

```ts
getProcessInstanceStatisticsByDefinition(input, consistencyManagement): CancelablePromise<IncidentProcessInstanceStatisticsByDefinitionQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6695](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L6695)

Get process instance statistics by definition

Returns statistics for active process instances with incidents, grouped by process
definition. The result set is scoped to a specific incident error hash code, which must be
provided as a filter in the request body.

-

#### Parameters

##### input

[`IncidentProcessInstanceStatisticsByDefinitionQuery`](../type-aliases/IncidentProcessInstanceStatisticsByDefinitionQuery.md)

##### consistencyManagement

[`getProcessInstanceStatisticsByDefinitionConsistency`](../type-aliases/getProcessInstanceStatisticsByDefinitionConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`IncidentProcessInstanceStatisticsByDefinitionQueryResult`](../type-aliases/IncidentProcessInstanceStatisticsByDefinitionQueryResult.md)\>

#### Operation Id

getProcessInstanceStatisticsByDefinition

#### Tags

Incident

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getProcessInstanceStatisticsByError()

```ts
getProcessInstanceStatisticsByError(input, consistencyManagement): CancelablePromise<IncidentProcessInstanceStatisticsByErrorQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6760](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L6760)

Get process instance statistics by error

Returns statistics for active process instances that currently have active incidents,
grouped by incident error hash code.

-

#### Parameters

##### input

[`IncidentProcessInstanceStatisticsByErrorQuery`](../type-aliases/IncidentProcessInstanceStatisticsByErrorQuery.md)

##### consistencyManagement

[`getProcessInstanceStatisticsByErrorConsistency`](../type-aliases/getProcessInstanceStatisticsByErrorConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`IncidentProcessInstanceStatisticsByErrorQueryResult`](../type-aliases/IncidentProcessInstanceStatisticsByErrorQueryResult.md)\>

#### Operation Id

getProcessInstanceStatisticsByError

#### Tags

Incident

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getResource()

```ts
getResource(input): CancelablePromise<ResourceResult>;
```

Defined in: [gen/CamundaClient.ts:6826](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L6826)

Get resource

Returns a deployed resource.
:::info
Currently, this endpoint only supports RPA resources.
:::

-

#### Parameters

##### input

[`getResourceInput`](../type-aliases/getResourceInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ResourceResult`](../type-aliases/ResourceResult.md)\>

#### Operation Id

getResource

#### Tags

Resource

---

### getResourceContent()

```ts
getResourceContent(input): CancelablePromise<Blob>;
```

Defined in: [gen/CamundaClient.ts:6888](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L6888)

Get resource content

Returns the content of a deployed resource.
:::info
Currently, this endpoint only supports RPA resources.
:::

-

#### Parameters

##### input

[`getResourceContentInput`](../type-aliases/getResourceContentInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`Blob`\>

#### Operation Id

getResourceContent

#### Tags

Resource

---

### getRole()

```ts
getRole(input, consistencyManagement): CancelablePromise<RoleResult>;
```

Defined in: [gen/CamundaClient.ts:6947](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L6947)

Get role

Get a role by its ID.

-

#### Parameters

##### input

[`getRoleInput`](../type-aliases/getRoleInput.md)

##### consistencyManagement

[`getRoleConsistency`](../type-aliases/getRoleConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`RoleResult`](../type-aliases/RoleResult.md)\>

#### Operation Id

getRole

#### Tags

Role

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getStartProcessForm()

```ts
getStartProcessForm(input, consistencyManagement): CancelablePromise<
  | void
  | {
  formId?: FormId;
  formKey?: FormKey;
  schema?: {
   [key: string]: unknown;
  };
  tenantId?: TenantId;
  version?: number;
}>;
```

Defined in: [gen/CamundaClient.ts:7012](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L7012)

Get process start form

Get the start form of a process.
Note that this endpoint will only return linked forms. This endpoint does not support embedded forms.

-

#### Parameters

##### input

[`getStartProcessFormInput`](../type-aliases/getStartProcessFormInput.md)

##### consistencyManagement

[`getStartProcessFormConsistency`](../type-aliases/getStartProcessFormConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<
\| `void`
\| \{
`formId?`: [`FormId`](../type-aliases/FormId.md);
`formKey?`: [`FormKey`](../type-aliases/FormKey.md);
`schema?`: \{
\[`key`: `string`\]: `unknown`;
\};
`tenantId?`: [`TenantId`](../type-aliases/TenantId.md);
`version?`: `number`;
\}\>

#### Operation Id

getStartProcessForm

#### Tags

Process definition

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getStatus()

```ts
getStatus(): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:7074](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L7074)

Get cluster status

Checks the health status of the cluster by verifying if there's at least one partition with a healthy leader.

-

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

getStatus

#### Tags

Cluster

---

### getTenant()

```ts
getTenant(input, consistencyManagement): CancelablePromise<TenantResult>;
```

Defined in: [gen/CamundaClient.ts:7124](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L7124)

Get tenant

Retrieves a single tenant by tenant ID.

-

#### Parameters

##### input

[`getTenantInput`](../type-aliases/getTenantInput.md)

##### consistencyManagement

[`getTenantConsistency`](../type-aliases/getTenantConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`TenantResult`](../type-aliases/TenantResult.md)\>

#### Operation Id

getTenant

#### Tags

Tenant

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getTenantClusterVariable()

```ts
getTenantClusterVariable(input, consistencyManagement): CancelablePromise<ClusterVariableResult>;
```

Defined in: [gen/CamundaClient.ts:7187](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L7187)

Get a tenant-scoped cluster variable

Get a tenant-scoped cluster variable.

-

#### Parameters

##### input

[`getTenantClusterVariableInput`](../type-aliases/getTenantClusterVariableInput.md)

##### consistencyManagement

[`getTenantClusterVariableConsistency`](../type-aliases/getTenantClusterVariableConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ClusterVariableResult`](../type-aliases/ClusterVariableResult.md)\>

#### Operation Id

getTenantClusterVariable

#### Tags

Cluster Variable

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getTopology()

```ts
getTopology(): CancelablePromise<TopologyResponse>;
```

Defined in: [gen/CamundaClient.ts:7251](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L7251)

Get cluster topology

Obtains the current topology of the cluster the gateway is part of.

-

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`TopologyResponse`](../type-aliases/TopologyResponse.md)\>

#### Example

```ts
async function getTopologyExample() {
  const camunda = createCamundaClient();

  const topology = await camunda.getTopology();

  console.log(`Cluster size: ${topology.clusterSize}`);
  console.log(`Partitions: ${topology.partitionsCount}`);
  for (const broker of topology.brokers ?? []) {
    console.log(`  Broker ${broker.nodeId}: ${broker.host}:${broker.port}`);
  }
}
```

#### Operation Id

getTopology

#### Tags

Cluster

---

### getUsageMetrics()

```ts
getUsageMetrics(input, consistencyManagement): CancelablePromise<UsageMetricsResponse>;
```

Defined in: [gen/CamundaClient.ts:7301](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L7301)

Get usage metrics

Retrieve the usage metrics based on given criteria.

-

#### Parameters

##### input

[`getUsageMetricsInput`](../type-aliases/getUsageMetricsInput.md)

##### consistencyManagement

[`getUsageMetricsConsistency`](../type-aliases/getUsageMetricsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`UsageMetricsResponse`](../type-aliases/UsageMetricsResponse.md)\>

#### Operation Id

getUsageMetrics

#### Tags

System

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getUser()

```ts
getUser(input, consistencyManagement): CancelablePromise<UserResult>;
```

Defined in: [gen/CamundaClient.ts:7364](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L7364)

Get user

Get a user by its username.

-

#### Parameters

##### input

[`getUserInput`](../type-aliases/getUserInput.md)

##### consistencyManagement

[`getUserConsistency`](../type-aliases/getUserConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`UserResult`](../type-aliases/UserResult.md)\>

#### Operation Id

getUser

#### Tags

User

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getUserTask()

```ts
getUserTask(input, consistencyManagement): CancelablePromise<{
  assignee?: string;
  candidateGroups?: string[];
  candidateUsers?: string[];
  completionDate?: string;
  creationDate?: string;
  customHeaders?: {
   [key: string]: string;
  };
  dueDate?: string;
  elementId?: ElementId;
  elementInstanceKey?: ElementInstanceKey;
  externalFormReference?: string;
  followUpDate?: string;
  formKey?: FormKey;
  name?: string;
  priority?: number;
  processDefinitionId?: ProcessDefinitionId;
  processDefinitionKey?: ProcessDefinitionKey;
  processDefinitionVersion?: number;
  processInstanceKey?: ProcessInstanceKey;
  processName?: string;
  rootProcessInstanceKey?: ProcessInstanceKey;
  state?: UserTaskStateEnum;
  tags?: TagSet;
  tenantId?: TenantId;
  userTaskKey?: UserTaskKey;
}>;
```

Defined in: [gen/CamundaClient.ts:7427](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L7427)

Get user task

Get the user task by the user task key.

-

#### Parameters

##### input

[`getUserTaskInput`](../type-aliases/getUserTaskInput.md)

##### consistencyManagement

[`getUserTaskConsistency`](../type-aliases/getUserTaskConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`assignee?`: `string`;
`candidateGroups?`: `string`[];
`candidateUsers?`: `string`[];
`completionDate?`: `string`;
`creationDate?`: `string`;
`customHeaders?`: \{
\[`key`: `string`\]: `string`;
\};
`dueDate?`: `string`;
`elementId?`: [`ElementId`](../type-aliases/ElementId.md);
`elementInstanceKey?`: [`ElementInstanceKey`](../type-aliases/ElementInstanceKey.md);
`externalFormReference?`: `string`;
`followUpDate?`: `string`;
`formKey?`: [`FormKey`](../type-aliases/FormKey.md);
`name?`: `string`;
`priority?`: `number`;
`processDefinitionId?`: [`ProcessDefinitionId`](../type-aliases/ProcessDefinitionId.md);
`processDefinitionKey?`: [`ProcessDefinitionKey`](../type-aliases/ProcessDefinitionKey.md);
`processDefinitionVersion?`: `number`;
`processInstanceKey?`: [`ProcessInstanceKey`](../type-aliases/ProcessInstanceKey.md);
`processName?`: `string`;
`rootProcessInstanceKey?`: [`ProcessInstanceKey`](../type-aliases/ProcessInstanceKey.md);
`state?`: [`UserTaskStateEnum`](../type-aliases/UserTaskStateEnum.md);
`tags?`: [`TagSet`](../type-aliases/TagSet.md);
`tenantId?`: [`TenantId`](../type-aliases/TenantId.md);
`userTaskKey?`: [`UserTaskKey`](../type-aliases/UserTaskKey.md);
\}\>

#### Operation Id

getUserTask

#### Tags

User task

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getUserTaskForm()

```ts
getUserTaskForm(input, consistencyManagement): CancelablePromise<
  | void
  | {
  formId?: FormId;
  formKey?: FormKey;
  schema?: {
   [key: string]: unknown;
  };
  tenantId?: TenantId;
  version?: number;
}>;
```

Defined in: [gen/CamundaClient.ts:7492](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L7492)

Get user task form

Get the form of a user task.
Note that this endpoint will only return linked forms. This endpoint does not support embedded forms.

-

#### Parameters

##### input

[`getUserTaskFormInput`](../type-aliases/getUserTaskFormInput.md)

##### consistencyManagement

[`getUserTaskFormConsistency`](../type-aliases/getUserTaskFormConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<
\| `void`
\| \{
`formId?`: [`FormId`](../type-aliases/FormId.md);
`formKey?`: [`FormKey`](../type-aliases/FormKey.md);
`schema?`: \{
\[`key`: `string`\]: `unknown`;
\};
`tenantId?`: [`TenantId`](../type-aliases/TenantId.md);
`version?`: `number`;
\}\>

#### Operation Id

getUserTaskForm

#### Tags

User task

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getVariable()

```ts
getVariable(input, consistencyManagement): CancelablePromise<object & object>;
```

Defined in: [gen/CamundaClient.ts:7555](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L7555)

Get variable

Get the variable by the variable key.

-

#### Parameters

##### input

[`getVariableInput`](../type-aliases/getVariableInput.md)

##### consistencyManagement

[`getVariableConsistency`](../type-aliases/getVariableConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`object` & `object`\>

#### Operation Id

getVariable

#### Tags

Variable

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### getWorkers()

```ts
getWorkers(): any[];
```

Defined in: [gen/CamundaClient.ts:1552](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1552)

Return a read-only snapshot of currently registered job workers.

#### Returns

`any`[]

---

### logger()

```ts
logger(scope?): Logger;
```

Defined in: [gen/CamundaClient.ts:1449](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1449)

Access a scoped logger (internal & future user emission).

#### Parameters

##### scope?

`string`

#### Returns

[`Logger`](../../logger/interfaces/Logger.md)

---

### migrateProcessInstance()

```ts
migrateProcessInstance(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:7624](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L7624)

Migrate process instance

Migrates a process instance to a new process definition.
This request can contain multiple mapping instructions to define mapping between the active
process instance's elements and target process definition elements.

Use this to upgrade a process instance to a new version of a process or to
a different process definition, e.g. to keep your running instances up-to-date with the
latest process improvements.

-

#### Parameters

##### input

[`migrateProcessInstanceInput`](../type-aliases/migrateProcessInstanceInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

migrateProcessInstance

#### Tags

Process instance

---

### migrateProcessInstancesBatchOperation()

```ts
migrateProcessInstancesBatchOperation(input, consistencyManagement): CancelablePromise<BatchOperationCreatedResult>;
```

Defined in: [gen/CamundaClient.ts:7689](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L7689)

Migrate process instances (batch)

Migrate multiple process instances.
Since only process instances with ACTIVE state can be migrated, any given
filters for state are ignored and overridden during this batch operation.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

-

#### Parameters

##### input

###### filter

[`ProcessInstanceFilter`](../type-aliases/ProcessInstanceFilter.md)

The process instance filter.

###### migrationPlan

[`ProcessInstanceMigrationBatchOperationPlan`](../type-aliases/ProcessInstanceMigrationBatchOperationPlan.md)

The migration plan.

###### operationReference?

`number`

##### consistencyManagement

[`migrateProcessInstancesBatchOperationConsistency`](../type-aliases/migrateProcessInstancesBatchOperationConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`BatchOperationCreatedResult`](../type-aliases/BatchOperationCreatedResult.md)\>

#### Operation Id

migrateProcessInstancesBatchOperation

#### Tags

Process instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### modifyProcessInstance()

```ts
modifyProcessInstance(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:7757](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L7757)

Modify process instance

Modifies a running process instance.
This request can contain multiple instructions to activate an element of the process or
to terminate an active instance of an element.

Use this to repair a process instance that is stuck on an element or took an unintended path.
For example, because an external system is not available or doesn't respond as expected.

-

#### Parameters

##### input

[`modifyProcessInstanceInput`](../type-aliases/modifyProcessInstanceInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

modifyProcessInstance

#### Tags

Process instance

---

### modifyProcessInstancesBatchOperation()

```ts
modifyProcessInstancesBatchOperation(input, consistencyManagement): CancelablePromise<BatchOperationCreatedResult>;
```

Defined in: [gen/CamundaClient.ts:7824](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L7824)

Modify process instances (batch)

Modify multiple process instances.
Since only process instances with ACTIVE state can be modified, any given
filters for state are ignored and overridden during this batch operation.
In contrast to single modification operation, it is not possible to add variable instructions or modify by element key.
It is only possible to use the element id of the source and target.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

-

#### Parameters

##### input

###### filter

[`ProcessInstanceFilter`](../type-aliases/ProcessInstanceFilter.md)

The process instance filter.

###### moveInstructions

[`ProcessInstanceModificationMoveBatchOperationInstruction`](../type-aliases/ProcessInstanceModificationMoveBatchOperationInstruction.md)[]

Instructions for moving tokens between elements.

###### operationReference?

`number`

##### consistencyManagement

[`modifyProcessInstancesBatchOperationConsistency`](../type-aliases/modifyProcessInstancesBatchOperationConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`BatchOperationCreatedResult`](../type-aliases/BatchOperationCreatedResult.md)\>

#### Operation Id

modifyProcessInstancesBatchOperation

#### Tags

Process instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### onAuthHeaders()

```ts
onAuthHeaders(h): void;
```

Defined in: [gen/CamundaClient.ts:1441](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1441)

#### Parameters

##### h

(`headers`) =>
\| `Record`\<`string`, `string`\>
\| `Promise`\<`Record`\<`string`, `string`\>\>

#### Returns

`void`

---

### pinClock()

```ts
pinClock(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:7892](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L7892)

Pin internal clock (alpha)

Set a precise, static time for the Zeebe engine's internal clock.
When the clock is pinned, it remains at the specified time and does not advance.
To change the time, the clock must be pinned again with a new timestamp.

This endpoint is an alpha feature and may be subject to change
in future releases.

-

#### Parameters

##### input

[`ClockPinRequest`](../type-aliases/ClockPinRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

pinClock

#### Tags

Clock

---

### publishMessage()

```ts
publishMessage(input): CancelablePromise<{
  messageKey?: MessageKey;
  tenantId?: TenantId;
}>;
```

Defined in: [gen/CamundaClient.ts:7957](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L7957)

Publish message

Publishes a single message.
Messages are published to specific partitions computed from their correlation keys.
Messages can be buffered.
The endpoint does not wait for a correlation result.
Use the message correlation endpoint for such use cases.

-

#### Parameters

##### input

[`MessagePublicationRequest`](../type-aliases/MessagePublicationRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`messageKey?`: [`MessageKey`](../type-aliases/MessageKey.md);
`tenantId?`: [`TenantId`](../type-aliases/TenantId.md);
\}\>

#### Example

```ts
async function publishMessageExample() {
  const camunda = createCamundaClient();

  await camunda.publishMessage({
    name: "order-payment-received",
    correlationKey: "ORD-12345",
    timeToLive: 60000,
    variables: {
      paymentId: "PAY-123",
    },
  });
}
```

#### Operation Id

publishMessage

#### Tags

Message

---

### resetClock()

```ts
resetClock(): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:8025](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L8025)

Reset internal clock (alpha)

Resets the Zeebe engine's internal clock to the current system time, enabling it to tick in real-time.
This operation is useful for returning the clock to
normal behavior after it has been pinned to a specific time.

This endpoint is an alpha feature and may be subject to change
in future releases.

-

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

resetClock

#### Tags

Clock

---

### resolveIncident()

```ts
resolveIncident(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:8078](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L8078)

Resolve incident

Marks the incident as resolved; most likely a call to Update job will be necessary
to reset the job's retries, followed by this call.

-

#### Parameters

##### input

[`resolveIncidentInput`](../type-aliases/resolveIncidentInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Example

```ts
async function resolveIncidentExample() {
  const camunda = createCamundaClient();

  const incidentKey = IncidentKey.assumeExists("2251799813685249");

  await camunda.resolveIncident({ incidentKey });
}
```

#### Operation Id

resolveIncident

#### Tags

Incident

---

### resolveIncidentsBatchOperation()

```ts
resolveIncidentsBatchOperation(input, consistencyManagement): CancelablePromise<BatchOperationCreatedResult>;
```

Defined in: [gen/CamundaClient.ts:8143](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L8143)

Resolve related incidents (batch)

Resolves multiple instances of process instances.
Since only process instances with ACTIVE state can have unresolved incidents, any given
filters for state are ignored and overridden during this batch operation.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

-

#### Parameters

##### input

###### filter

[`ProcessInstanceFilter`](../type-aliases/ProcessInstanceFilter.md)

The process instance filter.

###### operationReference?

`number`

##### consistencyManagement

[`resolveIncidentsBatchOperationConsistency`](../type-aliases/resolveIncidentsBatchOperationConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`BatchOperationCreatedResult`](../type-aliases/BatchOperationCreatedResult.md)\>

#### Operation Id

resolveIncidentsBatchOperation

#### Tags

Process instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### resolveProcessInstanceIncidents()

```ts
resolveProcessInstanceIncidents(input, consistencyManagement): CancelablePromise<BatchOperationCreatedResult>;
```

Defined in: [gen/CamundaClient.ts:8206](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L8206)

Resolve related incidents

Creates a batch operation to resolve multiple incidents of a process instance.

-

#### Parameters

##### input

[`resolveProcessInstanceIncidentsInput`](../type-aliases/resolveProcessInstanceIncidentsInput.md)

##### consistencyManagement

[`resolveProcessInstanceIncidentsConsistency`](../type-aliases/resolveProcessInstanceIncidentsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`BatchOperationCreatedResult`](../type-aliases/BatchOperationCreatedResult.md)\>

#### Operation Id

resolveProcessInstanceIncidents

#### Tags

Process instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### resumeBatchOperation()

```ts
resumeBatchOperation(input, consistencyManagement): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:8271](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L8271)

Resume Batch operation

Resumes a suspended batch operation.
This is done asynchronously, the progress can be tracked using the batch operation status endpoint (/batch-operations/{batchOperationKey}).

-

#### Parameters

##### input

###### batchOperationKey

[`BatchOperationKey`](../type-aliases/BatchOperationKey.md)

##### consistencyManagement

[`resumeBatchOperationConsistency`](../type-aliases/resumeBatchOperationConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

resumeBatchOperation

#### Tags

Batch operation

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchAuditLogs()

```ts
searchAuditLogs(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:8336](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L8336)

Search audit logs

Search for audit logs based on given criteria.

-

#### Parameters

##### input

[`AuditLogSearchQueryRequest`](../type-aliases/AuditLogSearchQueryRequest.md)

##### consistencyManagement

[`searchAuditLogsConsistency`](../type-aliases/searchAuditLogsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchAuditLogs

#### Tags

Audit Log

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchAuthorizations()

```ts
searchAuthorizations(input, consistencyManagement): CancelablePromise<AuthorizationSearchResult>;
```

Defined in: [gen/CamundaClient.ts:8399](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L8399)

Search authorizations

Search for authorizations based on given criteria.

-

#### Parameters

##### input

[`AuthorizationSearchQuery`](../type-aliases/AuthorizationSearchQuery.md)

##### consistencyManagement

[`searchAuthorizationsConsistency`](../type-aliases/searchAuthorizationsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`AuthorizationSearchResult`](../type-aliases/AuthorizationSearchResult.md)\>

#### Operation Id

searchAuthorizations

#### Tags

Authorization

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchBatchOperationItems()

```ts
searchBatchOperationItems(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:8462](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L8462)

Search batch operation items

Search for batch operation items based on given criteria.

-

#### Parameters

##### input

[`SearchQueryRequest`](../type-aliases/SearchQueryRequest.md) & `object`

##### consistencyManagement

[`searchBatchOperationItemsConsistency`](../type-aliases/searchBatchOperationItemsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchBatchOperationItems

#### Tags

Batch operation

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchBatchOperations()

```ts
searchBatchOperations(input, consistencyManagement): CancelablePromise<BatchOperationSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:8525](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L8525)

Search batch operations

Search for batch operations based on given criteria.

-

#### Parameters

##### input

[`SearchQueryRequest`](../type-aliases/SearchQueryRequest.md) & `object`

##### consistencyManagement

[`searchBatchOperationsConsistency`](../type-aliases/searchBatchOperationsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`BatchOperationSearchQueryResult`](../type-aliases/BatchOperationSearchQueryResult.md)\>

#### Operation Id

searchBatchOperations

#### Tags

Batch operation

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchClientsForGroup()

```ts
searchClientsForGroup(input, consistencyManagement): CancelablePromise<TenantClientSearchResult>;
```

Defined in: [gen/CamundaClient.ts:8588](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L8588)

Search group clients

Search clients assigned to a group.

-

#### Parameters

##### input

[`searchClientsForGroupInput`](../type-aliases/searchClientsForGroupInput.md)

##### consistencyManagement

[`searchClientsForGroupConsistency`](../type-aliases/searchClientsForGroupConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`TenantClientSearchResult`](../type-aliases/TenantClientSearchResult.md)\>

#### Operation Id

searchClientsForGroup

#### Tags

Group

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchClientsForRole()

```ts
searchClientsForRole(input, consistencyManagement): CancelablePromise<TenantClientSearchResult>;
```

Defined in: [gen/CamundaClient.ts:8653](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L8653)

Search role clients

Search clients with assigned role.

-

#### Parameters

##### input

[`searchClientsForRoleInput`](../type-aliases/searchClientsForRoleInput.md)

##### consistencyManagement

[`searchClientsForRoleConsistency`](../type-aliases/searchClientsForRoleConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`TenantClientSearchResult`](../type-aliases/TenantClientSearchResult.md)\>

#### Operation Id

searchClientsForRole

#### Tags

Role

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchClientsForTenant()

```ts
searchClientsForTenant(input, consistencyManagement): CancelablePromise<TenantClientSearchResult>;
```

Defined in: [gen/CamundaClient.ts:8718](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L8718)

Search clients for tenant

Retrieves a filtered and sorted list of clients for a specified tenant.

-

#### Parameters

##### input

[`searchClientsForTenantInput`](../type-aliases/searchClientsForTenantInput.md)

##### consistencyManagement

[`searchClientsForTenantConsistency`](../type-aliases/searchClientsForTenantConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`TenantClientSearchResult`](../type-aliases/TenantClientSearchResult.md)\>

#### Operation Id

searchClientsForTenant

#### Tags

Tenant

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchClusterVariables()

```ts
searchClusterVariables(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:8781](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L8781)

Search for cluster variables based on given criteria. By default, long variable values in the response are truncated.

-

#### Parameters

##### input

[`searchClusterVariablesInput`](../type-aliases/searchClusterVariablesInput.md)

##### consistencyManagement

[`searchClusterVariablesConsistency`](../type-aliases/searchClusterVariablesConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchClusterVariables

#### Tags

Cluster Variable

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchCorrelatedMessageSubscriptions()

```ts
searchCorrelatedMessageSubscriptions(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:8846](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L8846)

Search correlated message subscriptions

Search correlated message subscriptions based on given criteria.

-

#### Parameters

##### input

[`CorrelatedMessageSubscriptionSearchQuery`](../type-aliases/CorrelatedMessageSubscriptionSearchQuery.md)

##### consistencyManagement

[`searchCorrelatedMessageSubscriptionsConsistency`](../type-aliases/searchCorrelatedMessageSubscriptionsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchCorrelatedMessageSubscriptions

#### Tags

Message subscription

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchDecisionDefinitions()

```ts
searchDecisionDefinitions(input, consistencyManagement): CancelablePromise<DecisionDefinitionSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:8911](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L8911)

Search decision definitions

Search for decision definitions based on given criteria.

-

#### Parameters

##### input

[`DecisionDefinitionSearchQuery`](../type-aliases/DecisionDefinitionSearchQuery.md)

##### consistencyManagement

[`searchDecisionDefinitionsConsistency`](../type-aliases/searchDecisionDefinitionsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`DecisionDefinitionSearchQueryResult`](../type-aliases/DecisionDefinitionSearchQueryResult.md)\>

#### Example

```ts
async function searchDecisionDefinitionsExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchDecisionDefinitions(
    {
      filter: {
        decisionDefinitionId: DecisionDefinitionId.assumeExists(
          "invoice-classification"
        ),
      },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const definition of result.items ?? []) {
    console.log(`${definition.decisionDefinitionId} v${definition.version}`);
  }
}
```

#### Operation Id

searchDecisionDefinitions

#### Tags

Decision definition

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchDecisionInstances()

```ts
searchDecisionInstances(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:8974](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L8974)

Search decision instances

Search for decision instances based on given criteria.

-

#### Parameters

##### input

[`SearchQueryRequest`](../type-aliases/SearchQueryRequest.md) & `object`

##### consistencyManagement

[`searchDecisionInstancesConsistency`](../type-aliases/searchDecisionInstancesConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchDecisionInstances

#### Tags

Decision instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchDecisionRequirements()

```ts
searchDecisionRequirements(input, consistencyManagement): CancelablePromise<DecisionRequirementsSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9037](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L9037)

Search decision requirements

Search for decision requirements based on given criteria.

-

#### Parameters

##### input

[`DecisionRequirementsSearchQuery`](../type-aliases/DecisionRequirementsSearchQuery.md)

##### consistencyManagement

[`searchDecisionRequirementsConsistency`](../type-aliases/searchDecisionRequirementsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`DecisionRequirementsSearchQueryResult`](../type-aliases/DecisionRequirementsSearchQueryResult.md)\>

#### Operation Id

searchDecisionRequirements

#### Tags

Decision requirements

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchElementInstanceIncidents()

```ts
searchElementInstanceIncidents(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:9107](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L9107)

Search for incidents of a specific element instance

Search for incidents caused by the specified element instance, including incidents of any child instances created from this element instance.

Although the `elementInstanceKey` is provided as a path parameter to indicate the root element instance,
you may also include an `elementInstanceKey` within the filter object to narrow results to specific
child element instances. This is useful, for example, if you want to isolate incidents associated with
nested or subordinate elements within the given element instance while excluding incidents directly tied
to the root element itself.

-

#### Parameters

##### input

[`searchElementInstanceIncidentsInput`](../type-aliases/searchElementInstanceIncidentsInput.md)

##### consistencyManagement

[`searchElementInstanceIncidentsConsistency`](../type-aliases/searchElementInstanceIncidentsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchElementInstanceIncidents

#### Tags

Element instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchElementInstances()

```ts
searchElementInstances(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:9172](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L9172)

Search element instances

Search for element instances based on given criteria.

-

#### Parameters

##### input

[`ElementInstanceSearchQuery`](../type-aliases/ElementInstanceSearchQuery.md)

##### consistencyManagement

[`searchElementInstancesConsistency`](../type-aliases/searchElementInstancesConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchElementInstances

#### Tags

Element instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchGroupIdsForTenant()

```ts
searchGroupIdsForTenant(input, consistencyManagement): CancelablePromise<TenantGroupSearchResult>;
```

Defined in: [gen/CamundaClient.ts:9235](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L9235)

Search groups for tenant

Retrieves a filtered and sorted list of groups for a specified tenant.

-

#### Parameters

##### input

[`searchGroupIdsForTenantInput`](../type-aliases/searchGroupIdsForTenantInput.md)

##### consistencyManagement

[`searchGroupIdsForTenantConsistency`](../type-aliases/searchGroupIdsForTenantConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`TenantGroupSearchResult`](../type-aliases/TenantGroupSearchResult.md)\>

#### Operation Id

searchGroupIdsForTenant

#### Tags

Tenant

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchGroups()

```ts
searchGroups(input, consistencyManagement): CancelablePromise<GroupSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9300](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L9300)

Search groups

Search for groups based on given criteria.

-

#### Parameters

##### input

[`GroupSearchQueryRequest`](../type-aliases/GroupSearchQueryRequest.md)

##### consistencyManagement

[`searchGroupsConsistency`](../type-aliases/searchGroupsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`GroupSearchQueryResult`](../type-aliases/GroupSearchQueryResult.md)\>

#### Operation Id

searchGroups

#### Tags

Group

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchGroupsForRole()

```ts
searchGroupsForRole(input, consistencyManagement): CancelablePromise<RoleGroupSearchResult>;
```

Defined in: [gen/CamundaClient.ts:9363](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L9363)

Search role groups

Search groups with assigned role.

-

#### Parameters

##### input

[`searchGroupsForRoleInput`](../type-aliases/searchGroupsForRoleInput.md)

##### consistencyManagement

[`searchGroupsForRoleConsistency`](../type-aliases/searchGroupsForRoleConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`RoleGroupSearchResult`](../type-aliases/RoleGroupSearchResult.md)\>

#### Operation Id

searchGroupsForRole

#### Tags

Role

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchIncidents()

```ts
searchIncidents(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:9431](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L9431)

Search incidents

Search for incidents based on given criteria.

-

#### Parameters

##### input

[`IncidentSearchQuery`](../type-aliases/IncidentSearchQuery.md)

##### consistencyManagement

[`searchIncidentsConsistency`](../type-aliases/searchIncidentsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Example

```ts
async function searchIncidentsExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchIncidents(
    {
      filter: { state: "ACTIVE" },
      sort: [{ field: "creationTime", order: "DESC" }],
      page: { limit: 20 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const incident of result.items ?? []) {
    console.log(
      `${incident.incidentKey}: ${incident.errorType} — ${incident.errorMessage}`
    );
  }
  console.log(`Total active incidents: ${result.page.totalItems}`);
}
```

#### Operation Id

searchIncidents

#### Tags

Incident

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchJobs()

```ts
searchJobs(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:9494](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L9494)

Search jobs

Search for jobs based on given criteria.

-

#### Parameters

##### input

[`JobSearchQuery`](../type-aliases/JobSearchQuery.md)

##### consistencyManagement

[`searchJobsConsistency`](../type-aliases/searchJobsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchJobs

#### Tags

Job

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchMappingRule()

```ts
searchMappingRule(input, consistencyManagement): CancelablePromise<MappingRuleSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9558](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L9558)

Search mapping rules

Search for mapping rules based on given criteria.

-

#### Parameters

##### input

[`MappingRuleSearchQueryRequest`](../type-aliases/MappingRuleSearchQueryRequest.md)

##### consistencyManagement

[`searchMappingRuleConsistency`](../type-aliases/searchMappingRuleConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`MappingRuleSearchQueryResult`](../type-aliases/MappingRuleSearchQueryResult.md)\>

#### Operation Id

searchMappingRule

#### Tags

Mapping rule

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchMappingRulesForGroup()

```ts
searchMappingRulesForGroup(input, consistencyManagement): CancelablePromise<SearchQueryResponse>;
```

Defined in: [gen/CamundaClient.ts:9621](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L9621)

Search group mapping rules

Search mapping rules assigned to a group.

-

#### Parameters

##### input

[`searchMappingRulesForGroupInput`](../type-aliases/searchMappingRulesForGroupInput.md)

##### consistencyManagement

[`searchMappingRulesForGroupConsistency`](../type-aliases/searchMappingRulesForGroupConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md)\>

#### Operation Id

searchMappingRulesForGroup

#### Tags

Group

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchMappingRulesForRole()

```ts
searchMappingRulesForRole(input, consistencyManagement): CancelablePromise<SearchQueryResponse>;
```

Defined in: [gen/CamundaClient.ts:9686](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L9686)

Search role mapping rules

Search mapping rules with assigned role.

-

#### Parameters

##### input

[`searchMappingRulesForRoleInput`](../type-aliases/searchMappingRulesForRoleInput.md)

##### consistencyManagement

[`searchMappingRulesForRoleConsistency`](../type-aliases/searchMappingRulesForRoleConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md)\>

#### Operation Id

searchMappingRulesForRole

#### Tags

Role

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchMappingRulesForTenant()

```ts
searchMappingRulesForTenant(input, consistencyManagement): CancelablePromise<SearchQueryResponse>;
```

Defined in: [gen/CamundaClient.ts:9751](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L9751)

Search mapping rules for tenant

Retrieves a filtered and sorted list of MappingRules for a specified tenant.

-

#### Parameters

##### input

[`searchMappingRulesForTenantInput`](../type-aliases/searchMappingRulesForTenantInput.md)

##### consistencyManagement

[`searchMappingRulesForTenantConsistency`](../type-aliases/searchMappingRulesForTenantConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md)\>

#### Operation Id

searchMappingRulesForTenant

#### Tags

Tenant

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchMessageSubscriptions()

```ts
searchMessageSubscriptions(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:9816](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L9816)

Search message subscriptions

Search for message subscriptions based on given criteria.

-

#### Parameters

##### input

[`SearchQueryRequest`](../type-aliases/SearchQueryRequest.md) & `object`

##### consistencyManagement

[`searchMessageSubscriptionsConsistency`](../type-aliases/searchMessageSubscriptionsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchMessageSubscriptions

#### Tags

Message subscription

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchProcessDefinitions()

```ts
searchProcessDefinitions(input, consistencyManagement): CancelablePromise<ProcessDefinitionSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9879](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L9879)

Search process definitions

Search for process definitions based on given criteria.

-

#### Parameters

##### input

[`SearchQueryRequest`](../type-aliases/SearchQueryRequest.md) & `object`

##### consistencyManagement

[`searchProcessDefinitionsConsistency`](../type-aliases/searchProcessDefinitionsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ProcessDefinitionSearchQueryResult`](../type-aliases/ProcessDefinitionSearchQueryResult.md)\>

#### Operation Id

searchProcessDefinitions

#### Tags

Process definition

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchProcessInstanceIncidents()

```ts
searchProcessInstanceIncidents(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:9948](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L9948)

Search related incidents

Search for incidents caused by the process instance or any of its called process or decision instances.

Although the `processInstanceKey` is provided as a path parameter to indicate the root process instance,
you may also include a `processInstanceKey` within the filter object to narrow results to specific
child process instances. This is useful, for example, if you want to isolate incidents associated with
subprocesses or called processes under the root instance while excluding incidents directly tied to the root.

-

#### Parameters

##### input

[`searchProcessInstanceIncidentsInput`](../type-aliases/searchProcessInstanceIncidentsInput.md)

##### consistencyManagement

[`searchProcessInstanceIncidentsConsistency`](../type-aliases/searchProcessInstanceIncidentsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchProcessInstanceIncidents

#### Tags

Process instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchProcessInstances()

```ts
searchProcessInstances(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:10015](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L10015)

Search process instances

Search for process instances based on given criteria.

-

#### Parameters

##### input

[`SearchQueryRequest`](../type-aliases/SearchQueryRequest.md) & `object`

##### consistencyManagement

[`searchProcessInstancesConsistency`](../type-aliases/searchProcessInstancesConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Example

```ts
async function searchProcessInstancesExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchProcessInstances(
    {
      filter: {
        processDefinitionId: ProcessDefinitionId.assumeExists("order-process"),
      },
      sort: [{ field: "startDate", order: "DESC" }],
      page: { limit: 10 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const instance of result.items ?? []) {
    console.log(`${instance.processInstanceKey}: ${instance.state}`);
  }
  console.log(`Total: ${result.page.totalItems}`);
}
```

#### Operation Id

searchProcessInstances

#### Tags

Process instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchRoles()

```ts
searchRoles(input, consistencyManagement): CancelablePromise<RoleSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:10078](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L10078)

Search roles

Search for roles based on given criteria.

-

#### Parameters

##### input

[`RoleSearchQueryRequest`](../type-aliases/RoleSearchQueryRequest.md)

##### consistencyManagement

[`searchRolesConsistency`](../type-aliases/searchRolesConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`RoleSearchQueryResult`](../type-aliases/RoleSearchQueryResult.md)\>

#### Operation Id

searchRoles

#### Tags

Role

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchRolesForGroup()

```ts
searchRolesForGroup(input, consistencyManagement): CancelablePromise<SearchQueryResponse>;
```

Defined in: [gen/CamundaClient.ts:10141](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L10141)

Search group roles

Search roles assigned to a group.

-

#### Parameters

##### input

[`searchRolesForGroupInput`](../type-aliases/searchRolesForGroupInput.md)

##### consistencyManagement

[`searchRolesForGroupConsistency`](../type-aliases/searchRolesForGroupConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md)\>

#### Operation Id

searchRolesForGroup

#### Tags

Group

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchRolesForTenant()

```ts
searchRolesForTenant(input, consistencyManagement): CancelablePromise<SearchQueryResponse>;
```

Defined in: [gen/CamundaClient.ts:10206](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L10206)

Search roles for tenant

Retrieves a filtered and sorted list of roles for a specified tenant.

-

#### Parameters

##### input

[`searchRolesForTenantInput`](../type-aliases/searchRolesForTenantInput.md)

##### consistencyManagement

[`searchRolesForTenantConsistency`](../type-aliases/searchRolesForTenantConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md)\>

#### Operation Id

searchRolesForTenant

#### Tags

Tenant

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchTenants()

```ts
searchTenants(input, consistencyManagement): CancelablePromise<TenantSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:10271](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L10271)

Search tenants

Retrieves a filtered and sorted list of tenants.

-

#### Parameters

##### input

[`SearchQueryRequest`](../type-aliases/SearchQueryRequest.md) & `object`

##### consistencyManagement

[`searchTenantsConsistency`](../type-aliases/searchTenantsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`TenantSearchQueryResult`](../type-aliases/TenantSearchQueryResult.md)\>

#### Operation Id

searchTenants

#### Tags

Tenant

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchUsers()

```ts
searchUsers(input, consistencyManagement): CancelablePromise<UserSearchResult>;
```

Defined in: [gen/CamundaClient.ts:10334](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L10334)

Search users

Search for users based on given criteria.

-

#### Parameters

##### input

[`SearchQueryRequest`](../type-aliases/SearchQueryRequest.md) & `object`

##### consistencyManagement

[`searchUsersConsistency`](../type-aliases/searchUsersConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`UserSearchResult`](../type-aliases/UserSearchResult.md)\>

#### Operation Id

searchUsers

#### Tags

User

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchUsersForGroup()

```ts
searchUsersForGroup(input, consistencyManagement): CancelablePromise<TenantUserSearchResult>;
```

Defined in: [gen/CamundaClient.ts:10397](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L10397)

Search group users

Search users assigned to a group.

-

#### Parameters

##### input

[`searchUsersForGroupInput`](../type-aliases/searchUsersForGroupInput.md)

##### consistencyManagement

[`searchUsersForGroupConsistency`](../type-aliases/searchUsersForGroupConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`TenantUserSearchResult`](../type-aliases/TenantUserSearchResult.md)\>

#### Operation Id

searchUsersForGroup

#### Tags

Group

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchUsersForRole()

```ts
searchUsersForRole(input, consistencyManagement): CancelablePromise<TenantUserSearchResult>;
```

Defined in: [gen/CamundaClient.ts:10462](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L10462)

Search role users

Search users with assigned role.

-

#### Parameters

##### input

[`searchUsersForRoleInput`](../type-aliases/searchUsersForRoleInput.md)

##### consistencyManagement

[`searchUsersForRoleConsistency`](../type-aliases/searchUsersForRoleConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`TenantUserSearchResult`](../type-aliases/TenantUserSearchResult.md)\>

#### Operation Id

searchUsersForRole

#### Tags

Role

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchUsersForTenant()

```ts
searchUsersForTenant(input, consistencyManagement): CancelablePromise<TenantUserSearchResult>;
```

Defined in: [gen/CamundaClient.ts:10527](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L10527)

Search users for tenant

Retrieves a filtered and sorted list of users for a specified tenant.

-

#### Parameters

##### input

[`searchUsersForTenantInput`](../type-aliases/searchUsersForTenantInput.md)

##### consistencyManagement

[`searchUsersForTenantConsistency`](../type-aliases/searchUsersForTenantConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`TenantUserSearchResult`](../type-aliases/TenantUserSearchResult.md)\>

#### Operation Id

searchUsersForTenant

#### Tags

Tenant

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchUserTaskAuditLogs()

```ts
searchUserTaskAuditLogs(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:10592](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L10592)

Search user task audit logs

Search for user task audit logs based on given criteria.

-

#### Parameters

##### input

[`searchUserTaskAuditLogsInput`](../type-aliases/searchUserTaskAuditLogsInput.md)

##### consistencyManagement

[`searchUserTaskAuditLogsConsistency`](../type-aliases/searchUserTaskAuditLogsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchUserTaskAuditLogs

#### Tags

User task

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchUserTasks()

```ts
searchUserTasks(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:10659](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L10659)

Search user tasks

Search for user tasks based on given criteria.

-

#### Parameters

##### input

[`SearchQueryRequest`](../type-aliases/SearchQueryRequest.md) & `object`

##### consistencyManagement

[`searchUserTasksConsistency`](../type-aliases/searchUserTasksConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Example

```ts
async function searchUserTasksExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchUserTasks(
    {
      filter: { assignee: "alice", state: "CREATED" },
      sort: [{ field: "creationDate", order: "DESC" }],
      page: { limit: 10 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const task of result.items ?? []) {
    console.log(`${task.userTaskKey}: ${task.name} (${task.state})`);
  }
}
```

#### Operation Id

searchUserTasks

#### Tags

User task

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchUserTaskVariables()

```ts
searchUserTaskVariables(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:10722](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L10722)

Search user task variables

Search for user task variables based on given criteria. By default, long variable values in the response are truncated.

-

#### Parameters

##### input

[`searchUserTaskVariablesInput`](../type-aliases/searchUserTaskVariablesInput.md)

##### consistencyManagement

[`searchUserTaskVariablesConsistency`](../type-aliases/searchUserTaskVariablesConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchUserTaskVariables

#### Tags

User task

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### searchVariables()

```ts
searchVariables(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:10789](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L10789)

Search variables

Search for process and local variables based on given criteria. By default, long variable values in the response are truncated.

-

#### Parameters

##### input

[`searchVariablesInput`](../type-aliases/searchVariablesInput.md)

##### consistencyManagement

[`searchVariablesConsistency`](../type-aliases/searchVariablesConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchVariables

#### Tags

Variable

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### stopAllWorkers()

```ts
stopAllWorkers(): void;
```

Defined in: [gen/CamundaClient.ts:1556](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1556)

Stop all registered job workers (best-effort).

#### Returns

`void`

---

### suspendBatchOperation()

```ts
suspendBatchOperation(input, consistencyManagement): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:10856](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L10856)

Suspend Batch operation

Suspends a running batch operation.
This is done asynchronously, the progress can be tracked using the batch operation status endpoint (/batch-operations/{batchOperationKey}).

-

#### Parameters

##### input

###### batchOperationKey

[`BatchOperationKey`](../type-aliases/BatchOperationKey.md)

##### consistencyManagement

[`suspendBatchOperationConsistency`](../type-aliases/suspendBatchOperationConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

suspendBatchOperation

#### Tags

Batch operation

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### throwJobError()

```ts
throwJobError(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:10921](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L10921)

Throw error for job

Reports a business error (i.e. non-technical) that occurs while processing a job.

-

#### Parameters

##### input

[`throwJobErrorInput`](../type-aliases/throwJobErrorInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

throwJobError

#### Tags

Job

---

### unassignClientFromGroup()

```ts
unassignClientFromGroup(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:10983](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L10983)

Unassign a client from a group

Unassigns a client from a group.
The client is removed as a group member, with associated authorizations, roles, and tenant assignments no longer applied.

-

#### Parameters

##### input

[`unassignClientFromGroupInput`](../type-aliases/unassignClientFromGroupInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignClientFromGroup

#### Tags

Group

---

### unassignClientFromTenant()

```ts
unassignClientFromTenant(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11043](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L11043)

Unassign a client from a tenant

Unassigns the client from the specified tenant.
The client can no longer access tenant data.

-

#### Parameters

##### input

[`unassignClientFromTenantInput`](../type-aliases/unassignClientFromTenantInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignClientFromTenant

#### Tags

Tenant

---

### unassignGroupFromTenant()

```ts
unassignGroupFromTenant(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11103](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L11103)

Unassign a group from a tenant

Unassigns a group from a specified tenant.
Members of the group (users, clients) will no longer have access to the tenant's data - except they are assigned directly to the tenant.

-

#### Parameters

##### input

[`unassignGroupFromTenantInput`](../type-aliases/unassignGroupFromTenantInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignGroupFromTenant

#### Tags

Tenant

---

### unassignMappingRuleFromGroup()

```ts
unassignMappingRuleFromGroup(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11161](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L11161)

Unassign a mapping rule from a group

Unassigns a mapping rule from a group.

-

#### Parameters

##### input

[`unassignMappingRuleFromGroupInput`](../type-aliases/unassignMappingRuleFromGroupInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignMappingRuleFromGroup

#### Tags

Group

---

### unassignMappingRuleFromTenant()

```ts
unassignMappingRuleFromTenant(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11219](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L11219)

Unassign a mapping rule from a tenant

Unassigns a single mapping rule from a specified tenant without deleting the rule.

-

#### Parameters

##### input

[`unassignMappingRuleFromTenantInput`](../type-aliases/unassignMappingRuleFromTenantInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignMappingRuleFromTenant

#### Tags

Tenant

---

### unassignRoleFromClient()

```ts
unassignRoleFromClient(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11277](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L11277)

Unassign a role from a client

Unassigns the specified role from the client. The client will no longer inherit the authorizations associated with this role.

-

#### Parameters

##### input

[`unassignRoleFromClientInput`](../type-aliases/unassignRoleFromClientInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignRoleFromClient

#### Tags

Role

---

### unassignRoleFromGroup()

```ts
unassignRoleFromGroup(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11335](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L11335)

Unassign a role from a group

Unassigns the specified role from the group. All group members (user or client) no longer inherit the authorizations associated with this role.

-

#### Parameters

##### input

[`unassignRoleFromGroupInput`](../type-aliases/unassignRoleFromGroupInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignRoleFromGroup

#### Tags

Role

---

### unassignRoleFromMappingRule()

```ts
unassignRoleFromMappingRule(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11393](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L11393)

Unassign a role from a mapping rule

Unassigns a role from a mapping rule.

-

#### Parameters

##### input

[`unassignRoleFromMappingRuleInput`](../type-aliases/unassignRoleFromMappingRuleInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignRoleFromMappingRule

#### Tags

Role

---

### unassignRoleFromTenant()

```ts
unassignRoleFromTenant(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11454](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L11454)

Unassign a role from a tenant

Unassigns a role from a specified tenant.
Users, Clients or Groups, that have the role assigned, will no longer have access to the
tenant's data - unless they are assigned directly to the tenant.

-

#### Parameters

##### input

[`unassignRoleFromTenantInput`](../type-aliases/unassignRoleFromTenantInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignRoleFromTenant

#### Tags

Tenant

---

### unassignRoleFromUser()

```ts
unassignRoleFromUser(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11512](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L11512)

Unassign a role from a user

Unassigns a role from a user. The user will no longer inherit the authorizations associated with this role.

-

#### Parameters

##### input

[`unassignRoleFromUserInput`](../type-aliases/unassignRoleFromUserInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignRoleFromUser

#### Tags

Role

---

### unassignUserFromGroup()

```ts
unassignUserFromGroup(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11572](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L11572)

Unassign a user from a group

Unassigns a user from a group.
The user is removed as a group member, with associated authorizations, roles, and tenant assignments no longer applied.

-

#### Parameters

##### input

[`unassignUserFromGroupInput`](../type-aliases/unassignUserFromGroupInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignUserFromGroup

#### Tags

Group

---

### unassignUserFromTenant()

```ts
unassignUserFromTenant(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11632](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L11632)

Unassign a user from a tenant

Unassigns the user from the specified tenant.
The user can no longer access tenant data.

-

#### Parameters

##### input

[`unassignUserFromTenantInput`](../type-aliases/unassignUserFromTenantInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignUserFromTenant

#### Tags

Tenant

---

### unassignUserTask()

```ts
unassignUserTask(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11692](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L11692)

Unassign user task

Removes the assignee of a task with the given key.

-

#### Parameters

##### input

[`unassignUserTaskInput`](../type-aliases/unassignUserTaskInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Example

```ts
async function unassignUserTaskExample() {
  const camunda = createCamundaClient();

  const userTaskKey = UserTaskKey.assumeExists("2251799813685249");

  await camunda.unassignUserTask({ userTaskKey });
}
```

#### Operation Id

unassignUserTask

#### Tags

User task

---

### updateAuthorization()

```ts
updateAuthorization(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11750](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L11750)

Update authorization

Update the authorization with the given key.

-

#### Parameters

##### input

[`updateAuthorizationInput`](../type-aliases/updateAuthorizationInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

updateAuthorization

#### Tags

Authorization

---

### updateGlobalClusterVariable()

```ts
updateGlobalClusterVariable(input): CancelablePromise<ClusterVariableResult>;
```

Defined in: [gen/CamundaClient.ts:11812](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L11812)

Update a global-scoped cluster variable

Updates the value of an existing global cluster variable.
The variable must exist, otherwise a 404 error is returned.

-

#### Parameters

##### input

[`updateGlobalClusterVariableInput`](../type-aliases/updateGlobalClusterVariableInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ClusterVariableResult`](../type-aliases/ClusterVariableResult.md)\>

#### Operation Id

updateGlobalClusterVariable

#### Tags

Cluster Variable

---

### updateGroup()

```ts
updateGroup(input): CancelablePromise<GroupUpdateResult>;
```

Defined in: [gen/CamundaClient.ts:11872](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L11872)

Update group

Update a group with the given ID.

-

#### Parameters

##### input

[`updateGroupInput`](../type-aliases/updateGroupInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`GroupUpdateResult`](../type-aliases/GroupUpdateResult.md)\>

#### Operation Id

updateGroup

#### Tags

Group

---

### updateJob()

```ts
updateJob(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11932](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L11932)

Update job

Update a job with the given key.

-

#### Parameters

##### input

[`updateJobInput`](../type-aliases/updateJobInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

updateJob

#### Tags

Job

---

### updateMappingRule()

```ts
updateMappingRule(input): CancelablePromise<MappingRuleCreateUpdateResult>;
```

Defined in: [gen/CamundaClient.ts:11993](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L11993)

Update mapping rule

Update a mapping rule.

-

#### Parameters

##### input

[`updateMappingRuleInput`](../type-aliases/updateMappingRuleInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`MappingRuleCreateUpdateResult`](../type-aliases/MappingRuleCreateUpdateResult.md)\>

#### Operation Id

updateMappingRule

#### Tags

Mapping rule

---

### updateRole()

```ts
updateRole(input): CancelablePromise<RoleUpdateResult>;
```

Defined in: [gen/CamundaClient.ts:12053](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L12053)

Update role

Update a role with the given ID.

-

#### Parameters

##### input

[`updateRoleInput`](../type-aliases/updateRoleInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`RoleUpdateResult`](../type-aliases/RoleUpdateResult.md)\>

#### Operation Id

updateRole

#### Tags

Role

---

### updateTenant()

```ts
updateTenant(input): CancelablePromise<TenantUpdateResult>;
```

Defined in: [gen/CamundaClient.ts:12113](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L12113)

Update tenant

Updates an existing tenant.

-

#### Parameters

##### input

[`updateTenantInput`](../type-aliases/updateTenantInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`TenantUpdateResult`](../type-aliases/TenantUpdateResult.md)\>

#### Operation Id

updateTenant

#### Tags

Tenant

---

### updateTenantClusterVariable()

```ts
updateTenantClusterVariable(input): CancelablePromise<ClusterVariableResult>;
```

Defined in: [gen/CamundaClient.ts:12175](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L12175)

Update a tenant-scoped cluster variable

Updates the value of an existing tenant-scoped cluster variable.
The variable must exist, otherwise a 404 error is returned.

-

#### Parameters

##### input

[`updateTenantClusterVariableInput`](../type-aliases/updateTenantClusterVariableInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ClusterVariableResult`](../type-aliases/ClusterVariableResult.md)\>

#### Operation Id

updateTenantClusterVariable

#### Tags

Cluster Variable

---

### updateUser()

```ts
updateUser(input, consistencyManagement): CancelablePromise<UserResult>;
```

Defined in: [gen/CamundaClient.ts:12236](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L12236)

Update user

Updates a user.

-

#### Parameters

##### input

[`updateUserInput`](../type-aliases/updateUserInput.md)

##### consistencyManagement

[`updateUserConsistency`](../type-aliases/updateUserConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`UserResult`](../type-aliases/UserResult.md)\>

#### Operation Id

updateUser

#### Tags

User

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

---

### updateUserTask()

```ts
updateUserTask(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:12300](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L12300)

Update user task

Update a user task with the given key.

-

#### Parameters

##### input

[`updateUserTaskInput`](../type-aliases/updateUserTaskInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

updateUserTask

#### Tags

User task

---

### withCorrelation()

```ts
withCorrelation<T>(id, fn): Promise<T>;
```

Defined in: [gen/CamundaClient.ts:1477](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1477)

#### Type Parameters

##### T

`T`

#### Parameters

##### id

`string`

##### fn

() => `T` \| `Promise`\<`T`\>

#### Returns

`Promise`\<`T`\>
