---
title: "Class: CamundaClient"
sidebar_label: "CamundaClient"
mdx:
  format: md
---

# Class: CamundaClient

Defined in: [gen/CamundaClient.ts:1171](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1171)

## Constructors

### Constructor

```ts
new CamundaClient(opts): CamundaClient;
```

Defined in: [gen/CamundaClient.ts:1197](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1197)

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

Defined in: [gen/CamundaClient.ts:1318](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1318)

##### Returns

`Readonly`\<[`CamundaConfig`](../interfaces/CamundaConfig.md)\>

## Methods

### \_getSupportLogger()

```ts
_getSupportLogger(): SupportLogger;
```

Defined in: [gen/CamundaClient.ts:1447](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1447)

Internal accessor for support logger (no public API commitment yet).

#### Returns

[`SupportLogger`](../interfaces/SupportLogger.md)

***

### \_invokeWithRetry()

```ts
_invokeWithRetry<T>(op, opts): Promise<T>;
```

Defined in: [gen/CamundaClient.ts:1480](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1480)

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

###### retryOverride?

  \| `false`
  \| `Partial`\<[`HttpRetryPolicy`](../interfaces/HttpRetryPolicy.md)\>

#### Returns

`Promise`\<`T`\>

***

### activateAdHocSubProcessActivities()

```ts
activateAdHocSubProcessActivities(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:1573](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1573)

Activate activities within an ad-hoc sub-process

Activates selected activities within an ad-hoc sub-process identified by element ID.
The provided element IDs must exist within the ad-hoc sub-process instance identified by the
provided adHocSubProcessInstanceKey.

 *

#### Parameters

##### input

[`activateAdHocSubProcessActivitiesInput`](../type-aliases/activateAdHocSubProcessActivitiesInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

activateAdHocSubProcessActivities

#### Tags

Ad-hoc sub-process

***

### activateJobs()

```ts
activateJobs(input, options?): CancelablePromise<{
  jobs: EnrichedActivatedJob[];
}>;
```

Defined in: [gen/CamundaClient.ts:1636](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1636)

Activate jobs

Iterate through all known partitions and activate jobs up to the requested maximum.

 *

#### Parameters

##### input

[`JobActivationRequest`](../type-aliases/JobActivationRequest.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
assignClientToGroup(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:1697](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1697)

Assign a client to a group

Assigns a client to a group, making it a member of the group.
Members of the group inherit the group authorizations, roles, and tenant assignments.

 *

#### Parameters

##### input

[`assignClientToGroupInput`](../type-aliases/assignClientToGroupInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignClientToGroup

#### Tags

Group

***

### assignClientToTenant()

```ts
assignClientToTenant(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:1757](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1757)

Assign a client to a tenant

Assign the client to the specified tenant.
The client can then access tenant data and perform authorized actions.

 *

#### Parameters

##### input

