---
title: "Class: CamundaClient"
sidebar_label: "CamundaClient"
mdx:
  format: md
---

# Class: CamundaClient

Defined in: [gen/CamundaClient.ts:1156](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1156)

## Constructors

### Constructor

```ts
new CamundaClient(opts): CamundaClient;
```

Defined in: [gen/CamundaClient.ts:1182](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1182)

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

Defined in: [gen/CamundaClient.ts:1303](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1303)

##### Returns

`Readonly`\<[`CamundaConfig`](../interfaces/CamundaConfig.md)\>

## Methods

### \_getSupportLogger()

```ts
_getSupportLogger(): SupportLogger;
```

Defined in: [gen/CamundaClient.ts:1432](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1432)

Internal accessor for support logger (no public API commitment yet).

#### Returns

[`SupportLogger`](../interfaces/SupportLogger.md)

***

### \_invokeWithRetry()

```ts
_invokeWithRetry<T>(op, opts): Promise<T>;
```

Defined in: [gen/CamundaClient.ts:1465](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1465)

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

***

### activateAdHocSubProcessActivities()

```ts
activateAdHocSubProcessActivities(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:1551](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1551)

Activate activities within an ad-hoc sub-process

Activates selected activities within an ad-hoc sub-process identified by element ID.
The provided element IDs must exist within the ad-hoc sub-process instance identified by the
provided adHocSubProcessInstanceKey.

 *

#### Parameters

##### input

[`activateAdHocSubProcessActivitiesInput`](../type-aliases/activateAdHocSubProcessActivitiesInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

activateAdHocSubProcessActivities

#### Tags

Ad-hoc sub-process

***

### activateJobs()

```ts
activateJobs(input): CancelablePromise<{
  jobs: EnrichedActivatedJob[];
}>;
```

Defined in: [gen/CamundaClient.ts:1614](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1614)

Activate jobs

Iterate through all known partitions and activate jobs up to the requested maximum.

 *

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
    type: 'payment-processing',
    timeout: 30000,
    maxJobsToActivate: 5,
  });

  for (const job of result.jobs) {
    console.log(`Job ${job.jobKey}: ${job.type}`);

    // Each enriched job has helper methods
    await job.complete({ paymentId: 'PAY-123' });
  }
}
```

#### Operation Id

activateJobs

#### Tags

Job

***

### assignClientToGroup()

```ts
assignClientToGroup(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:1675](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1675)

Assign a client to a group

Assigns a client to a group, making it a member of the group.
Members of the group inherit the group authorizations, roles, and tenant assignments.

 *

#### Parameters

##### input

[`assignClientToGroupInput`](../type-aliases/assignClientToGroupInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignClientToGroup

#### Tags

Group

***

### assignClientToTenant()

```ts
assignClientToTenant(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:1735](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1735)

Assign a client to a tenant

Assign the client to the specified tenant.
The client can then access tenant data and perform authorized actions.

 *

#### Parameters

##### input

[`assignClientToTenantInput`](../type-aliases/assignClientToTenantInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignClientToTenant

#### Tags

Tenant

***

### assignGroupToTenant()

```ts
assignGroupToTenant(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:1795](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1795)

Assign a group to a tenant

Assigns a group to a specified tenant.
Group members (users, clients) can then access tenant data and perform authorized actions.

 *

#### Parameters

##### input

[`assignGroupToTenantInput`](../type-aliases/assignGroupToTenantInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignGroupToTenant

#### Tags

Tenant

***

### assignMappingRuleToGroup()

```ts
assignMappingRuleToGroup(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:1853](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1853)

Assign a mapping rule to a group

Assigns a mapping rule to a group.
 *

#### Parameters

##### input

[`assignMappingRuleToGroupInput`](../type-aliases/assignMappingRuleToGroupInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignMappingRuleToGroup

#### Tags

Group

***

### assignMappingRuleToTenant()

```ts
assignMappingRuleToTenant(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:1911](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1911)

Assign a mapping rule to a tenant

Assign a single mapping rule to a specified tenant.
 *

#### Parameters

##### input

[`assignMappingRuleToTenantInput`](../type-aliases/assignMappingRuleToTenantInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignMappingRuleToTenant

#### Tags

Tenant

***

### assignRoleToClient()

```ts
assignRoleToClient(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:1969](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1969)

Assign a role to a client

Assigns the specified role to the client. The client will inherit the authorizations associated with this role.
 *

#### Parameters

##### input

[`assignRoleToClientInput`](../type-aliases/assignRoleToClientInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignRoleToClient

#### Tags

Role

***

### assignRoleToGroup()

```ts
assignRoleToGroup(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2027](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L2027)

Assign a role to a group

Assigns the specified role to the group. Every member of the group (user or client) will inherit the authorizations associated with this role.
 *

#### Parameters

##### input

[`assignRoleToGroupInput`](../type-aliases/assignRoleToGroupInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignRoleToGroup

#### Tags

Role

***

### assignRoleToMappingRule()

```ts
assignRoleToMappingRule(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2085](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L2085)

Assign a role to a mapping rule

Assigns a role to a mapping rule.
 *

#### Parameters

##### input

[`assignRoleToMappingRuleInput`](../type-aliases/assignRoleToMappingRuleInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignRoleToMappingRule

#### Tags

Role

***

### assignRoleToTenant()

```ts
assignRoleToTenant(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2145](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L2145)

Assign a role to a tenant

Assigns a role to a specified tenant.
Users, Clients or Groups, that have the role assigned, will get access to the tenant's data and can perform actions according to their authorizations.

 *

#### Parameters

##### input

[`assignRoleToTenantInput`](../type-aliases/assignRoleToTenantInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignRoleToTenant

#### Tags

Tenant

***

### assignRoleToUser()

```ts
assignRoleToUser(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2203](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L2203)

Assign a role to a user

Assigns the specified role to the user. The user will inherit the authorizations associated with this role.
 *

#### Parameters

##### input

[`assignRoleToUserInput`](../type-aliases/assignRoleToUserInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignRoleToUser

#### Tags

Role

***

### assignUserTask()

```ts
assignUserTask(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2263](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L2263)

Assign user task

Assigns a user task with the given key to the given assignee.
 *

#### Parameters

##### input

[`assignUserTaskInput`](../type-aliases/assignUserTaskInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Example

```ts
async function assignUserTaskExample() {
  const camunda = createCamundaClient();

  const userTaskKey = UserTaskKey.assumeExists('2251799813685249');

  await camunda.assignUserTask({
    userTaskKey,
    assignee: 'alice',
    allowOverride: true,
  });
}
```

#### Operation Id

assignUserTask

#### Tags

User task

***

### assignUserToGroup()

```ts
assignUserToGroup(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2325](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L2325)

Assign a user to a group

Assigns a user to a group, making the user a member of the group.
Group members inherit the group authorizations, roles, and tenant assignments.

 *

#### Parameters

##### input

[`assignUserToGroupInput`](../type-aliases/assignUserToGroupInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignUserToGroup

#### Tags

Group

***

### assignUserToTenant()

```ts
assignUserToTenant(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2383](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L2383)

Assign a user to a tenant

Assign a single user to a specified tenant. The user can then access tenant data and perform authorized actions.
 *

#### Parameters

##### input

[`assignUserToTenantInput`](../type-aliases/assignUserToTenantInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignUserToTenant

#### Tags

Tenant

***

### broadcastSignal()

```ts
broadcastSignal(input): CancelablePromise<SignalBroadcastResult>;
```

Defined in: [gen/CamundaClient.ts:2443](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L2443)

Broadcast signal

Broadcasts a signal.
 *

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
    signalName: 'system-shutdown',
    variables: {
      reason: 'Scheduled maintenance',
    },
  });

  console.log(`Signal broadcast key: ${result.signalKey}`);
}
```

#### Operation Id

broadcastSignal

#### Tags

Signal

***

### cancelBatchOperation()

```ts
cancelBatchOperation(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2507](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L2507)

Cancel Batch operation

Cancels a running batch operation.
This is done asynchronously, the progress can be tracked using the batch operation status endpoint (/batch-operations/{batchOperationKey}).

 *

#### Parameters

##### input

###### batchOperationKey

[`BatchOperationKey`](../type-aliases/BatchOperationKey.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

cancelBatchOperation

#### Tags

Batch operation

***

### cancelProcessInstance()

```ts
cancelProcessInstance(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2569](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L2569)

Cancel process instance

Cancels a running process instance. As a cancellation includes more than just the removal of the process instance resource, the cancellation resource must be posted.
 *

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
    processDefinitionId: ProcessDefinitionId.assumeExists('order-process'),
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

***

### cancelProcessInstancesBatchOperation()

```ts
cancelProcessInstancesBatchOperation(input): CancelablePromise<BatchOperationCreatedResult>;
```

Defined in: [gen/CamundaClient.ts:2633](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L2633)

Cancel process instances (batch)

Cancels multiple running process instances.
Since only ACTIVE root instances can be cancelled, any given filters for state and
parentProcessInstanceKey are ignored and overridden during this batch operation.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

 *

#### Parameters

##### input

[`ProcessInstanceCancellationBatchOperationRequest`](../type-aliases/ProcessInstanceCancellationBatchOperationRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`BatchOperationCreatedResult`](../type-aliases/BatchOperationCreatedResult.md)\>

#### Operation Id

cancelProcessInstancesBatchOperation

#### Tags

Process instance

***

### clearAuthCache()

```ts
clearAuthCache(opts?): void;
```

Defined in: [gen/CamundaClient.ts:1411](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1411)

#### Parameters

##### opts?

###### disk?

`boolean`

###### memory?

`boolean`

#### Returns

`void`

***

### completeJob()

```ts
completeJob(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2694](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L2694)

Complete job

Complete a job with the given payload, which allows completing the associated service task.

 *

#### Parameters

##### input

[`completeJobInput`](../type-aliases/completeJobInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Example

```ts
async function completeJobExample() {
  const camunda = createCamundaClient();

  const jobKey = JobKey.assumeExists('2251799813685249');

  await camunda.completeJob({
    jobKey,
    variables: {
      paymentId: 'PAY-123',
      status: 'completed',
    },
  });
}
```

#### Operation Id

completeJob

#### Tags

Job

***

### completeUserTask()

```ts
completeUserTask(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2756](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L2756)

Complete user task

Completes a user task with the given key.
 *

#### Parameters

##### input

[`completeUserTaskInput`](../type-aliases/completeUserTaskInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Example

```ts
async function completeUserTaskExample() {
  const camunda = createCamundaClient();

  const userTaskKey = UserTaskKey.assumeExists('2251799813685249');

  await camunda.completeUserTask({
    userTaskKey,
    variables: {
      approved: true,
      comment: 'Looks good',
    },
  });
}
```

#### Operation Id

completeUserTask

#### Tags

User task

***

### configure()

```ts
configure(next): void;
```

Defined in: [gen/CamundaClient.ts:1315](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1315)

#### Parameters

##### next

[`CamundaOptions`](../interfaces/CamundaOptions.md)

#### Returns

`void`

***

### correlateMessage()

```ts
correlateMessage(input): CancelablePromise<MessageCorrelationResult>;
```

Defined in: [gen/CamundaClient.ts:2822](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L2822)

Correlate message

Publishes a message and correlates it to a subscription.
If correlation is successful it will return the first process instance key the message correlated with.
The message is not buffered.
Use the publish message endpoint to send messages that can be buffered.

 *

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
    name: 'order-payment-received',
    correlationKey: 'ORD-12345',
    variables: {
      paymentId: 'PAY-123',
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

***

### createAdminUser()

```ts
createAdminUser(input): CancelablePromise<UserCreateResult>;
```

Defined in: [gen/CamundaClient.ts:2884](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L2884)

Create admin user

Creates a new user and assigns the admin role to it. This endpoint is only usable when users are managed in the Orchestration Cluster and while no user is assigned to the admin role.
 *

#### Parameters

##### input

[`UserRequest`](../type-aliases/UserRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`UserCreateResult`](../type-aliases/UserCreateResult.md)\>

#### Operation Id

createAdminUser

#### Tags

Setup

***

### createAuthorization()

```ts
createAuthorization(input): CancelablePromise<AuthorizationCreateResult>;
```

Defined in: [gen/CamundaClient.ts:2942](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L2942)

Create authorization

Create the authorization.
 *

#### Parameters

##### input

[`AuthorizationIdBasedRequest`](../type-aliases/AuthorizationIdBasedRequest.md) | [`AuthorizationPropertyBasedRequest`](../type-aliases/AuthorizationPropertyBasedRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`AuthorizationCreateResult`](../type-aliases/AuthorizationCreateResult.md)\>

#### Operation Id

createAuthorization

#### Tags

Authorization

***

### createDeployment()

```ts
createDeployment(input): CancelablePromise<ExtendedDeploymentResult>;
```

Defined in: [gen/CamundaClient.ts:3005](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L3005)

Deploy resources

Deploys one or more resources (e.g. processes, decision models, or forms).
This is an atomic call, i.e. either all resources are deployed or none of them are.

 *

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

  const file = new File(['<xml/>'], 'order-process.bpmn', { type: 'application/xml' });

  const result = await camunda.createDeployment({
    resources: [file],
  });

  console.log(`Deployment key: ${result.deploymentKey}`);
  for (const process of result.processes ?? []) {
    console.log(`  Process: ${process.processDefinitionId} v${process.processDefinitionVersion}`);
  }
}
```

#### Operation Id

createDeployment

#### Tags

Resource

***

### createDocument()

```ts
createDocument(input): CancelablePromise<DocumentReference>;
```

Defined in: [gen/CamundaClient.ts:3085](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L3085)

Upload document

Upload a document to the Camunda 8 cluster.

Note that this is currently supported for document stores of type: AWS, GCP, in-memory (non-production), local (non-production)

 *

#### Parameters

##### input

[`createDocumentInput`](../type-aliases/createDocumentInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`DocumentReference`](../type-aliases/DocumentReference.md)\>

#### Operation Id

createDocument

#### Tags

Document

***

### createDocumentLink()

```ts
createDocumentLink(input): CancelablePromise<DocumentLink>;
```

Defined in: [gen/CamundaClient.ts:3148](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L3148)

Create document link

Create a link to a document in the Camunda 8 cluster.

Note that this is currently supported for document stores of type: AWS, GCP

 *

#### Parameters

##### input

[`createDocumentLinkInput`](../type-aliases/createDocumentLinkInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`DocumentLink`](../type-aliases/DocumentLink.md)\>

#### Operation Id

createDocumentLink

#### Tags

Document

***

### createDocuments()

```ts
createDocuments(input): CancelablePromise<DocumentCreationBatchResponse>;
```

Defined in: [gen/CamundaClient.ts:3225](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L3225)

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

 *

#### Parameters

##### input

[`createDocumentsInput`](../type-aliases/createDocumentsInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`DocumentCreationBatchResponse`](../type-aliases/DocumentCreationBatchResponse.md)\>

#### Operation Id

createDocuments

#### Tags

Document

***

### createElementInstanceVariables()

```ts
createElementInstanceVariables(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:3287](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L3287)

Update element instance variables

Updates all the variables of a particular scope (for example, process instance, element instance) with the given variable data.
Specify the element instance in the `elementInstanceKey` parameter.

 *

#### Parameters

##### input

[`createElementInstanceVariablesInput`](../type-aliases/createElementInstanceVariablesInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

createElementInstanceVariables

#### Tags

Element instance

***

### createGlobalClusterVariable()

```ts
createGlobalClusterVariable(input): CancelablePromise<ClusterVariableResult>;
```

Defined in: [gen/CamundaClient.ts:3347](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L3347)

Create a global-scoped cluster variable

Create a global-scoped cluster variable.
 *

#### Parameters

##### input

[`CreateClusterVariableRequest`](../type-aliases/CreateClusterVariableRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ClusterVariableResult`](../type-aliases/ClusterVariableResult.md)\>

#### Operation Id

createGlobalClusterVariable

#### Tags

Cluster Variable

***

### createGlobalTaskListener()

```ts
createGlobalTaskListener(input): CancelablePromise<GlobalTaskListenerResult>;
```

Defined in: [gen/CamundaClient.ts:3405](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L3405)

Create global user task listener

Create a new global user task listener.
 *

#### Parameters

##### input

[`CreateGlobalTaskListenerRequest`](../type-aliases/CreateGlobalTaskListenerRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`GlobalTaskListenerResult`](../type-aliases/GlobalTaskListenerResult.md)\>

#### Operation Id

createGlobalTaskListener

#### Tags

Global listener

***

### createGroup()

```ts
createGroup(input): CancelablePromise<GroupCreateResult>;
```

Defined in: [gen/CamundaClient.ts:3463](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L3463)

Create group

Create a new group.
 *

#### Parameters

##### input

[`GroupCreateRequest`](../type-aliases/GroupCreateRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`GroupCreateResult`](../type-aliases/GroupCreateResult.md)\>

#### Operation Id

createGroup

#### Tags

Group

***

### createJobWorker()

```ts
createJobWorker<In, Out, Headers>(cfg): JobWorker;
```

Defined in: [gen/CamundaClient.ts:12766](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L12766)

Create a job worker that activates and processes jobs of the given type.

#### Type Parameters

##### In

`In` *extends* `ZodType`\<`unknown`, `unknown`, `$ZodTypeInternals`\<`unknown`, `unknown`\>\> = `any`

##### Out

`Out` *extends* `ZodType`\<`unknown`, `unknown`, `$ZodTypeInternals`\<`unknown`, `unknown`\>\> = `any`

##### Headers

`Headers` *extends* `ZodType`\<`unknown`, `unknown`, `$ZodTypeInternals`\<`unknown`, `unknown`\>\> = `any`

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
    jobType: 'payment-processing',
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
    jobType: 'email-sending',
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

***

### createMappingRule()

```ts
createMappingRule(input): CancelablePromise<MappingRuleCreateUpdateResult>;
```

Defined in: [gen/CamundaClient.ts:3522](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L3522)

Create mapping rule

Create a new mapping rule

 *

#### Parameters

##### input

[`MappingRuleCreateRequest`](../type-aliases/MappingRuleCreateRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`MappingRuleCreateUpdateResult`](../type-aliases/MappingRuleCreateUpdateResult.md)\>

#### Operation Id

createMappingRule

#### Tags

Mapping rule

***

### createProcessInstance()

```ts
createProcessInstance(input): CancelablePromise<CreateProcessInstanceResult>;
```

Defined in: [gen/CamundaClient.ts:3590](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L3590)

Create process instance

Creates and starts an instance of the specified process.
The process definition to use to create the instance can be specified either using its unique key
(as returned by Deploy resources), or using the BPMN process id and a version.

Waits for the completion of the process instance before returning a result
when awaitCompletion is enabled.

 *

#### Parameters

##### input

[`ProcessInstanceCreationInstructionByKey`](../type-aliases/ProcessInstanceCreationInstructionByKey.md) | [`ProcessInstanceCreationInstructionById`](../type-aliases/ProcessInstanceCreationInstructionById.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`CreateProcessInstanceResult`](../type-aliases/CreateProcessInstanceResult.md)\>

#### Examples

```ts
async function createProcessInstanceByIdExample() {
  const camunda = createCamundaClient();

  const result = await camunda.createProcessInstance({
    processDefinitionId: ProcessDefinitionId.assumeExists('order-process'),
    variables: {
      orderId: 'ORD-12345',
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
  const processDefinitionKey = ProcessDefinitionKey.assumeExists('2251799813685249');

  const result = await camunda.createProcessInstance({
    processDefinitionKey,
    variables: {
      orderId: 'ORD-12345',
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

***

### createRole()

```ts
createRole(input): CancelablePromise<RoleCreateResult>;
```

Defined in: [gen/CamundaClient.ts:3652](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L3652)

Create role

Create a new role.
 *

#### Parameters

##### input

[`RoleCreateRequest`](../type-aliases/RoleCreateRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`RoleCreateResult`](../type-aliases/RoleCreateResult.md)\>

#### Operation Id

createRole

#### Tags

Role

***

### createTenant()

```ts
createTenant(input): CancelablePromise<TenantCreateResult>;
```

Defined in: [gen/CamundaClient.ts:3710](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L3710)

Create tenant

Creates a new tenant.
 *

#### Parameters

##### input

[`TenantCreateRequest`](../type-aliases/TenantCreateRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`TenantCreateResult`](../type-aliases/TenantCreateResult.md)\>

#### Operation Id

createTenant

#### Tags

Tenant

***

### createTenantClusterVariable()

```ts
createTenantClusterVariable(input): CancelablePromise<ClusterVariableResult>;
```

Defined in: [gen/CamundaClient.ts:3768](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L3768)

Create a tenant-scoped cluster variable

Create a new cluster variable for the given tenant.
 *

#### Parameters

##### input

[`createTenantClusterVariableInput`](../type-aliases/createTenantClusterVariableInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ClusterVariableResult`](../type-aliases/ClusterVariableResult.md)\>

#### Operation Id

createTenantClusterVariable

#### Tags

Cluster Variable

***

### createUser()

```ts
createUser(input): CancelablePromise<UserCreateResult>;
```

Defined in: [gen/CamundaClient.ts:3828](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L3828)

Create user

Create a new user.
 *

#### Parameters

##### input

[`UserRequest`](../type-aliases/UserRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`UserCreateResult`](../type-aliases/UserCreateResult.md)\>

#### Operation Id

createUser

#### Tags

User

***

### deleteAuthorization()

```ts
deleteAuthorization(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:3886](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L3886)

Delete authorization

Deletes the authorization with the given key.
 *

#### Parameters

##### input

[`deleteAuthorizationInput`](../type-aliases/deleteAuthorizationInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteAuthorization

#### Tags

Authorization

***

### deleteDecisionInstance()

```ts
deleteDecisionInstance(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:3944](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L3944)

Delete decision instance

Delete all associated decision evaluations based on provided key.
 *

#### Parameters

##### input

`object` & `object`

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteDecisionInstance

#### Tags

Decision instance

***

### deleteDecisionInstancesBatchOperation()

```ts
deleteDecisionInstancesBatchOperation(input): CancelablePromise<BatchOperationCreatedResult>;
```

Defined in: [gen/CamundaClient.ts:4006](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L4006)

Delete decision instances (batch)

Delete multiple decision instances. This will delete the historic data from secondary storage.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

 *

#### Parameters

##### input

[`DecisionInstanceDeletionBatchOperationRequest`](../type-aliases/DecisionInstanceDeletionBatchOperationRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`BatchOperationCreatedResult`](../type-aliases/BatchOperationCreatedResult.md)\>

#### Operation Id

deleteDecisionInstancesBatchOperation

#### Tags

Decision instance

***

### deleteDocument()

```ts
deleteDocument(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4067](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L4067)

Delete document

Delete a document from the Camunda 8 cluster.

Note that this is currently supported for document stores of type: AWS, GCP, in-memory (non-production), local (non-production)

 *

#### Parameters

##### input

[`deleteDocumentInput`](../type-aliases/deleteDocumentInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteDocument

#### Tags

Document

***

### deleteGlobalClusterVariable()

```ts
deleteGlobalClusterVariable(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4127](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L4127)

Delete a global-scoped cluster variable

Delete a global-scoped cluster variable.
 *

#### Parameters

##### input

[`deleteGlobalClusterVariableInput`](../type-aliases/deleteGlobalClusterVariableInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteGlobalClusterVariable

#### Tags

Cluster Variable

***

### deleteGlobalTaskListener()

```ts
deleteGlobalTaskListener(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4185](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L4185)

Delete global user task listener

Deletes a global user task listener.
 *

#### Parameters

##### input

[`deleteGlobalTaskListenerInput`](../type-aliases/deleteGlobalTaskListenerInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteGlobalTaskListener

#### Tags

Global listener

***

### deleteGroup()

```ts
deleteGroup(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4243](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L4243)

Delete group

Deletes the group with the given ID.
 *

#### Parameters

##### input

[`deleteGroupInput`](../type-aliases/deleteGroupInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteGroup

#### Tags

Group

***

### deleteMappingRule()

```ts
deleteMappingRule(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4302](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L4302)

Delete a mapping rule

Deletes the mapping rule with the given ID.

 *

#### Parameters

##### input

[`deleteMappingRuleInput`](../type-aliases/deleteMappingRuleInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteMappingRule

#### Tags

Mapping rule

***

### deleteProcessInstance()

```ts
deleteProcessInstance(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4360](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L4360)

Delete process instance

Deletes a process instance. Only instances that are completed or terminated can be deleted.
 *

#### Parameters

##### input

`object` & `object`

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteProcessInstance

#### Tags

Process instance

***

### deleteProcessInstancesBatchOperation()

```ts
deleteProcessInstancesBatchOperation(input): CancelablePromise<BatchOperationCreatedResult>;
```

Defined in: [gen/CamundaClient.ts:4423](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L4423)

Delete process instances (batch)

Delete multiple process instances. This will delete the historic data from secondary storage.
Only process instances in a final state (COMPLETED or TERMINATED) can be deleted.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

 *

#### Parameters

##### input

[`ProcessInstanceDeletionBatchOperationRequest`](../type-aliases/ProcessInstanceDeletionBatchOperationRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`BatchOperationCreatedResult`](../type-aliases/BatchOperationCreatedResult.md)\>

#### Operation Id

deleteProcessInstancesBatchOperation

#### Tags

Process instance

***

### deleteResource()

```ts
deleteResource(input): CancelablePromise<DeleteResourceResponse>;
```

Defined in: [gen/CamundaClient.ts:4495](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L4495)

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
 *

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
  const resourceKey = ProcessDefinitionKey.assumeExists('2251799813685249');

  await camunda.deleteResource({
    resourceKey,
  });
}
```

#### Operation Id

deleteResource

#### Tags

Resource

***

### deleteRole()

```ts
deleteRole(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4555](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L4555)

Delete role

Deletes the role with the given ID.
 *

#### Parameters

##### input

[`deleteRoleInput`](../type-aliases/deleteRoleInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteRole

#### Tags

Role

***

### deleteTenant()

```ts
deleteTenant(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4613](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L4613)

Delete tenant

Deletes an existing tenant.
 *

#### Parameters

##### input

[`deleteTenantInput`](../type-aliases/deleteTenantInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteTenant

#### Tags

Tenant

***

### deleteTenantClusterVariable()

```ts
deleteTenantClusterVariable(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4671](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L4671)

Delete a tenant-scoped cluster variable

Delete a tenant-scoped cluster variable.
 *

#### Parameters

##### input

[`deleteTenantClusterVariableInput`](../type-aliases/deleteTenantClusterVariableInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteTenantClusterVariable

#### Tags

Cluster Variable

***

### deleteUser()

```ts
deleteUser(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4729](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L4729)

Delete user

Deletes a user.
 *

#### Parameters

##### input

[`deleteUserInput`](../type-aliases/deleteUserInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteUser

#### Tags

User

***

### deployResourcesFromFiles()

```ts
deployResourcesFromFiles(resourceFilenames, options?): CancelablePromise<ExtendedDeploymentResult>;
```

Defined in: [gen/CamundaClient.ts:12782](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L12782)

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

***

### emitSupportLogPreamble()

```ts
emitSupportLogPreamble(): void;
```

Defined in: [gen/CamundaClient.ts:1441](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1441)

Emit the standard support log preamble & redacted configuration to the current support logger.
Safe to call multiple times; subsequent calls are ignored (idempotent).
Useful when a custom supportLogger was injected and you still want the canonical header & config dump.

#### Returns

`void`

***

### evaluateConditionals()

```ts
evaluateConditionals(input): CancelablePromise<EvaluateConditionalResult>;
```

Defined in: [gen/CamundaClient.ts:4790](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L4790)

Evaluate root level conditional start events

Evaluates root-level conditional start events for process definitions.
If the evaluation is successful, it will return the keys of all created process instances, along with their associated process definition key.
Multiple root-level conditional start events of the same process definition can trigger if their conditions evaluate to true.

 *

#### Parameters

##### input

[`ConditionalEvaluationInstruction`](../type-aliases/ConditionalEvaluationInstruction.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`EvaluateConditionalResult`](../type-aliases/EvaluateConditionalResult.md)\>

#### Operation Id

evaluateConditionals

#### Tags

Conditional

***

### evaluateDecision()

```ts
evaluateDecision(input): CancelablePromise<EvaluateDecisionResult>;
```

Defined in: [gen/CamundaClient.ts:4860](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L4860)

Evaluate decision

Evaluates a decision.
You specify the decision to evaluate either by using its unique key (as returned by
DeployResource), or using the decision ID. When using the decision ID, the latest deployed
version of the decision is used.

 *

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
    decisionDefinitionId: DecisionDefinitionId.assumeExists('invoice-classification'),
    variables: {
      amount: 1000,
      invoiceCategory: 'Misc',
    },
  });

  console.log(`Decision: ${result.decisionDefinitionId}`);
  console.log(`Output: ${result.output}`);
}
```

```ts
async function evaluateDecisionByKeyExample() {
  const camunda = createCamundaClient();

  const decisionDefinitionKey = DecisionDefinitionKey.assumeExists('2251799813685249');

  const result = await camunda.evaluateDecision({
    decisionDefinitionKey,
    variables: {
      amount: 1000,
      invoiceCategory: 'Misc',
    },
  });

  console.log(`Decision output: ${result.output}`);
}
```

#### Operation Id

evaluateDecision

#### Tags

Decision definition

***

### evaluateExpression()

```ts
evaluateExpression(input): CancelablePromise<ExpressionEvaluationResult>;
```

Defined in: [gen/CamundaClient.ts:4922](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L4922)

Evaluate an expression

Evaluates a FEEL expression and returns the result. Supports references to tenant scoped cluster variables when a tenant ID is provided.
 *

#### Parameters

##### input

[`ExpressionEvaluationRequest`](../type-aliases/ExpressionEvaluationRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ExpressionEvaluationResult`](../type-aliases/ExpressionEvaluationResult.md)\>

#### Operation Id

evaluateExpression

#### Tags

Expression

***

### failJob()

```ts
failJob(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4987](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L4987)

Fail job

Mark the job as failed.

 *

#### Parameters

##### input

[`failJobInput`](../type-aliases/failJobInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Example

```ts
async function failJobExample() {
  const camunda = createCamundaClient();

  const jobKey = JobKey.assumeExists('2251799813685249');

  await camunda.failJob({
    jobKey,
    retries: 2,
    errorMessage: 'Payment gateway timeout',
    retryBackOff: 5000,
  });
}
```

#### Operation Id

failJob

#### Tags

Job

***

### forceAuthRefresh()

```ts
forceAuthRefresh(): Promise<string | undefined>;
```

Defined in: [gen/CamundaClient.ts:1408](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1408)

#### Returns

`Promise`\<`string` \| `undefined`\>

***

### getAuditLog()

```ts
getAuditLog(input, consistencyManagement): CancelablePromise<AuditLogResult>;
```

Defined in: [gen/CamundaClient.ts:5048](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L5048)

Get audit log

Get an audit log entry by auditLogKey.
 *

#### Parameters

##### input

[`getAuditLogInput`](../type-aliases/getAuditLogInput.md)

##### consistencyManagement

[`getAuditLogConsistency`](../type-aliases/getAuditLogConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`AuditLogResult`](../type-aliases/AuditLogResult.md)\>

#### Operation Id

getAuditLog

#### Tags

Audit Log

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### getAuthentication()

```ts
getAuthentication(): CancelablePromise<CamundaUserResult>;
```

Defined in: [gen/CamundaClient.ts:5110](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L5110)

Get current user

Retrieves the current authenticated user.
 *

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`CamundaUserResult`](../type-aliases/CamundaUserResult.md)\>

#### Operation Id

getAuthentication

#### Tags

Authentication

***

### getAuthHeaders()

```ts
getAuthHeaders(): Promise<Record<string, string>>;
```

Defined in: [gen/CamundaClient.ts:1405](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1405)

#### Returns

`Promise`\<`Record`\<`string`, `string`\>\>

***

### getAuthorization()

```ts
getAuthorization(input, consistencyManagement): CancelablePromise<AuthorizationResult>;
```

Defined in: [gen/CamundaClient.ts:5160](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L5160)

Get authorization

Get authorization by the given key.
 *

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

***

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

Defined in: [gen/CamundaClient.ts:1510](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1510)

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

***

### getBatchOperation()

```ts
getBatchOperation(input, consistencyManagement): CancelablePromise<BatchOperationResponse>;
```

Defined in: [gen/CamundaClient.ts:5223](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L5223)

Get batch operation

Get batch operation by key.
 *

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

***

### getConfig()

```ts
getConfig(): Readonly<CamundaConfig>;
```

Defined in: [gen/CamundaClient.ts:1310](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1310)

Read-only snapshot of current hydrated configuration (do not mutate directly).
Use configure(...) to apply changes.

#### Returns

`Readonly`\<[`CamundaConfig`](../interfaces/CamundaConfig.md)\>

***

### getDecisionDefinition()

```ts
getDecisionDefinition(input, consistencyManagement): CancelablePromise<DecisionDefinitionResult>;
```

Defined in: [gen/CamundaClient.ts:5288](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L5288)

Get decision definition

Returns a decision definition by key.
 *

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

  const decisionDefinitionKey = DecisionDefinitionKey.assumeExists('2251799813685249');

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

***

### getDecisionDefinitionXml()

```ts
getDecisionDefinitionXml(input, consistencyManagement): CancelablePromise<string>;
```

Defined in: [gen/CamundaClient.ts:5351](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L5351)

Get decision definition XML

Returns decision definition as XML.
 *

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

***

### getDecisionInstance()

```ts
getDecisionInstance(input, consistencyManagement): CancelablePromise<DecisionInstanceGetQueryResult>;
```

Defined in: [gen/CamundaClient.ts:5414](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L5414)

Get decision instance

Returns a decision instance.
 *

#### Parameters

##### input

[`getDecisionInstanceInput`](../type-aliases/getDecisionInstanceInput.md)

##### consistencyManagement

[`getDecisionInstanceConsistency`](../type-aliases/getDecisionInstanceConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`DecisionInstanceGetQueryResult`](../type-aliases/DecisionInstanceGetQueryResult.md)\>

#### Operation Id

getDecisionInstance

#### Tags

Decision instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### getDecisionRequirements()

```ts
getDecisionRequirements(input, consistencyManagement): CancelablePromise<DecisionRequirementsResult>;
```

Defined in: [gen/CamundaClient.ts:5477](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L5477)

Get decision requirements

Returns Decision Requirements as JSON.
 *

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

***

### getDecisionRequirementsXml()

```ts
getDecisionRequirementsXml(input, consistencyManagement): CancelablePromise<string>;
```

Defined in: [gen/CamundaClient.ts:5540](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L5540)

Get decision requirements XML

Returns decision requirements as XML.
 *

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

***

### getDocument()

```ts
getDocument(input): CancelablePromise<Blob>;
```

Defined in: [gen/CamundaClient.ts:5605](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L5605)

Download document

Download a document from the Camunda 8 cluster.

Note that this is currently supported for document stores of type: AWS, GCP, in-memory (non-production), local (non-production)

 *

#### Parameters

##### input

[`getDocumentInput`](../type-aliases/getDocumentInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`Blob`\>

#### Operation Id

getDocument

#### Tags

Document

***

### getElementInstance()

```ts
getElementInstance(input, consistencyManagement): CancelablePromise<ElementInstanceResult>;
```

Defined in: [gen/CamundaClient.ts:5666](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L5666)

Get element instance

Returns element instance as JSON.
 *

#### Parameters

##### input

[`getElementInstanceInput`](../type-aliases/getElementInstanceInput.md)

##### consistencyManagement

[`getElementInstanceConsistency`](../type-aliases/getElementInstanceConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ElementInstanceResult`](../type-aliases/ElementInstanceResult.md)\>

#### Operation Id

getElementInstance

#### Tags

Element instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### getErrorMode()

```ts
getErrorMode(): "result" | "throw";
```

Defined in: [gen/CamundaClient.ts:1427](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1427)

Internal accessor (read-only) for eventual consistency error mode.

#### Returns

`"result"` \| `"throw"`

***

### getGlobalClusterVariable()

```ts
getGlobalClusterVariable(input, consistencyManagement): CancelablePromise<ClusterVariableResult>;
```

Defined in: [gen/CamundaClient.ts:5729](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L5729)

Get a global-scoped cluster variable

Get a global-scoped cluster variable.
 *

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

***

### getGlobalJobStatistics()

```ts
getGlobalJobStatistics(input, consistencyManagement): CancelablePromise<GlobalJobStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:5793](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L5793)

Global job statistics

Returns global aggregated counts for jobs. Optionally filter by the creation time window and/or jobType.

 *

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

***

### getGlobalTaskListener()

```ts
getGlobalTaskListener(input, consistencyManagement): CancelablePromise<GlobalTaskListenerResult>;
```

Defined in: [gen/CamundaClient.ts:5856](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L5856)

Get global user task listener

Get a global user task listener by its id.
 *

#### Parameters

##### input

[`getGlobalTaskListenerInput`](../type-aliases/getGlobalTaskListenerInput.md)

##### consistencyManagement

[`getGlobalTaskListenerConsistency`](../type-aliases/getGlobalTaskListenerConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`GlobalTaskListenerResult`](../type-aliases/GlobalTaskListenerResult.md)\>

#### Operation Id

getGlobalTaskListener

#### Tags

Global listener

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### getGroup()

```ts
getGroup(input, consistencyManagement): CancelablePromise<GroupResult>;
```

Defined in: [gen/CamundaClient.ts:5919](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L5919)

Get group

Get a group by its ID.
 *

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

***

### getIncident()

```ts
getIncident(input, consistencyManagement): CancelablePromise<IncidentResult>;
```

Defined in: [gen/CamundaClient.ts:5985](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L5985)

Get incident

Returns incident as JSON.

 *

#### Parameters

##### input

[`getIncidentInput`](../type-aliases/getIncidentInput.md)

##### consistencyManagement

[`getIncidentConsistency`](../type-aliases/getIncidentConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`IncidentResult`](../type-aliases/IncidentResult.md)\>

#### Example

```ts
async function getIncidentExample() {
  const camunda = createCamundaClient();

  const incidentKey = IncidentKey.assumeExists('2251799813685249');

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

***

### getJobTimeSeriesStatistics()

```ts
getJobTimeSeriesStatistics(input, consistencyManagement): CancelablePromise<JobTimeSeriesStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6051](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L6051)

Get time-series metrics for a job type

Returns a list of time-bucketed metrics ordered ascending by time.
The `from` and `to` fields select the time window of interest.
Each item in the response corresponds to one time bucket of the requested resolution.

 *

#### Parameters

##### input

[`JobTimeSeriesStatisticsQuery`](../type-aliases/JobTimeSeriesStatisticsQuery.md)

##### consistencyManagement

[`getJobTimeSeriesStatisticsConsistency`](../type-aliases/getJobTimeSeriesStatisticsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`JobTimeSeriesStatisticsQueryResult`](../type-aliases/JobTimeSeriesStatisticsQueryResult.md)\>

#### Operation Id

getJobTimeSeriesStatistics

#### Tags

Job

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### getJobTypeStatistics()

```ts
getJobTypeStatistics(input, consistencyManagement): CancelablePromise<JobTypeStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6115](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L6115)

Get job statistics by type

Get statistics about jobs, grouped by job type.

 *

#### Parameters

##### input

[`JobTypeStatisticsQuery`](../type-aliases/JobTypeStatisticsQuery.md)

##### consistencyManagement

[`getJobTypeStatisticsConsistency`](../type-aliases/getJobTypeStatisticsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`JobTypeStatisticsQueryResult`](../type-aliases/JobTypeStatisticsQueryResult.md)\>

#### Operation Id

getJobTypeStatistics

#### Tags

Job

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### getJobWorkerStatistics()

```ts
getJobWorkerStatistics(input, consistencyManagement): CancelablePromise<JobWorkerStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6179](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L6179)

Get job statistics by worker

Returns aggregated metrics per worker for the given jobType.

 *

#### Parameters

##### input

[`JobWorkerStatisticsQuery`](../type-aliases/JobWorkerStatisticsQuery.md)

##### consistencyManagement

[`getJobWorkerStatisticsConsistency`](../type-aliases/getJobWorkerStatisticsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`JobWorkerStatisticsQueryResult`](../type-aliases/JobWorkerStatisticsQueryResult.md)\>

#### Operation Id

getJobWorkerStatistics

#### Tags

Job

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### getLicense()

```ts
getLicense(): CancelablePromise<LicenseResponse>;
```

Defined in: [gen/CamundaClient.ts:6241](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L6241)

Get license status

Obtains the status of the current Camunda license.
 *

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`LicenseResponse`](../type-aliases/LicenseResponse.md)\>

#### Operation Id

getLicense

#### Tags

License

***

### getMappingRule()

```ts
getMappingRule(input, consistencyManagement): CancelablePromise<MappingRuleResult>;
```

Defined in: [gen/CamundaClient.ts:6292](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L6292)

Get a mapping rule

Gets the mapping rule with the given ID.

 *

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

***

### getProcessDefinition()

```ts
getProcessDefinition(input, consistencyManagement): CancelablePromise<ProcessDefinitionResult>;
```

Defined in: [gen/CamundaClient.ts:6355](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L6355)

Get process definition

Returns process definition as JSON.
 *

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

***

### getProcessDefinitionInstanceStatistics()

```ts
getProcessDefinitionInstanceStatistics(input, consistencyManagement): CancelablePromise<ProcessDefinitionInstanceStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6419](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L6419)

Get process instance statistics

Get statistics about process instances, grouped by process definition and tenant.

 *

#### Parameters

##### input

[`ProcessDefinitionInstanceStatisticsQuery`](../type-aliases/ProcessDefinitionInstanceStatisticsQuery.md)

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

***

### getProcessDefinitionInstanceVersionStatistics()

```ts
getProcessDefinitionInstanceVersionStatistics(input, consistencyManagement): CancelablePromise<ProcessDefinitionInstanceVersionStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6484](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L6484)

Get process instance statistics by version

Get statistics about process instances, grouped by version for a given process definition.
The process definition ID must be provided as a required field in the request body filter.

 *

#### Parameters

##### input

[`ProcessDefinitionInstanceVersionStatisticsQuery`](../type-aliases/ProcessDefinitionInstanceVersionStatisticsQuery.md)

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

***

### getProcessDefinitionMessageSubscriptionStatistics()

```ts
getProcessDefinitionMessageSubscriptionStatistics(input, consistencyManagement): CancelablePromise<ProcessDefinitionMessageSubscriptionStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6548](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L6548)

Get message subscription statistics

Get message subscription statistics, grouped by process definition.

 *

#### Parameters

##### input

[`ProcessDefinitionMessageSubscriptionStatisticsQuery`](../type-aliases/ProcessDefinitionMessageSubscriptionStatisticsQuery.md)

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

***

### getProcessDefinitionStatistics()

```ts
getProcessDefinitionStatistics(input, consistencyManagement): CancelablePromise<ProcessDefinitionElementStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6611](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L6611)

Get process definition statistics

Get statistics about elements in currently running process instances by process definition key and search filter.
 *

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

***

### getProcessDefinitionXml()

```ts
getProcessDefinitionXml(input, consistencyManagement): CancelablePromise<string>;
```

Defined in: [gen/CamundaClient.ts:6676](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L6676)

Get process definition XML

Returns process definition as XML.
 *

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

***

### getProcessInstance()

```ts
getProcessInstance(input, consistencyManagement): CancelablePromise<ProcessInstanceResult>;
```

Defined in: [gen/CamundaClient.ts:6741](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L6741)

Get process instance

Get the process instance by the process instance key.
 *

#### Parameters

##### input

[`getProcessInstanceInput`](../type-aliases/getProcessInstanceInput.md)

##### consistencyManagement

[`getProcessInstanceConsistency`](../type-aliases/getProcessInstanceConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ProcessInstanceResult`](../type-aliases/ProcessInstanceResult.md)\>

#### Example

```ts
async function getProcessInstanceExample() {
  const camunda = createCamundaClient();

  const processInstanceKey = ProcessInstanceKey.assumeExists('2251799813685249');

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

***

### getProcessInstanceCallHierarchy()

```ts
getProcessInstanceCallHierarchy(input, consistencyManagement): CancelablePromise<ProcessInstanceCallHierarchyEntry[]>;
```

Defined in: [gen/CamundaClient.ts:6804](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L6804)

Get call hierarchy

Returns the call hierarchy for a given process instance, showing its ancestry up to the root instance.
 *

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

***

### getProcessInstanceSequenceFlows()

```ts
getProcessInstanceSequenceFlows(input, consistencyManagement): CancelablePromise<ProcessInstanceSequenceFlowsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6867](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L6867)

Get sequence flows

Get sequence flows taken by the process instance.
 *

#### Parameters

##### input

[`getProcessInstanceSequenceFlowsInput`](../type-aliases/getProcessInstanceSequenceFlowsInput.md)

##### consistencyManagement

[`getProcessInstanceSequenceFlowsConsistency`](../type-aliases/getProcessInstanceSequenceFlowsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ProcessInstanceSequenceFlowsQueryResult`](../type-aliases/ProcessInstanceSequenceFlowsQueryResult.md)\>

#### Operation Id

getProcessInstanceSequenceFlows

#### Tags

Process instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### getProcessInstanceStatistics()

```ts
getProcessInstanceStatistics(input, consistencyManagement): CancelablePromise<ProcessInstanceElementStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6930](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L6930)

Get element instance statistics

Get statistics about elements by the process instance key.
 *

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

***

### getProcessInstanceStatisticsByDefinition()

```ts
getProcessInstanceStatisticsByDefinition(input, consistencyManagement): CancelablePromise<IncidentProcessInstanceStatisticsByDefinitionQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6996](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L6996)

Get process instance statistics by definition

Returns statistics for active process instances with incidents, grouped by process
definition. The result set is scoped to a specific incident error hash code, which must be
provided as a filter in the request body.

 *

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

***

### getProcessInstanceStatisticsByError()

```ts
getProcessInstanceStatisticsByError(input, consistencyManagement): CancelablePromise<IncidentProcessInstanceStatisticsByErrorQueryResult>;
```

Defined in: [gen/CamundaClient.ts:7061](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L7061)

Get process instance statistics by error

Returns statistics for active process instances that currently have active incidents,
grouped by incident error hash code.

 *

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

***

### getResource()

```ts
getResource(input): CancelablePromise<ResourceResult>;
```

Defined in: [gen/CamundaClient.ts:7127](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L7127)

Get resource

Returns a deployed resource.
:::info
Currently, this endpoint only supports RPA resources.
:::

 *

#### Parameters

##### input

[`getResourceInput`](../type-aliases/getResourceInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ResourceResult`](../type-aliases/ResourceResult.md)\>

#### Operation Id

getResource

#### Tags

Resource

***

### getResourceContent()

```ts
getResourceContent(input): CancelablePromise<string>;
```

Defined in: [gen/CamundaClient.ts:7189](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L7189)

Get resource content

Returns the content of a deployed resource.
:::info
Currently, this endpoint only supports RPA resources.
:::

 *

#### Parameters

##### input

[`getResourceContentInput`](../type-aliases/getResourceContentInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`string`\>

#### Operation Id

getResourceContent

#### Tags

Resource

***

### getRole()

```ts
getRole(input, consistencyManagement): CancelablePromise<RoleResult>;
```

Defined in: [gen/CamundaClient.ts:7248](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L7248)

Get role

Get a role by its ID.
 *

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

***

### getStartProcessForm()

```ts
getStartProcessForm(input, consistencyManagement): CancelablePromise<void | FormResult>;
```

Defined in: [gen/CamundaClient.ts:7313](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L7313)

Get process start form

Get the start form of a process.
Note that this endpoint will only return linked forms. This endpoint does not support embedded forms.

 *

#### Parameters

##### input

[`getStartProcessFormInput`](../type-aliases/getStartProcessFormInput.md)

##### consistencyManagement

[`getStartProcessFormConsistency`](../type-aliases/getStartProcessFormConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void` \| [`FormResult`](../type-aliases/FormResult.md)\>

#### Operation Id

getStartProcessForm

#### Tags

Process definition

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### getStatus()

```ts
getStatus(): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:7375](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L7375)

Get cluster status

Checks the health status of the cluster by verifying if there's at least one partition with a healthy leader.
 *

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

getStatus

#### Tags

Cluster

***

### getTenant()

```ts
getTenant(input, consistencyManagement): CancelablePromise<TenantResult>;
```

Defined in: [gen/CamundaClient.ts:7425](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L7425)

Get tenant

Retrieves a single tenant by tenant ID.
 *

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

***

### getTenantClusterVariable()

```ts
getTenantClusterVariable(input, consistencyManagement): CancelablePromise<ClusterVariableResult>;
```

Defined in: [gen/CamundaClient.ts:7488](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L7488)

Get a tenant-scoped cluster variable

Get a tenant-scoped cluster variable.
 *

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

***

### getTopology()

```ts
getTopology(): CancelablePromise<TopologyResponse>;
```

Defined in: [gen/CamundaClient.ts:7552](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L7552)

Get cluster topology

Obtains the current topology of the cluster the gateway is part of.
 *

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

***

### getUsageMetrics()

```ts
getUsageMetrics(input, consistencyManagement): CancelablePromise<UsageMetricsResponse>;
```

Defined in: [gen/CamundaClient.ts:7602](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L7602)

Get usage metrics

Retrieve the usage metrics based on given criteria.
 *

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

***

### getUser()

```ts
getUser(input, consistencyManagement): CancelablePromise<{
  email?: string;
  name?: string;
  username?: Username;
}>;
```

Defined in: [gen/CamundaClient.ts:7665](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L7665)

Get user

Get a user by its username.
 *

#### Parameters

##### input

[`getUserInput`](../type-aliases/getUserInput.md)

##### consistencyManagement

[`getUserConsistency`](../type-aliases/getUserConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `email?`: `string`;
  `name?`: `string`;
  `username?`: [`Username`](../type-aliases/Username.md);
\}\>

#### Operation Id

getUser

#### Tags

User

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### getUserTask()

```ts
getUserTask(input, consistencyManagement): CancelablePromise<UserTaskResult>;
```

Defined in: [gen/CamundaClient.ts:7728](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L7728)

Get user task

Get the user task by the user task key.
 *

#### Parameters

##### input

[`getUserTaskInput`](../type-aliases/getUserTaskInput.md)

##### consistencyManagement

[`getUserTaskConsistency`](../type-aliases/getUserTaskConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`UserTaskResult`](../type-aliases/UserTaskResult.md)\>

#### Operation Id

getUserTask

#### Tags

User task

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### getUserTaskForm()

```ts
getUserTaskForm(input, consistencyManagement): CancelablePromise<void | FormResult>;
```

Defined in: [gen/CamundaClient.ts:7793](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L7793)

Get user task form

Get the form of a user task.
Note that this endpoint will only return linked forms. This endpoint does not support embedded forms.

 *

#### Parameters

##### input

[`getUserTaskFormInput`](../type-aliases/getUserTaskFormInput.md)

##### consistencyManagement

[`getUserTaskFormConsistency`](../type-aliases/getUserTaskFormConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void` \| [`FormResult`](../type-aliases/FormResult.md)\>

#### Operation Id

getUserTaskForm

#### Tags

User task

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### getVariable()

```ts
getVariable(input, consistencyManagement): CancelablePromise<VariableResult>;
```

Defined in: [gen/CamundaClient.ts:7860](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L7860)

Get variable

Get a variable by its key.

This endpoint returns both process-level and local (element-scoped) variables.
The variable's scopeKey indicates whether it's a process-level variable or scoped to a
specific element instance.
 *

#### Parameters

##### input

[`getVariableInput`](../type-aliases/getVariableInput.md)

##### consistencyManagement

[`getVariableConsistency`](../type-aliases/getVariableConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`VariableResult`](../type-aliases/VariableResult.md)\>

#### Operation Id

getVariable

#### Tags

Variable

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### getWorkers()

```ts
getWorkers(): any[];
```

Defined in: [gen/CamundaClient.ts:1525](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1525)

Return a read-only snapshot of currently registered job workers.

#### Returns

`any`[]

***

### logger()

```ts
logger(scope?): Logger;
```

Defined in: [gen/CamundaClient.ts:1422](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1422)

Access a scoped logger (internal & future user emission).

#### Parameters

##### scope?

`string`

#### Returns

[`Logger`](../../logger/interfaces/Logger.md)

***

### migrateProcessInstance()

```ts
migrateProcessInstance(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:7929](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L7929)

Migrate process instance

Migrates a process instance to a new process definition.
This request can contain multiple mapping instructions to define mapping between the active
process instance's elements and target process definition elements.

Use this to upgrade a process instance to a new version of a process or to
a different process definition, e.g. to keep your running instances up-to-date with the
latest process improvements.

 *

#### Parameters

##### input

[`migrateProcessInstanceInput`](../type-aliases/migrateProcessInstanceInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

migrateProcessInstance

#### Tags

Process instance

***

### migrateProcessInstancesBatchOperation()

```ts
migrateProcessInstancesBatchOperation(input): CancelablePromise<BatchOperationCreatedResult>;
```

Defined in: [gen/CamundaClient.ts:7993](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L7993)

Migrate process instances (batch)

Migrate multiple process instances.
Since only process instances with ACTIVE state can be migrated, any given
filters for state are ignored and overridden during this batch operation.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

 *

#### Parameters

##### input

[`ProcessInstanceMigrationBatchOperationRequest`](../type-aliases/ProcessInstanceMigrationBatchOperationRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`BatchOperationCreatedResult`](../type-aliases/BatchOperationCreatedResult.md)\>

#### Operation Id

migrateProcessInstancesBatchOperation

#### Tags

Process instance

***

### modifyProcessInstance()

```ts
modifyProcessInstance(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:8057](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L8057)

Modify process instance

Modifies a running process instance.
This request can contain multiple instructions to activate an element of the process or
to terminate an active instance of an element.

Use this to repair a process instance that is stuck on an element or took an unintended path.
For example, because an external system is not available or doesn't respond as expected.

 *

#### Parameters

##### input

[`modifyProcessInstanceInput`](../type-aliases/modifyProcessInstanceInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

modifyProcessInstance

#### Tags

Process instance

***

### modifyProcessInstancesBatchOperation()

```ts
modifyProcessInstancesBatchOperation(input): CancelablePromise<BatchOperationCreatedResult>;
```

Defined in: [gen/CamundaClient.ts:8123](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L8123)

Modify process instances (batch)

Modify multiple process instances.
Since only process instances with ACTIVE state can be modified, any given
filters for state are ignored and overridden during this batch operation.
In contrast to single modification operation, it is not possible to add variable instructions or modify by element key.
It is only possible to use the element id of the source and target.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

 *

#### Parameters

##### input

[`ProcessInstanceModificationBatchOperationRequest`](../type-aliases/ProcessInstanceModificationBatchOperationRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`BatchOperationCreatedResult`](../type-aliases/BatchOperationCreatedResult.md)\>

#### Operation Id

modifyProcessInstancesBatchOperation

#### Tags

Process instance

***

### onAuthHeaders()

```ts
onAuthHeaders(h): void;
```

Defined in: [gen/CamundaClient.ts:1414](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1414)

#### Parameters

##### h

(`headers`) => 
  \| `Record`\<`string`, `string`\>
  \| `Promise`\<`Record`\<`string`, `string`\>\>

#### Returns

`void`

***

### pinClock()

```ts
pinClock(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:8187](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L8187)

Pin internal clock (alpha)

Set a precise, static time for the Zeebe engine's internal clock.
When the clock is pinned, it remains at the specified time and does not advance.
To change the time, the clock must be pinned again with a new timestamp.

This endpoint is an alpha feature and may be subject to change
in future releases.

 *

#### Parameters

##### input

[`ClockPinRequest`](../type-aliases/ClockPinRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

pinClock

#### Tags

Clock

***

### publishMessage()

```ts
publishMessage(input): CancelablePromise<MessagePublicationResult>;
```

Defined in: [gen/CamundaClient.ts:8252](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L8252)

Publish message

Publishes a single message.
Messages are published to specific partitions computed from their correlation keys.
Messages can be buffered.
The endpoint does not wait for a correlation result.
Use the message correlation endpoint for such use cases.

 *

#### Parameters

##### input

[`MessagePublicationRequest`](../type-aliases/MessagePublicationRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`MessagePublicationResult`](../type-aliases/MessagePublicationResult.md)\>

#### Example

```ts
async function publishMessageExample() {
  const camunda = createCamundaClient();

  await camunda.publishMessage({
    name: 'order-payment-received',
    correlationKey: 'ORD-12345',
    timeToLive: 60000,
    variables: {
      paymentId: 'PAY-123',
    },
  });
}
```

#### Operation Id

publishMessage

#### Tags

Message

***

### resetClock()

```ts
resetClock(): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:8320](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L8320)

Reset internal clock (alpha)

Resets the Zeebe engine's internal clock to the current system time, enabling it to tick in real-time.
This operation is useful for returning the clock to
normal behavior after it has been pinned to a specific time.

This endpoint is an alpha feature and may be subject to change
in future releases.

 *

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

resetClock

#### Tags

Clock

***

### resolveIncident()

```ts
resolveIncident(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:8373](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L8373)

Resolve incident

Marks the incident as resolved; most likely a call to Update job will be necessary
to reset the job's retries, followed by this call.

 *

#### Parameters

##### input

[`resolveIncidentInput`](../type-aliases/resolveIncidentInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Example

```ts
async function resolveIncidentExample() {
  const camunda = createCamundaClient();

  const incidentKey = IncidentKey.assumeExists('2251799813685249');

  await camunda.resolveIncident({ incidentKey });
}
```

#### Operation Id

resolveIncident

#### Tags

Incident

***

### resolveIncidentsBatchOperation()

```ts
resolveIncidentsBatchOperation(input): CancelablePromise<BatchOperationCreatedResult>;
```

Defined in: [gen/CamundaClient.ts:8437](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L8437)

Resolve related incidents (batch)

Resolves multiple instances of process instances.
Since only process instances with ACTIVE state can have unresolved incidents, any given
filters for state are ignored and overridden during this batch operation.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

 *

#### Parameters

##### input

[`ProcessInstanceIncidentResolutionBatchOperationRequest`](../type-aliases/ProcessInstanceIncidentResolutionBatchOperationRequest.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`BatchOperationCreatedResult`](../type-aliases/BatchOperationCreatedResult.md)\>

#### Operation Id

resolveIncidentsBatchOperation

#### Tags

Process instance

***

### resolveProcessInstanceIncidents()

```ts
resolveProcessInstanceIncidents(input): CancelablePromise<BatchOperationCreatedResult>;
```

Defined in: [gen/CamundaClient.ts:8495](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L8495)

Resolve related incidents

Creates a batch operation to resolve multiple incidents of a process instance.
 *

#### Parameters

##### input

[`resolveProcessInstanceIncidentsInput`](../type-aliases/resolveProcessInstanceIncidentsInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`BatchOperationCreatedResult`](../type-aliases/BatchOperationCreatedResult.md)\>

#### Operation Id

resolveProcessInstanceIncidents

#### Tags

Process instance

***

### resumeBatchOperation()

```ts
resumeBatchOperation(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:8555](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L8555)

Resume Batch operation

Resumes a suspended batch operation.
This is done asynchronously, the progress can be tracked using the batch operation status endpoint (/batch-operations/{batchOperationKey}).

 *

#### Parameters

##### input

###### batchOperationKey

[`BatchOperationKey`](../type-aliases/BatchOperationKey.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

resumeBatchOperation

#### Tags

Batch operation

***

### searchAuditLogs()

```ts
searchAuditLogs(input, consistencyManagement): CancelablePromise<AuditLogSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:8616](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L8616)

Search audit logs

Search for audit logs based on given criteria.
 *

#### Parameters

##### input

[`AuditLogSearchQueryRequest`](../type-aliases/AuditLogSearchQueryRequest.md)

##### consistencyManagement

[`searchAuditLogsConsistency`](../type-aliases/searchAuditLogsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`AuditLogSearchQueryResult`](../type-aliases/AuditLogSearchQueryResult.md)\>

#### Operation Id

searchAuditLogs

#### Tags

Audit Log

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchAuthorizations()

```ts
searchAuthorizations(input, consistencyManagement): CancelablePromise<AuthorizationSearchResult>;
```

Defined in: [gen/CamundaClient.ts:8679](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L8679)

Search authorizations

Search for authorizations based on given criteria.
 *

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

***

### searchBatchOperationItems()

```ts
searchBatchOperationItems(input, consistencyManagement): CancelablePromise<BatchOperationItemSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:8742](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L8742)

Search batch operation items

Search for batch operation items based on given criteria.
 *

#### Parameters

##### input

[`BatchOperationItemSearchQuery`](../type-aliases/BatchOperationItemSearchQuery.md)

##### consistencyManagement

[`searchBatchOperationItemsConsistency`](../type-aliases/searchBatchOperationItemsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`BatchOperationItemSearchQueryResult`](../type-aliases/BatchOperationItemSearchQueryResult.md)\>

#### Operation Id

searchBatchOperationItems

#### Tags

Batch operation

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchBatchOperations()

```ts
searchBatchOperations(input, consistencyManagement): CancelablePromise<BatchOperationSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:8805](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L8805)

Search batch operations

Search for batch operations based on given criteria.
 *

#### Parameters

##### input

[`BatchOperationSearchQuery`](../type-aliases/BatchOperationSearchQuery.md)

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

***

### searchClientsForGroup()

```ts
searchClientsForGroup(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:8868](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L8868)

Search group clients

Search clients assigned to a group.
 *

#### Parameters

##### input

[`searchClientsForGroupInput`](../type-aliases/searchClientsForGroupInput.md)

##### consistencyManagement

[`searchClientsForGroupConsistency`](../type-aliases/searchClientsForGroupConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchClientsForGroup

#### Tags

Group

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchClientsForRole()

```ts
searchClientsForRole(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:8933](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L8933)

Search role clients

Search clients with assigned role.
 *

#### Parameters

##### input

[`searchClientsForRoleInput`](../type-aliases/searchClientsForRoleInput.md)

##### consistencyManagement

[`searchClientsForRoleConsistency`](../type-aliases/searchClientsForRoleConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchClientsForRole

#### Tags

Role

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchClientsForTenant()

```ts
searchClientsForTenant(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:8998](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L8998)

Search clients for tenant

Retrieves a filtered and sorted list of clients for a specified tenant.
 *

#### Parameters

##### input

[`searchClientsForTenantInput`](../type-aliases/searchClientsForTenantInput.md)

##### consistencyManagement

[`searchClientsForTenantConsistency`](../type-aliases/searchClientsForTenantConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchClientsForTenant

#### Tags

Tenant

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchClusterVariables()

```ts
searchClusterVariables(input, consistencyManagement): CancelablePromise<ClusterVariableSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9061](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L9061)

Search for cluster variables based on given criteria. By default, long variable values in the response are truncated.
 *

#### Parameters

##### input

[`searchClusterVariablesInput`](../type-aliases/searchClusterVariablesInput.md)

##### consistencyManagement

[`searchClusterVariablesConsistency`](../type-aliases/searchClusterVariablesConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ClusterVariableSearchQueryResult`](../type-aliases/ClusterVariableSearchQueryResult.md)\>

#### Operation Id

searchClusterVariables

#### Tags

Cluster Variable

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchCorrelatedMessageSubscriptions()

```ts
searchCorrelatedMessageSubscriptions(input, consistencyManagement): CancelablePromise<CorrelatedMessageSubscriptionSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9126](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L9126)

Search correlated message subscriptions

Search correlated message subscriptions based on given criteria.
 *

#### Parameters

##### input

[`CorrelatedMessageSubscriptionSearchQuery`](../type-aliases/CorrelatedMessageSubscriptionSearchQuery.md)

##### consistencyManagement

[`searchCorrelatedMessageSubscriptionsConsistency`](../type-aliases/searchCorrelatedMessageSubscriptionsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`CorrelatedMessageSubscriptionSearchQueryResult`](../type-aliases/CorrelatedMessageSubscriptionSearchQueryResult.md)\>

#### Operation Id

searchCorrelatedMessageSubscriptions

#### Tags

Message subscription

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchDecisionDefinitions()

```ts
searchDecisionDefinitions(input, consistencyManagement): CancelablePromise<DecisionDefinitionSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9191](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L9191)

Search decision definitions

Search for decision definitions based on given criteria.
 *

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
      filter: { decisionDefinitionId: DecisionDefinitionId.assumeExists('invoice-classification') },
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

***

### searchDecisionInstances()

```ts
searchDecisionInstances(input, consistencyManagement): CancelablePromise<DecisionInstanceSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9254](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L9254)

Search decision instances

Search for decision instances based on given criteria.
 *

#### Parameters

##### input

[`DecisionInstanceSearchQuery`](../type-aliases/DecisionInstanceSearchQuery.md)

##### consistencyManagement

[`searchDecisionInstancesConsistency`](../type-aliases/searchDecisionInstancesConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`DecisionInstanceSearchQueryResult`](../type-aliases/DecisionInstanceSearchQueryResult.md)\>

#### Operation Id

searchDecisionInstances

#### Tags

Decision instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchDecisionRequirements()

```ts
searchDecisionRequirements(input, consistencyManagement): CancelablePromise<DecisionRequirementsSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9317](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L9317)

Search decision requirements

Search for decision requirements based on given criteria.
 *

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

***

### searchElementInstanceIncidents()

```ts
searchElementInstanceIncidents(input, consistencyManagement): CancelablePromise<IncidentSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9387](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L9387)

Search for incidents of a specific element instance

Search for incidents caused by the specified element instance, including incidents of any child instances created from this element instance.

Although the `elementInstanceKey` is provided as a path parameter to indicate the root element instance,
you may also include an `elementInstanceKey` within the filter object to narrow results to specific
child element instances. This is useful, for example, if you want to isolate incidents associated with
nested or subordinate elements within the given element instance while excluding incidents directly tied
to the root element itself.

 *

#### Parameters

##### input

[`searchElementInstanceIncidentsInput`](../type-aliases/searchElementInstanceIncidentsInput.md)

##### consistencyManagement

[`searchElementInstanceIncidentsConsistency`](../type-aliases/searchElementInstanceIncidentsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`IncidentSearchQueryResult`](../type-aliases/IncidentSearchQueryResult.md)\>

#### Operation Id

searchElementInstanceIncidents

#### Tags

Element instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchElementInstances()

```ts
searchElementInstances(input, consistencyManagement): CancelablePromise<ElementInstanceSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9452](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L9452)

Search element instances

Search for element instances based on given criteria.
 *

#### Parameters

##### input

[`ElementInstanceSearchQuery`](../type-aliases/ElementInstanceSearchQuery.md)

##### consistencyManagement

[`searchElementInstancesConsistency`](../type-aliases/searchElementInstancesConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ElementInstanceSearchQueryResult`](../type-aliases/ElementInstanceSearchQueryResult.md)\>

#### Operation Id

searchElementInstances

#### Tags

Element instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchGlobalTaskListeners()

```ts
searchGlobalTaskListeners(input, consistencyManagement): CancelablePromise<GlobalTaskListenerSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9515](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L9515)

Search global user task listeners

Search for global user task listeners based on given criteria.
 *

#### Parameters

##### input

[`GlobalTaskListenerSearchQueryRequest`](../type-aliases/GlobalTaskListenerSearchQueryRequest.md)

##### consistencyManagement

[`searchGlobalTaskListenersConsistency`](../type-aliases/searchGlobalTaskListenersConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`GlobalTaskListenerSearchQueryResult`](../type-aliases/GlobalTaskListenerSearchQueryResult.md)\>

#### Operation Id

searchGlobalTaskListeners

#### Tags

Global listener

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchGroupIdsForTenant()

```ts
searchGroupIdsForTenant(input, consistencyManagement): CancelablePromise<TenantGroupSearchResult>;
```

Defined in: [gen/CamundaClient.ts:9578](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L9578)

Search groups for tenant

Retrieves a filtered and sorted list of groups for a specified tenant.
 *

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

***

### searchGroups()

```ts
searchGroups(input, consistencyManagement): CancelablePromise<GroupSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9643](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L9643)

Search groups

Search for groups based on given criteria.
 *

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

***

### searchGroupsForRole()

```ts
searchGroupsForRole(input, consistencyManagement): CancelablePromise<RoleGroupSearchResult>;
```

Defined in: [gen/CamundaClient.ts:9706](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L9706)

Search role groups

Search groups with assigned role.
 *

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

***

### searchIncidents()

```ts
searchIncidents(input, consistencyManagement): CancelablePromise<IncidentSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9774](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L9774)

Search incidents

Search for incidents based on given criteria.

 *

#### Parameters

##### input

[`IncidentSearchQuery`](../type-aliases/IncidentSearchQuery.md)

##### consistencyManagement

[`searchIncidentsConsistency`](../type-aliases/searchIncidentsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`IncidentSearchQueryResult`](../type-aliases/IncidentSearchQueryResult.md)\>

#### Example

```ts
async function searchIncidentsExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchIncidents(
    {
      filter: { state: 'ACTIVE' },
      sort: [{ field: 'creationTime', order: 'DESC' }],
      page: { limit: 20 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const incident of result.items ?? []) {
    console.log(`${incident.incidentKey}: ${incident.errorType} — ${incident.errorMessage}`);
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

***

### searchJobs()

```ts
searchJobs(input, consistencyManagement): CancelablePromise<JobSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9837](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L9837)

Search jobs

Search for jobs based on given criteria.
 *

#### Parameters

##### input

[`JobSearchQuery`](../type-aliases/JobSearchQuery.md)

##### consistencyManagement

[`searchJobsConsistency`](../type-aliases/searchJobsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`JobSearchQueryResult`](../type-aliases/JobSearchQueryResult.md)\>

#### Operation Id

searchJobs

#### Tags

Job

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchMappingRule()

```ts
searchMappingRule(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:9901](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L9901)

Search mapping rules

Search for mapping rules based on given criteria.

 *

#### Parameters

##### input

[`MappingRuleSearchQueryRequest`](../type-aliases/MappingRuleSearchQueryRequest.md)

##### consistencyManagement

[`searchMappingRuleConsistency`](../type-aliases/searchMappingRuleConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchMappingRule

#### Tags

Mapping rule

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchMappingRulesForGroup()

```ts
searchMappingRulesForGroup(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:9964](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L9964)

Search group mapping rules

Search mapping rules assigned to a group.
 *

#### Parameters

##### input

[`searchMappingRulesForGroupInput`](../type-aliases/searchMappingRulesForGroupInput.md)

##### consistencyManagement

[`searchMappingRulesForGroupConsistency`](../type-aliases/searchMappingRulesForGroupConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchMappingRulesForGroup

#### Tags

Group

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchMappingRulesForRole()

```ts
searchMappingRulesForRole(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:10029](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L10029)

Search role mapping rules

Search mapping rules with assigned role.
 *

#### Parameters

##### input

[`searchMappingRulesForRoleInput`](../type-aliases/searchMappingRulesForRoleInput.md)

##### consistencyManagement

[`searchMappingRulesForRoleConsistency`](../type-aliases/searchMappingRulesForRoleConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchMappingRulesForRole

#### Tags

Role

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchMappingRulesForTenant()

```ts
searchMappingRulesForTenant(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:10094](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L10094)

Search mapping rules for tenant

Retrieves a filtered and sorted list of MappingRules for a specified tenant.
 *

#### Parameters

##### input

[`searchMappingRulesForTenantInput`](../type-aliases/searchMappingRulesForTenantInput.md)

##### consistencyManagement

[`searchMappingRulesForTenantConsistency`](../type-aliases/searchMappingRulesForTenantConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchMappingRulesForTenant

#### Tags

Tenant

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchMessageSubscriptions()

```ts
searchMessageSubscriptions(input, consistencyManagement): CancelablePromise<MessageSubscriptionSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:10159](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L10159)

Search message subscriptions

Search for message subscriptions based on given criteria.
 *

#### Parameters

##### input

[`MessageSubscriptionSearchQuery`](../type-aliases/MessageSubscriptionSearchQuery.md)

##### consistencyManagement

[`searchMessageSubscriptionsConsistency`](../type-aliases/searchMessageSubscriptionsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`MessageSubscriptionSearchQueryResult`](../type-aliases/MessageSubscriptionSearchQueryResult.md)\>

#### Operation Id

searchMessageSubscriptions

#### Tags

Message subscription

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchProcessDefinitions()

```ts
searchProcessDefinitions(input, consistencyManagement): CancelablePromise<ProcessDefinitionSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:10222](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L10222)

Search process definitions

Search for process definitions based on given criteria.
 *

#### Parameters

##### input

[`ProcessDefinitionSearchQuery`](../type-aliases/ProcessDefinitionSearchQuery.md)

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

***

### searchProcessInstanceIncidents()

```ts
searchProcessInstanceIncidents(input, consistencyManagement): CancelablePromise<IncidentSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:10291](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L10291)

Search related incidents

Search for incidents caused by the process instance or any of its called process or decision instances.

Although the `processInstanceKey` is provided as a path parameter to indicate the root process instance,
you may also include a `processInstanceKey` within the filter object to narrow results to specific
child process instances. This is useful, for example, if you want to isolate incidents associated with
subprocesses or called processes under the root instance while excluding incidents directly tied to the root.

 *

#### Parameters

##### input

[`searchProcessInstanceIncidentsInput`](../type-aliases/searchProcessInstanceIncidentsInput.md)

##### consistencyManagement

[`searchProcessInstanceIncidentsConsistency`](../type-aliases/searchProcessInstanceIncidentsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`IncidentSearchQueryResult`](../type-aliases/IncidentSearchQueryResult.md)\>

#### Operation Id

searchProcessInstanceIncidents

#### Tags

Process instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchProcessInstances()

```ts
searchProcessInstances(input, consistencyManagement): CancelablePromise<ProcessInstanceSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:10358](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L10358)

Search process instances

Search for process instances based on given criteria.
 *

#### Parameters

##### input

[`ProcessInstanceSearchQuery`](../type-aliases/ProcessInstanceSearchQuery.md)

##### consistencyManagement

[`searchProcessInstancesConsistency`](../type-aliases/searchProcessInstancesConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ProcessInstanceSearchQueryResult`](../type-aliases/ProcessInstanceSearchQueryResult.md)\>

#### Example

```ts
async function searchProcessInstancesExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchProcessInstances(
    {
      filter: { processDefinitionId: ProcessDefinitionId.assumeExists('order-process') },
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
```

#### Operation Id

searchProcessInstances

#### Tags

Process instance

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchRoles()

```ts
searchRoles(input, consistencyManagement): CancelablePromise<RoleSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:10421](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L10421)

Search roles

Search for roles based on given criteria.
 *

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

***

### searchRolesForGroup()

```ts
searchRolesForGroup(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:10484](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L10484)

Search group roles

Search roles assigned to a group.
 *

#### Parameters

##### input

[`searchRolesForGroupInput`](../type-aliases/searchRolesForGroupInput.md)

##### consistencyManagement

[`searchRolesForGroupConsistency`](../type-aliases/searchRolesForGroupConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchRolesForGroup

#### Tags

Group

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchRolesForTenant()

```ts
searchRolesForTenant(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:10549](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L10549)

Search roles for tenant

Retrieves a filtered and sorted list of roles for a specified tenant.
 *

#### Parameters

##### input

[`searchRolesForTenantInput`](../type-aliases/searchRolesForTenantInput.md)

##### consistencyManagement

[`searchRolesForTenantConsistency`](../type-aliases/searchRolesForTenantConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchRolesForTenant

#### Tags

Tenant

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchTenants()

```ts
searchTenants(input, consistencyManagement): CancelablePromise<TenantSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:10614](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L10614)

Search tenants

Retrieves a filtered and sorted list of tenants.
 *

#### Parameters

##### input

[`TenantSearchQueryRequest`](../type-aliases/TenantSearchQueryRequest.md)

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

***

### searchUsers()

```ts
searchUsers(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:10677](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L10677)

Search users

Search for users based on given criteria.
 *

#### Parameters

##### input

[`UserSearchQueryRequest`](../type-aliases/UserSearchQueryRequest.md)

##### consistencyManagement

[`searchUsersConsistency`](../type-aliases/searchUsersConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchUsers

#### Tags

User

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchUsersForGroup()

```ts
searchUsersForGroup(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:10740](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L10740)

Search group users

Search users assigned to a group.
 *

#### Parameters

##### input

[`searchUsersForGroupInput`](../type-aliases/searchUsersForGroupInput.md)

##### consistencyManagement

[`searchUsersForGroupConsistency`](../type-aliases/searchUsersForGroupConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchUsersForGroup

#### Tags

Group

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchUsersForRole()

```ts
searchUsersForRole(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:10805](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L10805)

Search role users

Search users with assigned role.
 *

#### Parameters

##### input

[`searchUsersForRoleInput`](../type-aliases/searchUsersForRoleInput.md)

##### consistencyManagement

[`searchUsersForRoleConsistency`](../type-aliases/searchUsersForRoleConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchUsersForRole

#### Tags

Role

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchUsersForTenant()

```ts
searchUsersForTenant(input, consistencyManagement): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:10870](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L10870)

Search users for tenant

Retrieves a filtered and sorted list of users for a specified tenant.
 *

#### Parameters

##### input

[`searchUsersForTenantInput`](../type-aliases/searchUsersForTenantInput.md)

##### consistencyManagement

[`searchUsersForTenantConsistency`](../type-aliases/searchUsersForTenantConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SearchQueryResponse`](../type-aliases/SearchQueryResponse.md) & `object`\>

#### Operation Id

searchUsersForTenant

#### Tags

Tenant

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchUserTaskAuditLogs()

```ts
searchUserTaskAuditLogs(input, consistencyManagement): CancelablePromise<AuditLogSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:10935](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L10935)

Search user task audit logs

Search for user task audit logs based on given criteria.
 *

#### Parameters

##### input

[`searchUserTaskAuditLogsInput`](../type-aliases/searchUserTaskAuditLogsInput.md)

##### consistencyManagement

[`searchUserTaskAuditLogsConsistency`](../type-aliases/searchUserTaskAuditLogsConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`AuditLogSearchQueryResult`](../type-aliases/AuditLogSearchQueryResult.md)\>

#### Operation Id

searchUserTaskAuditLogs

#### Tags

User task

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchUserTasks()

```ts
searchUserTasks(input, consistencyManagement): CancelablePromise<UserTaskSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:11002](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L11002)

Search user tasks

Search for user tasks based on given criteria.
 *

#### Parameters

##### input

[`UserTaskSearchQuery`](../type-aliases/UserTaskSearchQuery.md)

##### consistencyManagement

[`searchUserTasksConsistency`](../type-aliases/searchUserTasksConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`UserTaskSearchQueryResult`](../type-aliases/UserTaskSearchQueryResult.md)\>

#### Example

```ts
async function searchUserTasksExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchUserTasks(
    {
      filter: { assignee: 'alice', state: 'CREATED' },
      sort: [{ field: 'creationDate', order: 'DESC' }],
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

***

### searchUserTaskVariables()

```ts
searchUserTaskVariables(input, consistencyManagement): CancelablePromise<VariableSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:11068](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L11068)

Search user task variables

Search for user task variables based on given criteria. This endpoint returns all variables
visible from the user task's scope, including variables from parent scopes in the scope
hierarchy. By default, long variable values in the response are truncated.

 *

#### Parameters

##### input

[`searchUserTaskVariablesInput`](../type-aliases/searchUserTaskVariablesInput.md)

##### consistencyManagement

[`searchUserTaskVariablesConsistency`](../type-aliases/searchUserTaskVariablesConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`VariableSearchQueryResult`](../type-aliases/VariableSearchQueryResult.md)\>

#### Operation Id

searchUserTaskVariables

#### Tags

User task

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### searchVariables()

```ts
searchVariables(input, consistencyManagement): CancelablePromise<VariableSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:11143](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L11143)

Search variables

Search for variables based on given criteria.

This endpoint returns variables that exist directly at the specified scopes - it does not
include variables from parent scopes that would be visible through the scope hierarchy.

Variables can be process-level (scoped to the process instance) or local (scoped to specific
BPMN elements like tasks, subprocesses, etc.).

By default, long variable values in the response are truncated.
 *

#### Parameters

##### input

[`searchVariablesInput`](../type-aliases/searchVariablesInput.md)

##### consistencyManagement

[`searchVariablesConsistency`](../type-aliases/searchVariablesConsistency.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`VariableSearchQueryResult`](../type-aliases/VariableSearchQueryResult.md)\>

#### Operation Id

searchVariables

#### Tags

Variable

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### stopAllWorkers()

```ts
stopAllWorkers(): void;
```

Defined in: [gen/CamundaClient.ts:1529](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1529)

Stop all registered job workers (best-effort).

#### Returns

`void`

***

### suspendBatchOperation()

```ts
suspendBatchOperation(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11209](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L11209)

Suspend Batch operation

Suspends a running batch operation.
This is done asynchronously, the progress can be tracked using the batch operation status endpoint (/batch-operations/{batchOperationKey}).

 *

#### Parameters

##### input

###### batchOperationKey

[`BatchOperationKey`](../type-aliases/BatchOperationKey.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

suspendBatchOperation

#### Tags

Batch operation

***

### throwJobError()

```ts
throwJobError(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11270](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L11270)

Throw error for job

Reports a business error (i.e. non-technical) that occurs while processing a job.

 *

#### Parameters

##### input

[`throwJobErrorInput`](../type-aliases/throwJobErrorInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

throwJobError

#### Tags

Job

***

### unassignClientFromGroup()

```ts
unassignClientFromGroup(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11332](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L11332)

Unassign a client from a group

Unassigns a client from a group.
The client is removed as a group member, with associated authorizations, roles, and tenant assignments no longer applied.

 *

#### Parameters

##### input

[`unassignClientFromGroupInput`](../type-aliases/unassignClientFromGroupInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignClientFromGroup

#### Tags

Group

***

### unassignClientFromTenant()

```ts
unassignClientFromTenant(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11392](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L11392)

Unassign a client from a tenant

Unassigns the client from the specified tenant.
The client can no longer access tenant data.

 *

#### Parameters

##### input

[`unassignClientFromTenantInput`](../type-aliases/unassignClientFromTenantInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignClientFromTenant

#### Tags

Tenant

***

### unassignGroupFromTenant()

```ts
unassignGroupFromTenant(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11452](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L11452)

Unassign a group from a tenant

Unassigns a group from a specified tenant.
Members of the group (users, clients) will no longer have access to the tenant's data - except they are assigned directly to the tenant.

 *

#### Parameters

##### input

[`unassignGroupFromTenantInput`](../type-aliases/unassignGroupFromTenantInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignGroupFromTenant

#### Tags

Tenant

***

### unassignMappingRuleFromGroup()

```ts
unassignMappingRuleFromGroup(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11510](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L11510)

Unassign a mapping rule from a group

Unassigns a mapping rule from a group.
 *

#### Parameters

##### input

[`unassignMappingRuleFromGroupInput`](../type-aliases/unassignMappingRuleFromGroupInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignMappingRuleFromGroup

#### Tags

Group

***

### unassignMappingRuleFromTenant()

```ts
unassignMappingRuleFromTenant(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11568](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L11568)

Unassign a mapping rule from a tenant

Unassigns a single mapping rule from a specified tenant without deleting the rule.
 *

#### Parameters

##### input

[`unassignMappingRuleFromTenantInput`](../type-aliases/unassignMappingRuleFromTenantInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignMappingRuleFromTenant

#### Tags

Tenant

***

### unassignRoleFromClient()

```ts
unassignRoleFromClient(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11626](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L11626)

Unassign a role from a client

Unassigns the specified role from the client. The client will no longer inherit the authorizations associated with this role.
 *

#### Parameters

##### input

[`unassignRoleFromClientInput`](../type-aliases/unassignRoleFromClientInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignRoleFromClient

#### Tags

Role

***

### unassignRoleFromGroup()

```ts
unassignRoleFromGroup(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11684](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L11684)

Unassign a role from a group

Unassigns the specified role from the group. All group members (user or client) no longer inherit the authorizations associated with this role.
 *

#### Parameters

##### input

[`unassignRoleFromGroupInput`](../type-aliases/unassignRoleFromGroupInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignRoleFromGroup

#### Tags

Role

***

### unassignRoleFromMappingRule()

```ts
unassignRoleFromMappingRule(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11742](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L11742)

Unassign a role from a mapping rule

Unassigns a role from a mapping rule.
 *

#### Parameters

##### input

[`unassignRoleFromMappingRuleInput`](../type-aliases/unassignRoleFromMappingRuleInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignRoleFromMappingRule

#### Tags

Role

***

### unassignRoleFromTenant()

```ts
unassignRoleFromTenant(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11803](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L11803)

Unassign a role from a tenant

Unassigns a role from a specified tenant.
Users, Clients or Groups, that have the role assigned, will no longer have access to the
tenant's data - unless they are assigned directly to the tenant.

 *

#### Parameters

##### input

[`unassignRoleFromTenantInput`](../type-aliases/unassignRoleFromTenantInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignRoleFromTenant

#### Tags

Tenant

***

### unassignRoleFromUser()

```ts
unassignRoleFromUser(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11861](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L11861)

Unassign a role from a user

Unassigns a role from a user. The user will no longer inherit the authorizations associated with this role.
 *

#### Parameters

##### input

[`unassignRoleFromUserInput`](../type-aliases/unassignRoleFromUserInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignRoleFromUser

#### Tags

Role

***

### unassignUserFromGroup()

```ts
unassignUserFromGroup(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11921](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L11921)

Unassign a user from a group

Unassigns a user from a group.
The user is removed as a group member, with associated authorizations, roles, and tenant assignments no longer applied.

 *

#### Parameters

##### input

[`unassignUserFromGroupInput`](../type-aliases/unassignUserFromGroupInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignUserFromGroup

#### Tags

Group

***

### unassignUserFromTenant()

```ts
unassignUserFromTenant(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11981](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L11981)

Unassign a user from a tenant

Unassigns the user from the specified tenant.
The user can no longer access tenant data.

 *

#### Parameters

##### input

[`unassignUserFromTenantInput`](../type-aliases/unassignUserFromTenantInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignUserFromTenant

#### Tags

Tenant

***

### unassignUserTask()

```ts
unassignUserTask(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:12041](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L12041)

Unassign user task

Removes the assignee of a task with the given key.
 *

#### Parameters

##### input

[`unassignUserTaskInput`](../type-aliases/unassignUserTaskInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Example

```ts
async function unassignUserTaskExample() {
  const camunda = createCamundaClient();

  const userTaskKey = UserTaskKey.assumeExists('2251799813685249');

  await camunda.unassignUserTask({ userTaskKey });
}
```

#### Operation Id

unassignUserTask

#### Tags

User task

***

### updateAuthorization()

```ts
updateAuthorization(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:12099](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L12099)

Update authorization

Update the authorization with the given key.
 *

#### Parameters

##### input

[`updateAuthorizationInput`](../type-aliases/updateAuthorizationInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

updateAuthorization

#### Tags

Authorization

***

### updateGlobalClusterVariable()

```ts
updateGlobalClusterVariable(input): CancelablePromise<ClusterVariableResult>;
```

Defined in: [gen/CamundaClient.ts:12161](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L12161)

Update a global-scoped cluster variable

Updates the value of an existing global cluster variable.
The variable must exist, otherwise a 404 error is returned.

 *

#### Parameters

##### input

[`updateGlobalClusterVariableInput`](../type-aliases/updateGlobalClusterVariableInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ClusterVariableResult`](../type-aliases/ClusterVariableResult.md)\>

#### Operation Id

updateGlobalClusterVariable

#### Tags

Cluster Variable

***

### updateGlobalTaskListener()

```ts
updateGlobalTaskListener(input): CancelablePromise<GlobalTaskListenerResult>;
```

Defined in: [gen/CamundaClient.ts:12221](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L12221)

Update global user task listener

Updates a global user task listener.
 *

#### Parameters

##### input

[`updateGlobalTaskListenerInput`](../type-aliases/updateGlobalTaskListenerInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`GlobalTaskListenerResult`](../type-aliases/GlobalTaskListenerResult.md)\>

#### Operation Id

updateGlobalTaskListener

#### Tags

Global listener

***

### updateGroup()

```ts
updateGroup(input): CancelablePromise<GroupUpdateResult>;
```

Defined in: [gen/CamundaClient.ts:12281](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L12281)

Update group

Update a group with the given ID.
 *

#### Parameters

##### input

[`updateGroupInput`](../type-aliases/updateGroupInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`GroupUpdateResult`](../type-aliases/GroupUpdateResult.md)\>

#### Operation Id

updateGroup

#### Tags

Group

***

### updateJob()

```ts
updateJob(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:12341](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L12341)

Update job

Update a job with the given key.
 *

#### Parameters

##### input

[`updateJobInput`](../type-aliases/updateJobInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

updateJob

#### Tags

Job

***

### updateMappingRule()

```ts
updateMappingRule(input): CancelablePromise<MappingRuleCreateUpdateResult>;
```

Defined in: [gen/CamundaClient.ts:12402](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L12402)

Update mapping rule

Update a mapping rule.

 *

#### Parameters

##### input

[`updateMappingRuleInput`](../type-aliases/updateMappingRuleInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`MappingRuleCreateUpdateResult`](../type-aliases/MappingRuleCreateUpdateResult.md)\>

#### Operation Id

updateMappingRule

#### Tags

Mapping rule

***

### updateRole()

```ts
updateRole(input): CancelablePromise<RoleUpdateResult>;
```

Defined in: [gen/CamundaClient.ts:12462](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L12462)

Update role

Update a role with the given ID.
 *

#### Parameters

##### input

[`updateRoleInput`](../type-aliases/updateRoleInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`RoleUpdateResult`](../type-aliases/RoleUpdateResult.md)\>

#### Operation Id

updateRole

#### Tags

Role

***

### updateTenant()

```ts
updateTenant(input): CancelablePromise<TenantUpdateResult>;
```

Defined in: [gen/CamundaClient.ts:12522](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L12522)

Update tenant

Updates an existing tenant.
 *

#### Parameters

##### input

[`updateTenantInput`](../type-aliases/updateTenantInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`TenantUpdateResult`](../type-aliases/TenantUpdateResult.md)\>

#### Operation Id

updateTenant

#### Tags

Tenant

***

### updateTenantClusterVariable()

```ts
updateTenantClusterVariable(input): CancelablePromise<ClusterVariableResult>;
```

Defined in: [gen/CamundaClient.ts:12584](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L12584)

Update a tenant-scoped cluster variable

Updates the value of an existing tenant-scoped cluster variable.
The variable must exist, otherwise a 404 error is returned.

 *

#### Parameters

##### input

[`updateTenantClusterVariableInput`](../type-aliases/updateTenantClusterVariableInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ClusterVariableResult`](../type-aliases/ClusterVariableResult.md)\>

#### Operation Id

updateTenantClusterVariable

#### Tags

Cluster Variable

***

### updateUser()

```ts
updateUser(input): CancelablePromise<{
  email?: string;
  name?: string;
  username?: Username;
}>;
```

Defined in: [gen/CamundaClient.ts:12644](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L12644)

Update user

Updates a user.
 *

#### Parameters

##### input

[`updateUserInput`](../type-aliases/updateUserInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `email?`: `string`;
  `name?`: `string`;
  `username?`: [`Username`](../type-aliases/Username.md);
\}\>

#### Operation Id

updateUser

#### Tags

User

***

### updateUserTask()

```ts
updateUserTask(input): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:12704](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L12704)

Update user task

Update a user task with the given key.
 *

#### Parameters

##### input

[`updateUserTaskInput`](../type-aliases/updateUserTaskInput.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

updateUserTask

#### Tags

User task

***

### withCorrelation()

```ts
withCorrelation<T>(id, fn): Promise<T>;
```

Defined in: [gen/CamundaClient.ts:1450](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1450)

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