[`assignClientToTenantInput`](../type-aliases/assignClientToTenantInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignClientToTenant

#### Tags

Tenant

***

### assignGroupToTenant()

```ts
assignGroupToTenant(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:1817](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1817)

Assign a group to a tenant

Assigns a group to a specified tenant.
Group members (users, clients) can then access tenant data and perform authorized actions.

 *

#### Parameters

##### input

[`assignGroupToTenantInput`](../type-aliases/assignGroupToTenantInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignGroupToTenant

#### Tags

Tenant

***

### assignMappingRuleToGroup()

```ts
assignMappingRuleToGroup(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:1875](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1875)

Assign a mapping rule to a group

Assigns a mapping rule to a group.
 *

#### Parameters

##### input

[`assignMappingRuleToGroupInput`](../type-aliases/assignMappingRuleToGroupInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignMappingRuleToGroup

#### Tags

Group

***

### assignMappingRuleToTenant()

```ts
assignMappingRuleToTenant(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:1933](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1933)

Assign a mapping rule to a tenant

Assign a single mapping rule to a specified tenant.
 *

#### Parameters

##### input

[`assignMappingRuleToTenantInput`](../type-aliases/assignMappingRuleToTenantInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignMappingRuleToTenant

#### Tags

Tenant

***

### assignRoleToClient()

```ts
assignRoleToClient(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:1991](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1991)

Assign a role to a client

Assigns the specified role to the client. The client will inherit the authorizations associated with this role.
 *

#### Parameters

##### input

[`assignRoleToClientInput`](../type-aliases/assignRoleToClientInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignRoleToClient

#### Tags

Role

***

### assignRoleToGroup()

```ts
assignRoleToGroup(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2049](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L2049)

Assign a role to a group

Assigns the specified role to the group. Every member of the group (user or client) will inherit the authorizations associated with this role.
 *

#### Parameters

##### input

[`assignRoleToGroupInput`](../type-aliases/assignRoleToGroupInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignRoleToGroup

#### Tags

Role

***

### assignRoleToMappingRule()

```ts
assignRoleToMappingRule(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2107](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L2107)

Assign a role to a mapping rule

Assigns a role to a mapping rule.
 *

#### Parameters

##### input

[`assignRoleToMappingRuleInput`](../type-aliases/assignRoleToMappingRuleInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignRoleToMappingRule

#### Tags

Role

***

### assignRoleToTenant()

```ts
assignRoleToTenant(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2167](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L2167)

Assign a role to a tenant

Assigns a role to a specified tenant.
Users, Clients or Groups, that have the role assigned, will get access to the tenant's data and can perform actions according to their authorizations.

 *

#### Parameters

##### input

[`assignRoleToTenantInput`](../type-aliases/assignRoleToTenantInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignRoleToTenant

#### Tags

Tenant

***

### assignRoleToUser()

```ts
assignRoleToUser(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2225](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L2225)

Assign a role to a user

Assigns the specified role to the user. The user will inherit the authorizations associated with this role.
 *

#### Parameters

##### input

[`assignRoleToUserInput`](../type-aliases/assignRoleToUserInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignRoleToUser

#### Tags

Role

***

### assignUserTask()

```ts
assignUserTask(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2285](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L2285)

Assign user task

Assigns a user task with the given key to the given assignee.
 *

#### Parameters

##### input

[`assignUserTaskInput`](../type-aliases/assignUserTaskInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
assignUserToGroup(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2347](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L2347)

Assign a user to a group

Assigns a user to a group, making the user a member of the group.
Group members inherit the group authorizations, roles, and tenant assignments.

 *

#### Parameters

##### input

[`assignUserToGroupInput`](../type-aliases/assignUserToGroupInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignUserToGroup

#### Tags

Group

***

### assignUserToTenant()

```ts
assignUserToTenant(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2405](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L2405)

Assign a user to a tenant

Assign a single user to a specified tenant. The user can then access tenant data and perform authorized actions.
 *

#### Parameters

##### input

[`assignUserToTenantInput`](../type-aliases/assignUserToTenantInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

assignUserToTenant

#### Tags

Tenant

***

### broadcastSignal()

```ts
broadcastSignal(input, options?): CancelablePromise<SignalBroadcastResult>;
```

Defined in: [gen/CamundaClient.ts:2465](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L2465)

Broadcast signal

Broadcasts a signal.
 *

#### Parameters

##### input

[`SignalBroadcastRequest`](../type-aliases/SignalBroadcastRequest.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
cancelBatchOperation(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2529](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L2529)

Cancel Batch operation

Cancels a running batch operation.
This is done asynchronously, the progress can be tracked using the batch operation status endpoint (/batch-operations/{batchOperationKey}).

 *

#### Parameters

##### input

###### batchOperationKey

[`BatchOperationKey`](../type-aliases/BatchOperationKey.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

cancelBatchOperation

#### Tags

Batch operation

***

### cancelProcessInstance()

```ts
cancelProcessInstance(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2591](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L2591)

Cancel process instance

Cancels a running process instance. As a cancellation includes more than just the removal of the process instance resource, the cancellation resource must be posted.
 *

#### Parameters

##### input

`object` & `object`

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
cancelProcessInstancesBatchOperation(input, options?): CancelablePromise<BatchOperationCreatedResult>;
```

Defined in: [gen/CamundaClient.ts:2655](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L2655)

Cancel process instances (batch)

Cancels multiple running process instances.
Since only ACTIVE root instances can be cancelled, any given filters for state and
parentProcessInstanceKey are ignored and overridden during this batch operation.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

 *

#### Parameters

##### input

[`ProcessInstanceCancellationBatchOperationRequest`](../type-aliases/ProcessInstanceCancellationBatchOperationRequest.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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

Defined in: [gen/CamundaClient.ts:1426](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1426)

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
completeJob(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2716](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L2716)

Complete job

Complete a job with the given payload, which allows completing the associated service task.

 *

#### Parameters

##### input

[`completeJobInput`](../type-aliases/completeJobInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
completeUserTask(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:2778](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L2778)

Complete user task

Completes a user task with the given key.
 *

#### Parameters

##### input

[`completeUserTaskInput`](../type-aliases/completeUserTaskInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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

Defined in: [gen/CamundaClient.ts:1330](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1330)

#### Parameters

##### next

[`CamundaOptions`](../interfaces/CamundaOptions.md)

#### Returns

`void`

***

### correlateMessage()

```ts
correlateMessage(input, options?): CancelablePromise<MessageCorrelationResult>;
```

Defined in: [gen/CamundaClient.ts:2844](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L2844)

Correlate message

Publishes a message and correlates it to a subscription.
If correlation is successful it will return the first process instance key the message correlated with.
The message is not buffered.
Use the publish message endpoint to send messages that can be buffered.

 *

#### Parameters

##### input

[`MessageCorrelationRequest`](../type-aliases/MessageCorrelationRequest.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
createAdminUser(input, options?): CancelablePromise<UserCreateResult>;
```

Defined in: [gen/CamundaClient.ts:2906](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L2906)

Create admin user

Creates a new user and assigns the admin role to it. This endpoint is only usable when users are managed in the Orchestration Cluster and while no user is assigned to the admin role.
 *

#### Parameters

##### input

[`UserRequest`](../type-aliases/UserRequest.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`UserCreateResult`](../type-aliases/UserCreateResult.md)\>

#### Operation Id

createAdminUser

#### Tags

Setup

***

### createAuthorization()

```ts
createAuthorization(input, options?): CancelablePromise<AuthorizationCreateResult>;
```

Defined in: [gen/CamundaClient.ts:2964](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L2964)

Create authorization

Create the authorization.
 *

#### Parameters

##### input

[`AuthorizationIdBasedRequest`](../type-aliases/AuthorizationIdBasedRequest.md) | [`AuthorizationPropertyBasedRequest`](../type-aliases/AuthorizationPropertyBasedRequest.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`AuthorizationCreateResult`](../type-aliases/AuthorizationCreateResult.md)\>

#### Operation Id

createAuthorization

#### Tags

Authorization

***

### createDeployment()

```ts
createDeployment(input, options?): CancelablePromise<ExtendedDeploymentResult>;
```

Defined in: [gen/CamundaClient.ts:3027](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L3027)

Deploy resources

Deploys one or more resources (e.g. processes, decision models, or forms).
This is an atomic call, i.e. either all resources are deployed or none of them are.

 *

#### Parameters

##### input

[`createDeploymentInput`](../type-aliases/createDeploymentInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
createDocument(input, options?): CancelablePromise<DocumentReference>;
```

Defined in: [gen/CamundaClient.ts:3107](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L3107)

Upload document

Upload a document to the Camunda 8 cluster.

Note that this is currently supported for document stores of type: AWS, GCP, in-memory (non-production), local (non-production)

 *

#### Parameters

##### input

[`createDocumentInput`](../type-aliases/createDocumentInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`DocumentReference`](../type-aliases/DocumentReference.md)\>

#### Operation Id

createDocument

#### Tags

Document

***

### createDocumentLink()

```ts
createDocumentLink(input, options?): CancelablePromise<DocumentLink>;
```

Defined in: [gen/CamundaClient.ts:3170](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L3170)

Create document link

Create a link to a document in the Camunda 8 cluster.

Note that this is currently supported for document stores of type: AWS, GCP

 *

#### Parameters

##### input

[`createDocumentLinkInput`](../type-aliases/createDocumentLinkInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`DocumentLink`](../type-aliases/DocumentLink.md)\>

#### Operation Id

createDocumentLink

#### Tags

Document

***

### createDocuments()

```ts
createDocuments(input, options?): CancelablePromise<DocumentCreationBatchResponse>;
```

Defined in: [gen/CamundaClient.ts:3247](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L3247)

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

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`DocumentCreationBatchResponse`](../type-aliases/DocumentCreationBatchResponse.md)\>

#### Operation Id

createDocuments

#### Tags

Document

***

### createElementInstanceVariables()

```ts
createElementInstanceVariables(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:3309](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L3309)

Update element instance variables

Updates all the variables of a particular scope (for example, process instance, element instance) with the given variable data.
Specify the element instance in the `elementInstanceKey` parameter.

 *

#### Parameters

##### input

[`createElementInstanceVariablesInput`](../type-aliases/createElementInstanceVariablesInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

createElementInstanceVariables

#### Tags

Element instance

***

### createGlobalClusterVariable()

```ts
createGlobalClusterVariable(input, options?): CancelablePromise<ClusterVariableResult>;
```

Defined in: [gen/CamundaClient.ts:3369](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L3369)

Create a global-scoped cluster variable

Create a global-scoped cluster variable.
 *

#### Parameters

##### input

[`CreateClusterVariableRequest`](../type-aliases/CreateClusterVariableRequest.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ClusterVariableResult`](../type-aliases/ClusterVariableResult.md)\>

#### Operation Id

createGlobalClusterVariable

#### Tags

Cluster Variable

***

### createGlobalTaskListener()

```ts
createGlobalTaskListener(input, options?): CancelablePromise<GlobalTaskListenerResult>;
```

Defined in: [gen/CamundaClient.ts:3427](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L3427)

Create global user task listener

Create a new global user task listener.
 *

#### Parameters

##### input

[`CreateGlobalTaskListenerRequest`](../type-aliases/CreateGlobalTaskListenerRequest.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`GlobalTaskListenerResult`](../type-aliases/GlobalTaskListenerResult.md)\>

#### Operation Id

createGlobalTaskListener

#### Tags

Global listener

***

### createGroup()

```ts
createGroup(input, options?): CancelablePromise<GroupCreateResult>;
```

Defined in: [gen/CamundaClient.ts:3485](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L3485)

Create group

Create a new group.
 *

#### Parameters

##### input

[`GroupCreateRequest`](../type-aliases/GroupCreateRequest.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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

Defined in: [gen/CamundaClient.ts:12906](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L12906)

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
createMappingRule(input, options?): CancelablePromise<MappingRuleCreateUpdateResult>;
```

Defined in: [gen/CamundaClient.ts:3544](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L3544)

Create mapping rule

Create a new mapping rule

 *

#### Parameters

##### input

[`MappingRuleCreateRequest`](../type-aliases/MappingRuleCreateRequest.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`MappingRuleCreateUpdateResult`](../type-aliases/MappingRuleCreateUpdateResult.md)\>

#### Operation Id

createMappingRule

#### Tags

Mapping rule

***

### createProcessInstance()

```ts
createProcessInstance(input, options?): CancelablePromise<CreateProcessInstanceResult>;
```

Defined in: [gen/CamundaClient.ts:3612](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L3612)

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

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
createRole(input, options?): CancelablePromise<RoleCreateResult>;
```

Defined in: [gen/CamundaClient.ts:3674](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L3674)

Create role

Create a new role.
 *

#### Parameters

##### input

[`RoleCreateRequest`](../type-aliases/RoleCreateRequest.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`RoleCreateResult`](../type-aliases/RoleCreateResult.md)\>

#### Operation Id

createRole

#### Tags

Role

***

### createTenant()

```ts
createTenant(input, options?): CancelablePromise<TenantCreateResult>;
```

Defined in: [gen/CamundaClient.ts:3732](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L3732)

Create tenant

Creates a new tenant.
 *

#### Parameters

##### input

[`TenantCreateRequest`](../type-aliases/TenantCreateRequest.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`TenantCreateResult`](../type-aliases/TenantCreateResult.md)\>

#### Operation Id

createTenant

#### Tags

Tenant

***

### createTenantClusterVariable()

```ts
createTenantClusterVariable(input, options?): CancelablePromise<ClusterVariableResult>;
```

Defined in: [gen/CamundaClient.ts:3790](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L3790)

Create a tenant-scoped cluster variable

Create a new cluster variable for the given tenant.
 *

#### Parameters

##### input

[`createTenantClusterVariableInput`](../type-aliases/createTenantClusterVariableInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ClusterVariableResult`](../type-aliases/ClusterVariableResult.md)\>

#### Operation Id

createTenantClusterVariable

#### Tags

Cluster Variable

***

### createUser()

```ts
createUser(input, options?): CancelablePromise<UserCreateResult>;
```

Defined in: [gen/CamundaClient.ts:3850](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L3850)

Create user

Create a new user.
 *

#### Parameters

##### input

[`UserRequest`](../type-aliases/UserRequest.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`UserCreateResult`](../type-aliases/UserCreateResult.md)\>

#### Operation Id

createUser

#### Tags

User

***

### deleteAuthorization()

```ts
deleteAuthorization(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:3908](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L3908)

Delete authorization

Deletes the authorization with the given key.
 *

#### Parameters

##### input

[`deleteAuthorizationInput`](../type-aliases/deleteAuthorizationInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteAuthorization

#### Tags

Authorization

***

### deleteDecisionInstance()

```ts
deleteDecisionInstance(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:3966](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L3966)

Delete decision instance

Delete all associated decision evaluations based on provided key.
 *

#### Parameters

##### input

`object` & `object`

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteDecisionInstance

#### Tags

Decision instance

***

### deleteDecisionInstancesBatchOperation()

```ts
deleteDecisionInstancesBatchOperation(input, options?): CancelablePromise<BatchOperationCreatedResult>;
```

Defined in: [gen/CamundaClient.ts:4028](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L4028)

Delete decision instances (batch)

Delete multiple decision instances. This will delete the historic data from secondary storage.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

 *

#### Parameters

##### input

[`DecisionInstanceDeletionBatchOperationRequest`](../type-aliases/DecisionInstanceDeletionBatchOperationRequest.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`BatchOperationCreatedResult`](../type-aliases/BatchOperationCreatedResult.md)\>

#### Operation Id

deleteDecisionInstancesBatchOperation

#### Tags

Decision instance

***

### deleteDocument()

```ts
deleteDocument(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4089](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L4089)

Delete document

Delete a document from the Camunda 8 cluster.

Note that this is currently supported for document stores of type: AWS, GCP, in-memory (non-production), local (non-production)

 *

#### Parameters

##### input

[`deleteDocumentInput`](../type-aliases/deleteDocumentInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteDocument

#### Tags

Document

***

### deleteGlobalClusterVariable()

```ts
deleteGlobalClusterVariable(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4149](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L4149)

Delete a global-scoped cluster variable

Delete a global-scoped cluster variable.
 *

#### Parameters

##### input

[`deleteGlobalClusterVariableInput`](../type-aliases/deleteGlobalClusterVariableInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteGlobalClusterVariable

#### Tags

Cluster Variable

***

### deleteGlobalTaskListener()

```ts
deleteGlobalTaskListener(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4207](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L4207)

Delete global user task listener

Deletes a global user task listener.
 *

#### Parameters

##### input

[`deleteGlobalTaskListenerInput`](../type-aliases/deleteGlobalTaskListenerInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteGlobalTaskListener

#### Tags

Global listener

***

### deleteGroup()

```ts
deleteGroup(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4265](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L4265)

Delete group

Deletes the group with the given ID.
 *

#### Parameters

##### input

[`deleteGroupInput`](../type-aliases/deleteGroupInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteGroup

#### Tags

Group

***

### deleteMappingRule()

```ts
deleteMappingRule(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4324](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L4324)

Delete a mapping rule

Deletes the mapping rule with the given ID.

 *

#### Parameters

##### input

[`deleteMappingRuleInput`](../type-aliases/deleteMappingRuleInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteMappingRule

#### Tags

Mapping rule

***

### deleteProcessInstance()

```ts
deleteProcessInstance(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4382](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L4382)

Delete process instance

Deletes a process instance. Only instances that are completed or terminated can be deleted.
 *

#### Parameters

##### input

`object` & `object`

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteProcessInstance

#### Tags

Process instance

***

### deleteProcessInstancesBatchOperation()

```ts
deleteProcessInstancesBatchOperation(input, options?): CancelablePromise<BatchOperationCreatedResult>;
```

Defined in: [gen/CamundaClient.ts:4445](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L4445)

Delete process instances (batch)

Delete multiple process instances. This will delete the historic data from secondary storage.
Only process instances in a final state (COMPLETED or TERMINATED) can be deleted.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

 *

#### Parameters

##### input

[`ProcessInstanceDeletionBatchOperationRequest`](../type-aliases/ProcessInstanceDeletionBatchOperationRequest.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`BatchOperationCreatedResult`](../type-aliases/BatchOperationCreatedResult.md)\>

#### Operation Id

deleteProcessInstancesBatchOperation

#### Tags

Process instance

***

### deleteResource()

```ts
deleteResource(input, options?): CancelablePromise<DeleteResourceResponse>;
```

Defined in: [gen/CamundaClient.ts:4517](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L4517)

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

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
deleteRole(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4577](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L4577)

Delete role

Deletes the role with the given ID.
 *

#### Parameters

##### input

[`deleteRoleInput`](../type-aliases/deleteRoleInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteRole

#### Tags

Role

***

### deleteTenant()

```ts
deleteTenant(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4635](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L4635)

Delete tenant

Deletes an existing tenant.
 *

#### Parameters

##### input

[`deleteTenantInput`](../type-aliases/deleteTenantInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteTenant

#### Tags

Tenant

***

### deleteTenantClusterVariable()

```ts
deleteTenantClusterVariable(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4693](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L4693)

Delete a tenant-scoped cluster variable

Delete a tenant-scoped cluster variable.
 *

#### Parameters

##### input

[`deleteTenantClusterVariableInput`](../type-aliases/deleteTenantClusterVariableInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

deleteTenantClusterVariable

#### Tags

Cluster Variable

***

### deleteUser()

```ts
deleteUser(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:4751](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L4751)

Delete user

Deletes a user.
 *

#### Parameters

##### input

[`deleteUserInput`](../type-aliases/deleteUserInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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

Defined in: [gen/CamundaClient.ts:12922](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L12922)

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

Defined in: [gen/CamundaClient.ts:1456](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1456)

Emit the standard support log preamble & redacted configuration to the current support logger.
Safe to call multiple times; subsequent calls are ignored (idempotent).
Useful when a custom supportLogger was injected and you still want the canonical header & config dump.

#### Returns

`void`

***

### evaluateConditionals()

```ts
evaluateConditionals(input, options?): CancelablePromise<EvaluateConditionalResult>;
```

Defined in: [gen/CamundaClient.ts:4812](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L4812)

Evaluate root level conditional start events

Evaluates root-level conditional start events for process definitions.
If the evaluation is successful, it will return the keys of all created process instances, along with their associated process definition key.
Multiple root-level conditional start events of the same process definition can trigger if their conditions evaluate to true.

 *

#### Parameters

##### input

[`ConditionalEvaluationInstruction`](../type-aliases/ConditionalEvaluationInstruction.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`EvaluateConditionalResult`](../type-aliases/EvaluateConditionalResult.md)\>

#### Operation Id

evaluateConditionals

#### Tags

Conditional

***

### evaluateDecision()

```ts
evaluateDecision(input, options?): CancelablePromise<EvaluateDecisionResult>;
```

Defined in: [gen/CamundaClient.ts:4882](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L4882)

Evaluate decision

Evaluates a decision.
You specify the decision to evaluate either by using its unique key (as returned by
DeployResource), or using the decision ID. When using the decision ID, the latest deployed
version of the decision is used.

 *

#### Parameters

##### input

[`DecisionEvaluationById`](../type-aliases/DecisionEvaluationById.md) | [`DecisionEvaluationByKey`](../type-aliases/DecisionEvaluationByKey.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
evaluateExpression(input, options?): CancelablePromise<ExpressionEvaluationResult>;
```

Defined in: [gen/CamundaClient.ts:4944](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L4944)

Evaluate an expression

Evaluates a FEEL expression and returns the result. Supports references to tenant scoped cluster variables when a tenant ID is provided.
 *

#### Parameters

##### input

[`ExpressionEvaluationRequest`](../type-aliases/ExpressionEvaluationRequest.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ExpressionEvaluationResult`](../type-aliases/ExpressionEvaluationResult.md)\>

#### Operation Id

evaluateExpression

#### Tags

Expression

***

### failJob()

```ts
failJob(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:5009](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L5009)

Fail job

Mark the job as failed.

 *

#### Parameters

##### input

[`failJobInput`](../type-aliases/failJobInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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

Defined in: [gen/CamundaClient.ts:1423](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1423)

#### Returns

`Promise`\<`string` \| `undefined`\>

***

### getAuditLog()

```ts
getAuditLog(
   input, 
   consistencyManagement, 
options?): CancelablePromise<AuditLogResult>;
```

Defined in: [gen/CamundaClient.ts:5070](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L5070)

Get audit log

Get an audit log entry by auditLogKey.
 *

#### Parameters

##### input

[`getAuditLogInput`](../type-aliases/getAuditLogInput.md)

##### consistencyManagement

[`getAuditLogConsistency`](../type-aliases/getAuditLogConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getAuthentication(options?): CancelablePromise<CamundaUserResult>;
```

Defined in: [gen/CamundaClient.ts:5132](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L5132)

Get current user

Retrieves the current authenticated user.
 *

#### Parameters

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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

Defined in: [gen/CamundaClient.ts:1420](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1420)

#### Returns

`Promise`\<`Record`\<`string`, `string`\>\>

***

### getAuthorization()

```ts
getAuthorization(
   input, 
   consistencyManagement, 
options?): CancelablePromise<AuthorizationResult>;
```

Defined in: [gen/CamundaClient.ts:5182](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L5182)

Get authorization

Get authorization by the given key.
 *

#### Parameters

##### input

[`getAuthorizationInput`](../type-aliases/getAuthorizationInput.md)

##### consistencyManagement

[`getAuthorizationConsistency`](../type-aliases/getAuthorizationConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
  backoffMs: number;
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

Defined in: [gen/CamundaClient.ts:1532](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1532)

Public accessor for current backpressure adaptive limiter state (stable)

#### Returns

  \| \{
  `backoffMs`: `number`;
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
getBatchOperation(
   input, 
   consistencyManagement, 
options?): CancelablePromise<BatchOperationResponse>;
```

Defined in: [gen/CamundaClient.ts:5245](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L5245)

Get batch operation

Get batch operation by key.
 *

#### Parameters

##### input

[`getBatchOperationInput`](../type-aliases/getBatchOperationInput.md)

##### consistencyManagement

[`getBatchOperationConsistency`](../type-aliases/getBatchOperationConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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

Defined in: [gen/CamundaClient.ts:1325](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1325)

Read-only snapshot of current hydrated configuration (do not mutate directly).
Use configure(...) to apply changes.

#### Returns

`Readonly`\<[`CamundaConfig`](../interfaces/CamundaConfig.md)\>

***

### getDecisionDefinition()

```ts
getDecisionDefinition(
   input, 
   consistencyManagement, 
options?): CancelablePromise<DecisionDefinitionResult>;
```

Defined in: [gen/CamundaClient.ts:5310](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L5310)

Get decision definition

Returns a decision definition by key.
 *

#### Parameters

##### input

[`getDecisionDefinitionInput`](../type-aliases/getDecisionDefinitionInput.md)

##### consistencyManagement

[`getDecisionDefinitionConsistency`](../type-aliases/getDecisionDefinitionConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getDecisionDefinitionXml(
   input, 
   consistencyManagement, 
options?): CancelablePromise<string>;
```

Defined in: [gen/CamundaClient.ts:5373](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L5373)

Get decision definition XML

Returns decision definition as XML.
 *

#### Parameters

##### input

[`getDecisionDefinitionXmlInput`](../type-aliases/getDecisionDefinitionXmlInput.md)

##### consistencyManagement

[`getDecisionDefinitionXmlConsistency`](../type-aliases/getDecisionDefinitionXmlConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getDecisionInstance(
   input, 
   consistencyManagement, 
options?): CancelablePromise<DecisionInstanceGetQueryResult>;
```

Defined in: [gen/CamundaClient.ts:5436](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L5436)

Get decision instance

Returns a decision instance.
 *

#### Parameters

##### input

[`getDecisionInstanceInput`](../type-aliases/getDecisionInstanceInput.md)

##### consistencyManagement

[`getDecisionInstanceConsistency`](../type-aliases/getDecisionInstanceConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getDecisionRequirements(
   input, 
   consistencyManagement, 
options?): CancelablePromise<DecisionRequirementsResult>;
```

Defined in: [gen/CamundaClient.ts:5499](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L5499)

Get decision requirements

Returns Decision Requirements as JSON.
 *

#### Parameters

##### input

[`getDecisionRequirementsInput`](../type-aliases/getDecisionRequirementsInput.md)

##### consistencyManagement

[`getDecisionRequirementsConsistency`](../type-aliases/getDecisionRequirementsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getDecisionRequirementsXml(
   input, 
   consistencyManagement, 
options?): CancelablePromise<string>;
```

Defined in: [gen/CamundaClient.ts:5562](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L5562)

Get decision requirements XML

Returns decision requirements as XML.
 *

#### Parameters

##### input

[`getDecisionRequirementsXmlInput`](../type-aliases/getDecisionRequirementsXmlInput.md)

##### consistencyManagement

[`getDecisionRequirementsXmlConsistency`](../type-aliases/getDecisionRequirementsXmlConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getDocument(input, options?): CancelablePromise<Blob>;
```

Defined in: [gen/CamundaClient.ts:5627](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L5627)

Download document

Download a document from the Camunda 8 cluster.

Note that this is currently supported for document stores of type: AWS, GCP, in-memory (non-production), local (non-production)

 *

#### Parameters

##### input

[`getDocumentInput`](../type-aliases/getDocumentInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`Blob`\>

#### Operation Id

getDocument

#### Tags

Document

***

### getElementInstance()

```ts
getElementInstance(
   input, 
   consistencyManagement, 
options?): CancelablePromise<ElementInstanceResult>;
```

Defined in: [gen/CamundaClient.ts:5688](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L5688)

Get element instance

Returns element instance as JSON.
 *

#### Parameters

##### input

[`getElementInstanceInput`](../type-aliases/getElementInstanceInput.md)

##### consistencyManagement

[`getElementInstanceConsistency`](../type-aliases/getElementInstanceConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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

Defined in: [gen/CamundaClient.ts:1442](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1442)

Internal accessor (read-only) for eventual consistency error mode.

#### Returns

`"result"` \| `"throw"`

***

### getGlobalClusterVariable()

```ts
getGlobalClusterVariable(
   input, 
   consistencyManagement, 
options?): CancelablePromise<ClusterVariableResult>;
```

Defined in: [gen/CamundaClient.ts:5751](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L5751)

Get a global-scoped cluster variable

Get a global-scoped cluster variable.
 *

#### Parameters

##### input

[`getGlobalClusterVariableInput`](../type-aliases/getGlobalClusterVariableInput.md)

##### consistencyManagement

[`getGlobalClusterVariableConsistency`](../type-aliases/getGlobalClusterVariableConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getGlobalJobStatistics(
   input, 
   consistencyManagement, 
options?): CancelablePromise<GlobalJobStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:5815](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L5815)

Global job statistics

Returns global aggregated counts for jobs. Optionally filter by the creation time window and/or jobType.

 *

#### Parameters

##### input

[`getGlobalJobStatisticsInput`](../type-aliases/getGlobalJobStatisticsInput.md)

##### consistencyManagement

[`getGlobalJobStatisticsConsistency`](../type-aliases/getGlobalJobStatisticsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getGlobalTaskListener(
   input, 
   consistencyManagement, 
options?): CancelablePromise<GlobalTaskListenerResult>;
```

Defined in: [gen/CamundaClient.ts:5878](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L5878)

Get global user task listener

Get a global user task listener by its id.
 *

#### Parameters

##### input

[`getGlobalTaskListenerInput`](../type-aliases/getGlobalTaskListenerInput.md)

##### consistencyManagement

[`getGlobalTaskListenerConsistency`](../type-aliases/getGlobalTaskListenerConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getGroup(
   input, 
   consistencyManagement, 
options?): CancelablePromise<GroupResult>;
```

Defined in: [gen/CamundaClient.ts:5941](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L5941)

Get group

Get a group by its ID.
 *

#### Parameters

##### input

[`getGroupInput`](../type-aliases/getGroupInput.md)

##### consistencyManagement

[`getGroupConsistency`](../type-aliases/getGroupConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getIncident(
   input, 
   consistencyManagement, 
options?): CancelablePromise<IncidentResult>;
```

Defined in: [gen/CamundaClient.ts:6007](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L6007)

Get incident

Returns incident as JSON.

 *

#### Parameters

##### input

[`getIncidentInput`](../type-aliases/getIncidentInput.md)

##### consistencyManagement

[`getIncidentConsistency`](../type-aliases/getIncidentConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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

### getJobErrorStatistics()

```ts
getJobErrorStatistics(
   input, 
   consistencyManagement, 
options?): CancelablePromise<JobErrorStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6071](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L6071)

Get error metrics for a job type

Returns aggregated metrics per error for the given jobType.

 *

#### Parameters

##### input

[`JobErrorStatisticsQuery`](../type-aliases/JobErrorStatisticsQuery.md)

##### consistencyManagement

[`getJobErrorStatisticsConsistency`](../type-aliases/getJobErrorStatisticsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`JobErrorStatisticsQueryResult`](../type-aliases/JobErrorStatisticsQueryResult.md)\>

#### Operation Id

getJobErrorStatistics

#### Tags

Job

#### Consistency

eventual - this endpoint is backed by data that is eventually consistent with the system state.

***

### getJobTimeSeriesStatistics()

```ts
getJobTimeSeriesStatistics(
   input, 
   consistencyManagement, 
options?): CancelablePromise<JobTimeSeriesStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6137](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L6137)

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

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getJobTypeStatistics(
   input, 
   consistencyManagement, 
options?): CancelablePromise<JobTypeStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6201](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L6201)

Get job statistics by type

Get statistics about jobs, grouped by job type.

 *

#### Parameters

##### input

[`JobTypeStatisticsQuery`](../type-aliases/JobTypeStatisticsQuery.md)

##### consistencyManagement

[`getJobTypeStatisticsConsistency`](../type-aliases/getJobTypeStatisticsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getJobWorkerStatistics(
   input, 
   consistencyManagement, 
options?): CancelablePromise<JobWorkerStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6265](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L6265)

Get job statistics by worker

Returns aggregated metrics per worker for the given jobType.

 *

#### Parameters

##### input

[`JobWorkerStatisticsQuery`](../type-aliases/JobWorkerStatisticsQuery.md)

##### consistencyManagement

[`getJobWorkerStatisticsConsistency`](../type-aliases/getJobWorkerStatisticsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getLicense(options?): CancelablePromise<LicenseResponse>;
```

Defined in: [gen/CamundaClient.ts:6327](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L6327)

Get license status

Obtains the status of the current Camunda license.
 *

#### Parameters

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`LicenseResponse`](../type-aliases/LicenseResponse.md)\>

#### Operation Id

getLicense

#### Tags

License

***

### getMappingRule()

```ts
getMappingRule(
   input, 
   consistencyManagement, 
options?): CancelablePromise<MappingRuleResult>;
```

Defined in: [gen/CamundaClient.ts:6378](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L6378)

Get a mapping rule

Gets the mapping rule with the given ID.

 *

#### Parameters

##### input

[`getMappingRuleInput`](../type-aliases/getMappingRuleInput.md)

##### consistencyManagement

[`getMappingRuleConsistency`](../type-aliases/getMappingRuleConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getProcessDefinition(
   input, 
   consistencyManagement, 
options?): CancelablePromise<ProcessDefinitionResult>;
```

Defined in: [gen/CamundaClient.ts:6441](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L6441)

Get process definition

Returns process definition as JSON.
 *

#### Parameters

##### input

[`getProcessDefinitionInput`](../type-aliases/getProcessDefinitionInput.md)

##### consistencyManagement

[`getProcessDefinitionConsistency`](../type-aliases/getProcessDefinitionConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getProcessDefinitionInstanceStatistics(
   input, 
   consistencyManagement, 
options?): CancelablePromise<ProcessDefinitionInstanceStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6505](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L6505)

Get process instance statistics

Get statistics about process instances, grouped by process definition and tenant.

 *

#### Parameters

##### input

[`ProcessDefinitionInstanceStatisticsQuery`](../type-aliases/ProcessDefinitionInstanceStatisticsQuery.md)

##### consistencyManagement

[`getProcessDefinitionInstanceStatisticsConsistency`](../type-aliases/getProcessDefinitionInstanceStatisticsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getProcessDefinitionInstanceVersionStatistics(
   input, 
   consistencyManagement, 
options?): CancelablePromise<ProcessDefinitionInstanceVersionStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6570](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L6570)

Get process instance statistics by version

Get statistics about process instances, grouped by version for a given process definition.
The process definition ID must be provided as a required field in the request body filter.

 *

#### Parameters

##### input

[`ProcessDefinitionInstanceVersionStatisticsQuery`](../type-aliases/ProcessDefinitionInstanceVersionStatisticsQuery.md)

##### consistencyManagement

[`getProcessDefinitionInstanceVersionStatisticsConsistency`](../type-aliases/getProcessDefinitionInstanceVersionStatisticsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getProcessDefinitionMessageSubscriptionStatistics(
   input, 
   consistencyManagement, 
options?): CancelablePromise<ProcessDefinitionMessageSubscriptionStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6634](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L6634)

Get message subscription statistics

Get message subscription statistics, grouped by process definition.

 *

#### Parameters

##### input

[`ProcessDefinitionMessageSubscriptionStatisticsQuery`](../type-aliases/ProcessDefinitionMessageSubscriptionStatisticsQuery.md)

##### consistencyManagement

[`getProcessDefinitionMessageSubscriptionStatisticsConsistency`](../type-aliases/getProcessDefinitionMessageSubscriptionStatisticsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getProcessDefinitionStatistics(
   input, 
   consistencyManagement, 
options?): CancelablePromise<ProcessDefinitionElementStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6697](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L6697)

Get process definition statistics

Get statistics about elements in currently running process instances by process definition key and search filter.
 *

#### Parameters

##### input

[`getProcessDefinitionStatisticsInput`](../type-aliases/getProcessDefinitionStatisticsInput.md)

##### consistencyManagement

[`getProcessDefinitionStatisticsConsistency`](../type-aliases/getProcessDefinitionStatisticsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getProcessDefinitionXml(
   input, 
   consistencyManagement, 
options?): CancelablePromise<string>;
```

Defined in: [gen/CamundaClient.ts:6762](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L6762)

Get process definition XML

Returns process definition as XML.
 *

#### Parameters

##### input

[`getProcessDefinitionXmlInput`](../type-aliases/getProcessDefinitionXmlInput.md)

##### consistencyManagement

[`getProcessDefinitionXmlConsistency`](../type-aliases/getProcessDefinitionXmlConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getProcessInstance(
   input, 
   consistencyManagement, 
options?): CancelablePromise<ProcessInstanceResult>;
```

Defined in: [gen/CamundaClient.ts:6827](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L6827)

Get process instance

Get the process instance by the process instance key.
 *

#### Parameters

##### input

[`getProcessInstanceInput`](../type-aliases/getProcessInstanceInput.md)

##### consistencyManagement

[`getProcessInstanceConsistency`](../type-aliases/getProcessInstanceConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getProcessInstanceCallHierarchy(
   input, 
   consistencyManagement, 
options?): CancelablePromise<ProcessInstanceCallHierarchyEntry[]>;
```

Defined in: [gen/CamundaClient.ts:6890](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L6890)

Get call hierarchy

Returns the call hierarchy for a given process instance, showing its ancestry up to the root instance.
 *

#### Parameters

##### input

[`getProcessInstanceCallHierarchyInput`](../type-aliases/getProcessInstanceCallHierarchyInput.md)

##### consistencyManagement

[`getProcessInstanceCallHierarchyConsistency`](../type-aliases/getProcessInstanceCallHierarchyConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getProcessInstanceSequenceFlows(
   input, 
   consistencyManagement, 
options?): CancelablePromise<ProcessInstanceSequenceFlowsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:6953](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L6953)

Get sequence flows

Get sequence flows taken by the process instance.
 *

#### Parameters

##### input

[`getProcessInstanceSequenceFlowsInput`](../type-aliases/getProcessInstanceSequenceFlowsInput.md)

##### consistencyManagement

[`getProcessInstanceSequenceFlowsConsistency`](../type-aliases/getProcessInstanceSequenceFlowsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getProcessInstanceStatistics(
   input, 
   consistencyManagement, 
options?): CancelablePromise<ProcessInstanceElementStatisticsQueryResult>;
```

Defined in: [gen/CamundaClient.ts:7016](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L7016)

Get element instance statistics

Get statistics about elements by the process instance key.
 *

#### Parameters

##### input

[`getProcessInstanceStatisticsInput`](../type-aliases/getProcessInstanceStatisticsInput.md)

##### consistencyManagement

[`getProcessInstanceStatisticsConsistency`](../type-aliases/getProcessInstanceStatisticsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getProcessInstanceStatisticsByDefinition(
   input, 
   consistencyManagement, 
options?): CancelablePromise<IncidentProcessInstanceStatisticsByDefinitionQueryResult>;
```

Defined in: [gen/CamundaClient.ts:7082](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L7082)

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

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getProcessInstanceStatisticsByError(
   input, 
   consistencyManagement, 
options?): CancelablePromise<IncidentProcessInstanceStatisticsByErrorQueryResult>;
```

Defined in: [gen/CamundaClient.ts:7147](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L7147)

Get process instance statistics by error

Returns statistics for active process instances that currently have active incidents,
grouped by incident error hash code.

 *

#### Parameters

##### input

[`IncidentProcessInstanceStatisticsByErrorQuery`](../type-aliases/IncidentProcessInstanceStatisticsByErrorQuery.md)

##### consistencyManagement

[`getProcessInstanceStatisticsByErrorConsistency`](../type-aliases/getProcessInstanceStatisticsByErrorConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getResource(input, options?): CancelablePromise<ResourceResult>;
```

Defined in: [gen/CamundaClient.ts:7213](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L7213)

Get resource

Returns a deployed resource.
:::info
Currently, this endpoint only supports RPA resources.
:::

 *

#### Parameters

##### input

[`getResourceInput`](../type-aliases/getResourceInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ResourceResult`](../type-aliases/ResourceResult.md)\>

#### Operation Id

getResource

#### Tags

Resource

***

### getResourceContent()

```ts
getResourceContent(input, options?): CancelablePromise<string>;
```

Defined in: [gen/CamundaClient.ts:7275](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L7275)

Get resource content

Returns the content of a deployed resource.
:::info
Currently, this endpoint only supports RPA resources.
:::

 *

#### Parameters

##### input

[`getResourceContentInput`](../type-aliases/getResourceContentInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`string`\>

#### Operation Id

getResourceContent

#### Tags

Resource

***

### getRole()

```ts
getRole(
   input, 
   consistencyManagement, 
options?): CancelablePromise<RoleResult>;
```

Defined in: [gen/CamundaClient.ts:7334](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L7334)

Get role

Get a role by its ID.
 *

#### Parameters

##### input

[`getRoleInput`](../type-aliases/getRoleInput.md)

##### consistencyManagement

[`getRoleConsistency`](../type-aliases/getRoleConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getStartProcessForm(
   input, 
   consistencyManagement, 
options?): CancelablePromise<void | FormResult>;
```

Defined in: [gen/CamundaClient.ts:7399](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L7399)

Get process start form

Get the start form of a process.
Note that this endpoint will only return linked forms. This endpoint does not support embedded forms.

 *

#### Parameters

##### input

[`getStartProcessFormInput`](../type-aliases/getStartProcessFormInput.md)

##### consistencyManagement

[`getStartProcessFormConsistency`](../type-aliases/getStartProcessFormConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getStatus(options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:7461](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L7461)

Get cluster status

Checks the health status of the cluster by verifying if there's at least one partition with a healthy leader.
 *

#### Parameters

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

getStatus

#### Tags

Cluster

***

### getSystemConfiguration()

```ts
getSystemConfiguration(options?): CancelablePromise<SystemConfigurationResponse>;
```

Defined in: [gen/CamundaClient.ts:7515](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L7515)

System configuration (alpha)

Returns the current system configuration. The response is an envelope
that groups settings by feature area.

This endpoint is an alpha feature and may be subject to change
in future releases.

 *

#### Parameters

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`SystemConfigurationResponse`](../type-aliases/SystemConfigurationResponse.md)\>

#### Operation Id

getSystemConfiguration

#### Tags

System

***

### getTenant()

```ts
getTenant(
   input, 
   consistencyManagement, 
options?): CancelablePromise<TenantResult>;
```

Defined in: [gen/CamundaClient.ts:7565](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L7565)

Get tenant

Retrieves a single tenant by tenant ID.
 *

#### Parameters

##### input

[`getTenantInput`](../type-aliases/getTenantInput.md)

##### consistencyManagement

[`getTenantConsistency`](../type-aliases/getTenantConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getTenantClusterVariable(
   input, 
   consistencyManagement, 
options?): CancelablePromise<ClusterVariableResult>;
```

Defined in: [gen/CamundaClient.ts:7628](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L7628)

Get a tenant-scoped cluster variable

Get a tenant-scoped cluster variable.
 *

#### Parameters

##### input

[`getTenantClusterVariableInput`](../type-aliases/getTenantClusterVariableInput.md)

##### consistencyManagement

[`getTenantClusterVariableConsistency`](../type-aliases/getTenantClusterVariableConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getTopology(options?): CancelablePromise<TopologyResponse>;
```

Defined in: [gen/CamundaClient.ts:7692](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L7692)

Get cluster topology

Obtains the current topology of the cluster the gateway is part of.
 *

#### Parameters

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getUsageMetrics(
   input, 
   consistencyManagement, 
options?): CancelablePromise<UsageMetricsResponse>;
```

Defined in: [gen/CamundaClient.ts:7742](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L7742)

Get usage metrics

Retrieve the usage metrics based on given criteria.
 *

#### Parameters

##### input

[`getUsageMetricsInput`](../type-aliases/getUsageMetricsInput.md)

##### consistencyManagement

[`getUsageMetricsConsistency`](../type-aliases/getUsageMetricsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getUser(
   input, 
   consistencyManagement, 
   options?): CancelablePromise<{
  email: string | null;
  name: string | null;
  username: Username;
}>;
```

Defined in: [gen/CamundaClient.ts:7805](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L7805)

Get user

Get a user by its username.
 *

#### Parameters

##### input

[`getUserInput`](../type-aliases/getUserInput.md)

##### consistencyManagement

[`getUserConsistency`](../type-aliases/getUserConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `email`: `string` \| `null`;
  `name`: `string` \| `null`;
  `username`: [`Username`](../type-aliases/Username.md);
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
getUserTask(
   input, 
   consistencyManagement, 
options?): CancelablePromise<UserTaskResult>;
```

Defined in: [gen/CamundaClient.ts:7868](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L7868)

Get user task

Get the user task by the user task key.
 *

#### Parameters

##### input

[`getUserTaskInput`](../type-aliases/getUserTaskInput.md)

##### consistencyManagement

[`getUserTaskConsistency`](../type-aliases/getUserTaskConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getUserTaskForm(
   input, 
   consistencyManagement, 
options?): CancelablePromise<void | FormResult>;
```

Defined in: [gen/CamundaClient.ts:7933](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L7933)

Get user task form

Get the form of a user task.
Note that this endpoint will only return linked forms. This endpoint does not support embedded forms.

 *

#### Parameters

##### input

[`getUserTaskFormInput`](../type-aliases/getUserTaskFormInput.md)

##### consistencyManagement

[`getUserTaskFormConsistency`](../type-aliases/getUserTaskFormConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
getVariable(
   input, 
   consistencyManagement, 
options?): CancelablePromise<VariableResult>;
```

Defined in: [gen/CamundaClient.ts:8000](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L8000)

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

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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

Defined in: [gen/CamundaClient.ts:1547](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1547)

Return a read-only snapshot of currently registered job workers.

#### Returns

`any`[]

***

### logger()

```ts
logger(scope?): Logger;
```

Defined in: [gen/CamundaClient.ts:1437](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1437)

Access a scoped logger (internal & future user emission).

#### Parameters

##### scope?

`string`

#### Returns

[`Logger`](../../logger/interfaces/Logger.md)

***

### migrateProcessInstance()

```ts
migrateProcessInstance(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:8069](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L8069)

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

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

migrateProcessInstance

#### Tags

Process instance

***

### migrateProcessInstancesBatchOperation()

```ts
migrateProcessInstancesBatchOperation(input, options?): CancelablePromise<BatchOperationCreatedResult>;
```

Defined in: [gen/CamundaClient.ts:8133](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L8133)

Migrate process instances (batch)

Migrate multiple process instances.
Since only process instances with ACTIVE state can be migrated, any given
filters for state are ignored and overridden during this batch operation.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

 *

#### Parameters

##### input

[`ProcessInstanceMigrationBatchOperationRequest`](../type-aliases/ProcessInstanceMigrationBatchOperationRequest.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`BatchOperationCreatedResult`](../type-aliases/BatchOperationCreatedResult.md)\>

#### Operation Id

migrateProcessInstancesBatchOperation

#### Tags

Process instance

***

### modifyProcessInstance()

```ts
modifyProcessInstance(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:8197](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L8197)

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

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

modifyProcessInstance

#### Tags

Process instance

***

### modifyProcessInstancesBatchOperation()

```ts
modifyProcessInstancesBatchOperation(input, options?): CancelablePromise<BatchOperationCreatedResult>;
```

Defined in: [gen/CamundaClient.ts:8263](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L8263)

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

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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

Defined in: [gen/CamundaClient.ts:1429](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1429)

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
pinClock(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:8327](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L8327)

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

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

pinClock

#### Tags

Clock

***

### publishMessage()

```ts
publishMessage(input, options?): CancelablePromise<MessagePublicationResult>;
```

Defined in: [gen/CamundaClient.ts:8392](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L8392)

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

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
resetClock(options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:8460](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L8460)

Reset internal clock (alpha)

Resets the Zeebe engine's internal clock to the current system time, enabling it to tick in real-time.
This operation is useful for returning the clock to
normal behavior after it has been pinned to a specific time.

This endpoint is an alpha feature and may be subject to change
in future releases.

 *

#### Parameters

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

resetClock

#### Tags

Clock

***

### resolveIncident()

```ts
resolveIncident(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:8513](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L8513)

Resolve incident

Marks the incident as resolved; most likely a call to Update job will be necessary
to reset the job's retries, followed by this call.

 *

#### Parameters

##### input

[`resolveIncidentInput`](../type-aliases/resolveIncidentInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
resolveIncidentsBatchOperation(input, options?): CancelablePromise<BatchOperationCreatedResult>;
```

Defined in: [gen/CamundaClient.ts:8577](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L8577)

Resolve related incidents (batch)

Resolves multiple instances of process instances.
Since only process instances with ACTIVE state can have unresolved incidents, any given
filters for state are ignored and overridden during this batch operation.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

 *

#### Parameters

##### input

[`ProcessInstanceIncidentResolutionBatchOperationRequest`](../type-aliases/ProcessInstanceIncidentResolutionBatchOperationRequest.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`BatchOperationCreatedResult`](../type-aliases/BatchOperationCreatedResult.md)\>

#### Operation Id

resolveIncidentsBatchOperation

#### Tags

Process instance

***

### resolveProcessInstanceIncidents()

```ts
resolveProcessInstanceIncidents(input, options?): CancelablePromise<BatchOperationCreatedResult>;
```

Defined in: [gen/CamundaClient.ts:8635](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L8635)

Resolve related incidents

Creates a batch operation to resolve multiple incidents of a process instance.
 *

#### Parameters

##### input

[`resolveProcessInstanceIncidentsInput`](../type-aliases/resolveProcessInstanceIncidentsInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`BatchOperationCreatedResult`](../type-aliases/BatchOperationCreatedResult.md)\>

#### Operation Id

resolveProcessInstanceIncidents

#### Tags

Process instance

***

### resumeBatchOperation()

```ts
resumeBatchOperation(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:8695](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L8695)

Resume Batch operation

Resumes a suspended batch operation.
This is done asynchronously, the progress can be tracked using the batch operation status endpoint (/batch-operations/{batchOperationKey}).

 *

#### Parameters

##### input

###### batchOperationKey

[`BatchOperationKey`](../type-aliases/BatchOperationKey.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

resumeBatchOperation

#### Tags

Batch operation

***

### searchAuditLogs()

```ts
searchAuditLogs(
   input, 
   consistencyManagement, 
options?): CancelablePromise<AuditLogSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:8756](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L8756)

Search audit logs

Search for audit logs based on given criteria.
 *

#### Parameters

##### input

[`AuditLogSearchQueryRequest`](../type-aliases/AuditLogSearchQueryRequest.md)

##### consistencyManagement

[`searchAuditLogsConsistency`](../type-aliases/searchAuditLogsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchAuthorizations(
   input, 
   consistencyManagement, 
options?): CancelablePromise<AuthorizationSearchResult>;
```

Defined in: [gen/CamundaClient.ts:8819](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L8819)

Search authorizations

Search for authorizations based on given criteria.
 *

#### Parameters

##### input

[`AuthorizationSearchQuery`](../type-aliases/AuthorizationSearchQuery.md)

##### consistencyManagement

[`searchAuthorizationsConsistency`](../type-aliases/searchAuthorizationsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchBatchOperationItems(
   input, 
   consistencyManagement, 
options?): CancelablePromise<BatchOperationItemSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:8882](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L8882)

Search batch operation items

Search for batch operation items based on given criteria.
 *

#### Parameters

##### input

[`BatchOperationItemSearchQuery`](../type-aliases/BatchOperationItemSearchQuery.md)

##### consistencyManagement

[`searchBatchOperationItemsConsistency`](../type-aliases/searchBatchOperationItemsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchBatchOperations(
   input, 
   consistencyManagement, 
options?): CancelablePromise<BatchOperationSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:8945](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L8945)

Search batch operations

Search for batch operations based on given criteria.
 *

#### Parameters

##### input

[`BatchOperationSearchQuery`](../type-aliases/BatchOperationSearchQuery.md)

##### consistencyManagement

[`searchBatchOperationsConsistency`](../type-aliases/searchBatchOperationsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchClientsForGroup(
   input, 
   consistencyManagement, 
options?): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:9008](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L9008)

Search group clients

Search clients assigned to a group.
 *

#### Parameters

##### input

[`searchClientsForGroupInput`](../type-aliases/searchClientsForGroupInput.md)

##### consistencyManagement

[`searchClientsForGroupConsistency`](../type-aliases/searchClientsForGroupConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchClientsForRole(
   input, 
   consistencyManagement, 
options?): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:9073](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L9073)

Search role clients

Search clients with assigned role.
 *

#### Parameters

##### input

[`searchClientsForRoleInput`](../type-aliases/searchClientsForRoleInput.md)

##### consistencyManagement

[`searchClientsForRoleConsistency`](../type-aliases/searchClientsForRoleConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchClientsForTenant(
   input, 
   consistencyManagement, 
options?): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:9138](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L9138)

Search clients for tenant

Retrieves a filtered and sorted list of clients for a specified tenant.
 *

#### Parameters

##### input

[`searchClientsForTenantInput`](../type-aliases/searchClientsForTenantInput.md)

##### consistencyManagement

[`searchClientsForTenantConsistency`](../type-aliases/searchClientsForTenantConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchClusterVariables(
   input, 
   consistencyManagement, 
options?): CancelablePromise<ClusterVariableSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9201](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L9201)

Search for cluster variables based on given criteria. By default, long variable values in the response are truncated.
 *

#### Parameters

##### input

[`searchClusterVariablesInput`](../type-aliases/searchClusterVariablesInput.md)

##### consistencyManagement

[`searchClusterVariablesConsistency`](../type-aliases/searchClusterVariablesConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchCorrelatedMessageSubscriptions(
   input, 
   consistencyManagement, 
options?): CancelablePromise<CorrelatedMessageSubscriptionSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9266](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L9266)

Search correlated message subscriptions

Search correlated message subscriptions based on given criteria.
 *

#### Parameters

##### input

[`CorrelatedMessageSubscriptionSearchQuery`](../type-aliases/CorrelatedMessageSubscriptionSearchQuery.md)

##### consistencyManagement

[`searchCorrelatedMessageSubscriptionsConsistency`](../type-aliases/searchCorrelatedMessageSubscriptionsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchDecisionDefinitions(
   input, 
   consistencyManagement, 
options?): CancelablePromise<DecisionDefinitionSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9331](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L9331)

Search decision definitions

Search for decision definitions based on given criteria.
 *

#### Parameters

##### input

[`DecisionDefinitionSearchQuery`](../type-aliases/DecisionDefinitionSearchQuery.md)

##### consistencyManagement

[`searchDecisionDefinitionsConsistency`](../type-aliases/searchDecisionDefinitionsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchDecisionInstances(
   input, 
   consistencyManagement, 
options?): CancelablePromise<DecisionInstanceSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9394](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L9394)

Search decision instances

Search for decision instances based on given criteria.
 *

#### Parameters

##### input

[`DecisionInstanceSearchQuery`](../type-aliases/DecisionInstanceSearchQuery.md)

##### consistencyManagement

[`searchDecisionInstancesConsistency`](../type-aliases/searchDecisionInstancesConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchDecisionRequirements(
   input, 
   consistencyManagement, 
options?): CancelablePromise<DecisionRequirementsSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9457](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L9457)

Search decision requirements

Search for decision requirements based on given criteria.
 *

#### Parameters

##### input

[`DecisionRequirementsSearchQuery`](../type-aliases/DecisionRequirementsSearchQuery.md)

##### consistencyManagement

[`searchDecisionRequirementsConsistency`](../type-aliases/searchDecisionRequirementsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchElementInstanceIncidents(
   input, 
   consistencyManagement, 
options?): CancelablePromise<IncidentSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9527](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L9527)

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

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchElementInstances(
   input, 
   consistencyManagement, 
options?): CancelablePromise<ElementInstanceSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9592](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L9592)

Search element instances

Search for element instances based on given criteria.
 *

#### Parameters

##### input

[`ElementInstanceSearchQuery`](../type-aliases/ElementInstanceSearchQuery.md)

##### consistencyManagement

[`searchElementInstancesConsistency`](../type-aliases/searchElementInstancesConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchGlobalTaskListeners(
   input, 
   consistencyManagement, 
options?): CancelablePromise<GlobalTaskListenerSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9655](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L9655)

Search global user task listeners

Search for global user task listeners based on given criteria.
 *

#### Parameters

##### input

[`GlobalTaskListenerSearchQueryRequest`](../type-aliases/GlobalTaskListenerSearchQueryRequest.md)

##### consistencyManagement

[`searchGlobalTaskListenersConsistency`](../type-aliases/searchGlobalTaskListenersConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchGroupIdsForTenant(
   input, 
   consistencyManagement, 
options?): CancelablePromise<TenantGroupSearchResult>;
```

Defined in: [gen/CamundaClient.ts:9718](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L9718)

Search groups for tenant

Retrieves a filtered and sorted list of groups for a specified tenant.
 *

#### Parameters

##### input

[`searchGroupIdsForTenantInput`](../type-aliases/searchGroupIdsForTenantInput.md)

##### consistencyManagement

[`searchGroupIdsForTenantConsistency`](../type-aliases/searchGroupIdsForTenantConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchGroups(
   input, 
   consistencyManagement, 
options?): CancelablePromise<GroupSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9783](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L9783)

Search groups

Search for groups based on given criteria.
 *

#### Parameters

##### input

[`GroupSearchQueryRequest`](../type-aliases/GroupSearchQueryRequest.md)

##### consistencyManagement

[`searchGroupsConsistency`](../type-aliases/searchGroupsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchGroupsForRole(
   input, 
   consistencyManagement, 
options?): CancelablePromise<RoleGroupSearchResult>;
```

Defined in: [gen/CamundaClient.ts:9846](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L9846)

Search role groups

Search groups with assigned role.
 *

#### Parameters

##### input

[`searchGroupsForRoleInput`](../type-aliases/searchGroupsForRoleInput.md)

##### consistencyManagement

[`searchGroupsForRoleConsistency`](../type-aliases/searchGroupsForRoleConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchIncidents(
   input, 
   consistencyManagement, 
options?): CancelablePromise<IncidentSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9914](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L9914)

Search incidents

Search for incidents based on given criteria.

 *

#### Parameters

##### input

[`IncidentSearchQuery`](../type-aliases/IncidentSearchQuery.md)

##### consistencyManagement

[`searchIncidentsConsistency`](../type-aliases/searchIncidentsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchJobs(
   input, 
   consistencyManagement, 
options?): CancelablePromise<JobSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:9977](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L9977)

Search jobs

Search for jobs based on given criteria.
 *

#### Parameters

##### input

[`JobSearchQuery`](../type-aliases/JobSearchQuery.md)

##### consistencyManagement

[`searchJobsConsistency`](../type-aliases/searchJobsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchMappingRule(
   input, 
   consistencyManagement, 
options?): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:10041](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L10041)

Search mapping rules

Search for mapping rules based on given criteria.

 *

#### Parameters

##### input

[`MappingRuleSearchQueryRequest`](../type-aliases/MappingRuleSearchQueryRequest.md)

##### consistencyManagement

[`searchMappingRuleConsistency`](../type-aliases/searchMappingRuleConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchMappingRulesForGroup(
   input, 
   consistencyManagement, 
options?): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:10104](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L10104)

Search group mapping rules

Search mapping rules assigned to a group.
 *

#### Parameters

##### input

[`searchMappingRulesForGroupInput`](../type-aliases/searchMappingRulesForGroupInput.md)

##### consistencyManagement

[`searchMappingRulesForGroupConsistency`](../type-aliases/searchMappingRulesForGroupConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchMappingRulesForRole(
   input, 
   consistencyManagement, 
options?): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:10169](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L10169)

Search role mapping rules

Search mapping rules with assigned role.
 *

#### Parameters

##### input

[`searchMappingRulesForRoleInput`](../type-aliases/searchMappingRulesForRoleInput.md)

##### consistencyManagement

[`searchMappingRulesForRoleConsistency`](../type-aliases/searchMappingRulesForRoleConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchMappingRulesForTenant(
   input, 
   consistencyManagement, 
options?): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:10234](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L10234)

Search mapping rules for tenant

Retrieves a filtered and sorted list of MappingRules for a specified tenant.
 *

#### Parameters

##### input

[`searchMappingRulesForTenantInput`](../type-aliases/searchMappingRulesForTenantInput.md)

##### consistencyManagement

[`searchMappingRulesForTenantConsistency`](../type-aliases/searchMappingRulesForTenantConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchMessageSubscriptions(
   input, 
   consistencyManagement, 
options?): CancelablePromise<MessageSubscriptionSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:10299](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L10299)

Search message subscriptions

Search for message subscriptions based on given criteria.
 *

#### Parameters

##### input

[`MessageSubscriptionSearchQuery`](../type-aliases/MessageSubscriptionSearchQuery.md)

##### consistencyManagement

[`searchMessageSubscriptionsConsistency`](../type-aliases/searchMessageSubscriptionsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchProcessDefinitions(
   input, 
   consistencyManagement, 
options?): CancelablePromise<ProcessDefinitionSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:10362](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L10362)

Search process definitions

Search for process definitions based on given criteria.
 *

#### Parameters

##### input

[`ProcessDefinitionSearchQuery`](../type-aliases/ProcessDefinitionSearchQuery.md)

##### consistencyManagement

[`searchProcessDefinitionsConsistency`](../type-aliases/searchProcessDefinitionsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchProcessInstanceIncidents(
   input, 
   consistencyManagement, 
options?): CancelablePromise<IncidentSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:10431](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L10431)

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

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchProcessInstances(
   input, 
   consistencyManagement, 
options?): CancelablePromise<ProcessInstanceSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:10498](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L10498)

Search process instances

Search for process instances based on given criteria.
 *

#### Parameters

##### input

[`ProcessInstanceSearchQuery`](../type-aliases/ProcessInstanceSearchQuery.md)

##### consistencyManagement

[`searchProcessInstancesConsistency`](../type-aliases/searchProcessInstancesConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchRoles(
   input, 
   consistencyManagement, 
options?): CancelablePromise<RoleSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:10561](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L10561)

Search roles

Search for roles based on given criteria.
 *

#### Parameters

##### input

[`RoleSearchQueryRequest`](../type-aliases/RoleSearchQueryRequest.md)

##### consistencyManagement

[`searchRolesConsistency`](../type-aliases/searchRolesConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchRolesForGroup(
   input, 
   consistencyManagement, 
options?): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:10624](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L10624)

Search group roles

Search roles assigned to a group.
 *

#### Parameters

##### input

[`searchRolesForGroupInput`](../type-aliases/searchRolesForGroupInput.md)

##### consistencyManagement

[`searchRolesForGroupConsistency`](../type-aliases/searchRolesForGroupConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchRolesForTenant(
   input, 
   consistencyManagement, 
options?): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:10689](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L10689)

Search roles for tenant

Retrieves a filtered and sorted list of roles for a specified tenant.
 *

#### Parameters

##### input

[`searchRolesForTenantInput`](../type-aliases/searchRolesForTenantInput.md)

##### consistencyManagement

[`searchRolesForTenantConsistency`](../type-aliases/searchRolesForTenantConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchTenants(
   input, 
   consistencyManagement, 
options?): CancelablePromise<TenantSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:10754](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L10754)

Search tenants

Retrieves a filtered and sorted list of tenants.
 *

#### Parameters

##### input

[`TenantSearchQueryRequest`](../type-aliases/TenantSearchQueryRequest.md)

##### consistencyManagement

[`searchTenantsConsistency`](../type-aliases/searchTenantsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchUsers(
   input, 
   consistencyManagement, 
options?): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:10817](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L10817)

Search users

Search for users based on given criteria.
 *

#### Parameters

##### input

[`UserSearchQueryRequest`](../type-aliases/UserSearchQueryRequest.md)

##### consistencyManagement

[`searchUsersConsistency`](../type-aliases/searchUsersConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchUsersForGroup(
   input, 
   consistencyManagement, 
options?): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:10880](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L10880)

Search group users

Search users assigned to a group.
 *

#### Parameters

##### input

[`searchUsersForGroupInput`](../type-aliases/searchUsersForGroupInput.md)

##### consistencyManagement

[`searchUsersForGroupConsistency`](../type-aliases/searchUsersForGroupConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchUsersForRole(
   input, 
   consistencyManagement, 
options?): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:10945](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L10945)

Search role users

Search users with assigned role.
 *

#### Parameters

##### input

[`searchUsersForRoleInput`](../type-aliases/searchUsersForRoleInput.md)

##### consistencyManagement

[`searchUsersForRoleConsistency`](../type-aliases/searchUsersForRoleConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchUsersForTenant(
   input, 
   consistencyManagement, 
options?): CancelablePromise<SearchQueryResponse & object>;
```

Defined in: [gen/CamundaClient.ts:11010](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L11010)

Search users for tenant

Retrieves a filtered and sorted list of users for a specified tenant.
 *

#### Parameters

##### input

[`searchUsersForTenantInput`](../type-aliases/searchUsersForTenantInput.md)

##### consistencyManagement

[`searchUsersForTenantConsistency`](../type-aliases/searchUsersForTenantConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchUserTaskAuditLogs(
   input, 
   consistencyManagement, 
options?): CancelablePromise<AuditLogSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:11075](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L11075)

Search user task audit logs

Search for user task audit logs based on given criteria.
 *

#### Parameters

##### input

[`searchUserTaskAuditLogsInput`](../type-aliases/searchUserTaskAuditLogsInput.md)

##### consistencyManagement

[`searchUserTaskAuditLogsConsistency`](../type-aliases/searchUserTaskAuditLogsConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchUserTasks(
   input, 
   consistencyManagement, 
options?): CancelablePromise<UserTaskSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:11142](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L11142)

Search user tasks

Search for user tasks based on given criteria.
 *

#### Parameters

##### input

[`UserTaskSearchQuery`](../type-aliases/UserTaskSearchQuery.md)

##### consistencyManagement

[`searchUserTasksConsistency`](../type-aliases/searchUserTasksConsistency.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchUserTaskVariables(
   input, 
   consistencyManagement, 
options?): CancelablePromise<VariableSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:11208](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L11208)

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

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
searchVariables(
   input, 
   consistencyManagement, 
options?): CancelablePromise<VariableSearchQueryResult>;
```

Defined in: [gen/CamundaClient.ts:11283](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L11283)

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

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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

Defined in: [gen/CamundaClient.ts:1551](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1551)

Stop all registered job workers (best-effort).

#### Returns

`void`

***

### suspendBatchOperation()

```ts
suspendBatchOperation(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11349](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L11349)

Suspend Batch operation

Suspends a running batch operation.
This is done asynchronously, the progress can be tracked using the batch operation status endpoint (/batch-operations/{batchOperationKey}).

 *

#### Parameters

##### input

###### batchOperationKey

[`BatchOperationKey`](../type-aliases/BatchOperationKey.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

suspendBatchOperation

#### Tags

Batch operation

***

### throwJobError()

```ts
throwJobError(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11410](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L11410)

Throw error for job

Reports a business error (i.e. non-technical) that occurs while processing a job.

 *

#### Parameters

##### input

[`throwJobErrorInput`](../type-aliases/throwJobErrorInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

throwJobError

#### Tags

Job

***

### unassignClientFromGroup()

```ts
unassignClientFromGroup(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11472](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L11472)

Unassign a client from a group

Unassigns a client from a group.
The client is removed as a group member, with associated authorizations, roles, and tenant assignments no longer applied.

 *

#### Parameters

##### input

[`unassignClientFromGroupInput`](../type-aliases/unassignClientFromGroupInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignClientFromGroup

#### Tags

Group

***

### unassignClientFromTenant()

```ts
unassignClientFromTenant(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11532](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L11532)

Unassign a client from a tenant

Unassigns the client from the specified tenant.
The client can no longer access tenant data.

 *

#### Parameters

##### input

[`unassignClientFromTenantInput`](../type-aliases/unassignClientFromTenantInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignClientFromTenant

#### Tags

Tenant

***

### unassignGroupFromTenant()

```ts
unassignGroupFromTenant(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11592](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L11592)

Unassign a group from a tenant

Unassigns a group from a specified tenant.
Members of the group (users, clients) will no longer have access to the tenant's data - except they are assigned directly to the tenant.

 *

#### Parameters

##### input

[`unassignGroupFromTenantInput`](../type-aliases/unassignGroupFromTenantInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignGroupFromTenant

#### Tags

Tenant

***

### unassignMappingRuleFromGroup()

```ts
unassignMappingRuleFromGroup(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11650](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L11650)

Unassign a mapping rule from a group

Unassigns a mapping rule from a group.
 *

#### Parameters

##### input

[`unassignMappingRuleFromGroupInput`](../type-aliases/unassignMappingRuleFromGroupInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignMappingRuleFromGroup

#### Tags

Group

***

### unassignMappingRuleFromTenant()

```ts
unassignMappingRuleFromTenant(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11708](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L11708)

Unassign a mapping rule from a tenant

Unassigns a single mapping rule from a specified tenant without deleting the rule.
 *

#### Parameters

##### input

[`unassignMappingRuleFromTenantInput`](../type-aliases/unassignMappingRuleFromTenantInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignMappingRuleFromTenant

#### Tags

Tenant

***

### unassignRoleFromClient()

```ts
unassignRoleFromClient(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11766](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L11766)

Unassign a role from a client

Unassigns the specified role from the client. The client will no longer inherit the authorizations associated with this role.
 *

#### Parameters

##### input

[`unassignRoleFromClientInput`](../type-aliases/unassignRoleFromClientInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignRoleFromClient

#### Tags

Role

***

### unassignRoleFromGroup()

```ts
unassignRoleFromGroup(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11824](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L11824)

Unassign a role from a group

Unassigns the specified role from the group. All group members (user or client) no longer inherit the authorizations associated with this role.
 *

#### Parameters

##### input

[`unassignRoleFromGroupInput`](../type-aliases/unassignRoleFromGroupInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignRoleFromGroup

#### Tags

Role

***

### unassignRoleFromMappingRule()

```ts
unassignRoleFromMappingRule(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11882](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L11882)

Unassign a role from a mapping rule

Unassigns a role from a mapping rule.
 *

#### Parameters

##### input

[`unassignRoleFromMappingRuleInput`](../type-aliases/unassignRoleFromMappingRuleInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignRoleFromMappingRule

#### Tags

Role

***

### unassignRoleFromTenant()

```ts
unassignRoleFromTenant(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:11943](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L11943)

Unassign a role from a tenant

Unassigns a role from a specified tenant.
Users, Clients or Groups, that have the role assigned, will no longer have access to the
tenant's data - unless they are assigned directly to the tenant.

 *

#### Parameters

##### input

[`unassignRoleFromTenantInput`](../type-aliases/unassignRoleFromTenantInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignRoleFromTenant

#### Tags

Tenant

***

### unassignRoleFromUser()

```ts
unassignRoleFromUser(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:12001](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L12001)

Unassign a role from a user

Unassigns a role from a user. The user will no longer inherit the authorizations associated with this role.
 *

#### Parameters

##### input

[`unassignRoleFromUserInput`](../type-aliases/unassignRoleFromUserInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignRoleFromUser

#### Tags

Role

***

### unassignUserFromGroup()

```ts
unassignUserFromGroup(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:12061](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L12061)

Unassign a user from a group

Unassigns a user from a group.
The user is removed as a group member, with associated authorizations, roles, and tenant assignments no longer applied.

 *

#### Parameters

##### input

[`unassignUserFromGroupInput`](../type-aliases/unassignUserFromGroupInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignUserFromGroup

#### Tags

Group

***

### unassignUserFromTenant()

```ts
unassignUserFromTenant(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:12121](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L12121)

Unassign a user from a tenant

Unassigns the user from the specified tenant.
The user can no longer access tenant data.

 *

#### Parameters

##### input

[`unassignUserFromTenantInput`](../type-aliases/unassignUserFromTenantInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

unassignUserFromTenant

#### Tags

Tenant

***

### unassignUserTask()

```ts
unassignUserTask(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:12181](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L12181)

Unassign user task

Removes the assignee of a task with the given key.
 *

#### Parameters

##### input

[`unassignUserTaskInput`](../type-aliases/unassignUserTaskInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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
updateAuthorization(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:12239](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L12239)

Update authorization

Update the authorization with the given key.
 *

#### Parameters

##### input

[`updateAuthorizationInput`](../type-aliases/updateAuthorizationInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

updateAuthorization

#### Tags

Authorization

***

### updateGlobalClusterVariable()

```ts
updateGlobalClusterVariable(input, options?): CancelablePromise<ClusterVariableResult>;
```

Defined in: [gen/CamundaClient.ts:12301](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L12301)

Update a global-scoped cluster variable

Updates the value of an existing global cluster variable.
The variable must exist, otherwise a 404 error is returned.

 *

#### Parameters

##### input

[`updateGlobalClusterVariableInput`](../type-aliases/updateGlobalClusterVariableInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ClusterVariableResult`](../type-aliases/ClusterVariableResult.md)\>

#### Operation Id

updateGlobalClusterVariable

#### Tags

Cluster Variable

***

### updateGlobalTaskListener()

```ts
updateGlobalTaskListener(input, options?): CancelablePromise<GlobalTaskListenerResult>;
```

Defined in: [gen/CamundaClient.ts:12361](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L12361)

Update global user task listener

Updates a global user task listener.
 *

#### Parameters

##### input

[`updateGlobalTaskListenerInput`](../type-aliases/updateGlobalTaskListenerInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`GlobalTaskListenerResult`](../type-aliases/GlobalTaskListenerResult.md)\>

#### Operation Id

updateGlobalTaskListener

#### Tags

Global listener

***

### updateGroup()

```ts
updateGroup(input, options?): CancelablePromise<GroupUpdateResult>;
```

Defined in: [gen/CamundaClient.ts:12421](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L12421)

Update group

Update a group with the given ID.
 *

#### Parameters

##### input

[`updateGroupInput`](../type-aliases/updateGroupInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`GroupUpdateResult`](../type-aliases/GroupUpdateResult.md)\>

#### Operation Id

updateGroup

#### Tags

Group

***

### updateJob()

```ts
updateJob(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:12481](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L12481)

Update job

Update a job with the given key.
 *

#### Parameters

##### input

[`updateJobInput`](../type-aliases/updateJobInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

#### Operation Id

updateJob

#### Tags

Job

***

### updateMappingRule()

```ts
updateMappingRule(input, options?): CancelablePromise<MappingRuleCreateUpdateResult>;
```

Defined in: [gen/CamundaClient.ts:12542](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L12542)

Update mapping rule

Update a mapping rule.

 *

#### Parameters

##### input

[`updateMappingRuleInput`](../type-aliases/updateMappingRuleInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`MappingRuleCreateUpdateResult`](../type-aliases/MappingRuleCreateUpdateResult.md)\>

#### Operation Id

updateMappingRule

#### Tags

Mapping rule

***

### updateRole()

```ts
updateRole(input, options?): CancelablePromise<RoleUpdateResult>;
```

Defined in: [gen/CamundaClient.ts:12602](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L12602)

Update role

Update a role with the given ID.
 *

#### Parameters

##### input

[`updateRoleInput`](../type-aliases/updateRoleInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`RoleUpdateResult`](../type-aliases/RoleUpdateResult.md)\>

#### Operation Id

updateRole

#### Tags

Role

***

### updateTenant()

```ts
updateTenant(input, options?): CancelablePromise<TenantUpdateResult>;
```

Defined in: [gen/CamundaClient.ts:12662](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L12662)

Update tenant

Updates an existing tenant.
 *

#### Parameters

##### input

[`updateTenantInput`](../type-aliases/updateTenantInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`TenantUpdateResult`](../type-aliases/TenantUpdateResult.md)\>

#### Operation Id

updateTenant

#### Tags

Tenant

***

### updateTenantClusterVariable()

```ts
updateTenantClusterVariable(input, options?): CancelablePromise<ClusterVariableResult>;
```

Defined in: [gen/CamundaClient.ts:12724](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L12724)

Update a tenant-scoped cluster variable

Updates the value of an existing tenant-scoped cluster variable.
The variable must exist, otherwise a 404 error is returned.

 *

#### Parameters

##### input

[`updateTenantClusterVariableInput`](../type-aliases/updateTenantClusterVariableInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<[`ClusterVariableResult`](../type-aliases/ClusterVariableResult.md)\>

#### Operation Id

updateTenantClusterVariable

#### Tags

Cluster Variable

***

### updateUser()

```ts
updateUser(input, options?): CancelablePromise<{
  email: string | null;
  name: string | null;
  username: Username;
}>;
```

Defined in: [gen/CamundaClient.ts:12784](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L12784)

Update user

Updates a user.
 *

#### Parameters

##### input

[`updateUserInput`](../type-aliases/updateUserInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `email`: `string` \| `null`;
  `name`: `string` \| `null`;
  `username`: [`Username`](../type-aliases/Username.md);
\}\>

#### Operation Id

updateUser

#### Tags

User

***

### updateUserTask()

```ts
updateUserTask(input, options?): CancelablePromise<void>;
```

Defined in: [gen/CamundaClient.ts:12844](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L12844)

Update user task

Update a user task with the given key.
 *

#### Parameters

##### input

[`updateUserTaskInput`](../type-aliases/updateUserTaskInput.md)

##### options?

[`OperationOptions`](../interfaces/OperationOptions.md)

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

Defined in: [gen/CamundaClient.ts:1465](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1465)

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
