---
title: "Function: createCamundaClientLoose()"
sidebar_label: "createCamundaClientLoose()"
mdx:
  format: md
---

# Function: createCamundaClientLoose()

```ts
function createCamundaClientLoose(...args): object;
```

Defined in: [loose.ts:43](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/loose.ts#L43)

Create a client where all branded key types are widened to string.
Use when integrating with external systems or when dynamic string keys are common and brand friction is unwanted.
For maximum type safety prefer the strict createCamundaClient.

## Parameters

### args

...\[[`CamundaOptions`](../interfaces/CamundaOptions.md)\]

## Returns

`object`

### config

```ts
config: object;
```

#### config.\_\_raw

```ts
readonly __raw: object;
```

##### Index Signature

```ts
[key: string]: string | undefined
```

#### config.auth

```ts
readonly auth: object;
```

#### config.auth.basic?

```ts
optional basic: object;
```

#### config.auth.basic.password?

```ts
optional password: string;
```

#### config.auth.basic.username?

```ts
optional username: string;
```

#### config.auth.strategy

```ts
strategy: AuthStrategy;
```

#### config.backpressure

```ts
readonly backpressure: object;
```

#### config.backpressure.decayQuietMs

```ts
decayQuietMs: number;
```

#### config.backpressure.enabled

```ts
enabled: boolean;
```

#### config.backpressure.floor

```ts
floor: number;
```

#### config.backpressure.healthyRecoveryMultiplier

```ts
healthyRecoveryMultiplier: number;
```

#### config.backpressure.initialMax

```ts
initialMax: number;
```

#### config.backpressure.maxWaiters

```ts
maxWaiters: number;
```

#### config.backpressure.observeOnly

```ts
observeOnly: boolean;
```

#### config.backpressure.profile

```ts
profile: string;
```

#### config.backpressure.recoveryIntervalMs

```ts
recoveryIntervalMs: number;
```

#### config.backpressure.recoveryStep

```ts
recoveryStep: number;
```

#### config.backpressure.severeFactor

```ts
severeFactor: number;
```

#### config.backpressure.severeThreshold

```ts
severeThreshold: number;
```

#### config.backpressure.softFactor

```ts
softFactor: number;
```

#### config.backpressure.unlimitedAfterHealthyMs

```ts
unlimitedAfterHealthyMs: number;
```

#### config.defaultTenantId

```ts
readonly defaultTenantId: string;
```

#### config.eventual?

```ts
readonly optional eventual: object;
```

#### config.eventual.pollDefaultMs

```ts
pollDefaultMs: number;
```

#### config.httpRetry

```ts
readonly httpRetry: object;
```

#### config.httpRetry.baseDelayMs

```ts
baseDelayMs: number;
```

#### config.httpRetry.maxAttempts

```ts
maxAttempts: number;
```

#### config.httpRetry.maxDelayMs

```ts
maxDelayMs: number;
```

#### config.logLevel

```ts
readonly logLevel: "trace" | "error" | "silent" | "warn" | "info" | "debug";
```

#### config.mtls?

```ts
readonly optional mtls: object;
```

#### config.mtls.ca?

```ts
optional ca: string;
```

#### config.mtls.caPath?

```ts
optional caPath: string;
```

#### config.mtls.cert?

```ts
optional cert: string;
```

#### config.mtls.certPath?

```ts
optional certPath: string;
```

#### config.mtls.key?

```ts
optional key: string;
```

#### config.mtls.keyPassphrase?

```ts
optional keyPassphrase: string;
```

#### config.mtls.keyPath?

```ts
optional keyPath: string;
```

#### config.oauth

```ts
readonly oauth: object;
```

#### config.oauth.cacheDir?

```ts
optional cacheDir: string;
```

#### config.oauth.clientId?

```ts
optional clientId: string;
```

#### config.oauth.clientSecret?

```ts
optional clientSecret: string;
```

#### config.oauth.grantType

```ts
grantType: string;
```

#### config.oauth.oauthUrl

```ts
oauthUrl: string;
```

#### config.oauth.retry

```ts
retry: object;
```

#### config.oauth.retry.baseDelayMs

```ts
baseDelayMs: number;
```

#### config.oauth.retry.max

```ts
max: number;
```

#### config.oauth.scope?

```ts
optional scope: string;
```

#### config.oauth.timeoutMs

```ts
timeoutMs: number;
```

#### config.restAddress

```ts
readonly restAddress: string;
```

#### config.supportLog?

```ts
readonly optional supportLog: object;
```

#### config.supportLog.enabled

```ts
enabled: boolean;
```

#### config.supportLog.filePath

```ts
filePath: string;
```

#### config.telemetry?

```ts
readonly optional telemetry: object;
```

#### config.telemetry.correlation

```ts
correlation: boolean;
```

#### config.telemetry.log

```ts
log: boolean;
```

#### config.tokenAudience

```ts
readonly tokenAudience: string;
```

#### config.validation

```ts
readonly validation: object;
```

#### config.validation.raw

```ts
raw: string;
```

#### config.validation.req

```ts
req: ValidationMode;
```

#### config.validation.res

```ts
res: ValidationMode;
```

### \_getSupportLogger()

```ts
_getSupportLogger(...a): object;
```

#### Parameters

##### a

...\[\]

#### Returns

`object`

##### log()

```ts
log(...a): void;
```

###### Parameters

###### a

...\[`string` \| `number` \| `boolean` \| `object`, `boolean`\]

###### Returns

`void`

### \_invokeWithRetry()

```ts
_invokeWithRetry(...a): Promise<unknown>;
```

#### Parameters

##### a

...\[(...`a`) => `Promise`\<`unknown`\>, `object`\]

#### Returns

`Promise`\<`unknown`\>

### activateAdHocSubProcessActivities()

```ts
activateAdHocSubProcessActivities(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### activateJobs()

```ts
activateJobs(...a): CancelablePromise<{
  jobs: object[];
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `jobs`: `object`[];
\}\>

### assignClientToGroup()

```ts
assignClientToGroup(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### assignClientToTenant()

```ts
assignClientToTenant(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### assignGroupToTenant()

```ts
assignGroupToTenant(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### assignMappingRuleToGroup()

```ts
assignMappingRuleToGroup(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### assignMappingRuleToTenant()

```ts
assignMappingRuleToTenant(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### assignRoleToClient()

```ts
assignRoleToClient(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### assignRoleToGroup()

```ts
assignRoleToGroup(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### assignRoleToMappingRule()

```ts
assignRoleToMappingRule(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### assignRoleToTenant()

```ts
assignRoleToTenant(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### assignRoleToUser()

```ts
assignRoleToUser(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### assignUserTask()

```ts
assignUserTask(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### assignUserToGroup()

```ts
assignUserToGroup(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### assignUserToTenant()

```ts
assignUserToTenant(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### broadcastSignal()

```ts
broadcastSignal(...a): CancelablePromise<{
  signalKey: string;
  tenantId: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `signalKey`: `string`;
  `tenantId`: `string`;
\}\>

### cancelBatchOperation()

```ts
cancelBatchOperation(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### cancelProcessInstance()

```ts
cancelProcessInstance(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### cancelProcessInstancesBatchOperation()

```ts
cancelProcessInstancesBatchOperation(...a): CancelablePromise<{
  batchOperationKey: string;
  batchOperationType: BatchOperationTypeEnum;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `batchOperationKey`: `string`;
  `batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>

### clearAuthCache()

```ts
clearAuthCache(...a): void;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

`void`

### completeJob()

```ts
completeJob(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### completeUserTask()

```ts
completeUserTask(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### configure()

```ts
configure(...a): void;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

`void`

### correlateMessage()

```ts
correlateMessage(...a): CancelablePromise<{
  messageKey: string;
  processInstanceKey: string;
  tenantId: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `messageKey`: `string`;
  `processInstanceKey`: `string`;
  `tenantId`: `string`;
\}\>

### createAdminUser()

```ts
createAdminUser(...a): CancelablePromise<{
  email: string | null;
  name: string | null;
  username: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `email`: `string` \| `null`;
  `name`: `string` \| `null`;
  `username`: `string`;
\}\>

### createAuthorization()

```ts
createAuthorization(...a): CancelablePromise<{
  authorizationKey: string;
}>;
```

#### Parameters

##### a

...\[
  \| \{
  `ownerId`: `string`;
  `ownerType`: [`OwnerTypeEnum`](../type-aliases/OwnerTypeEnum.md);
  `permissionTypes`: [`PermissionTypeEnum`](../type-aliases/PermissionTypeEnum.md)[];
  `resourceId`: `string`;
  `resourceType`: [`ResourceTypeEnum`](../type-aliases/ResourceTypeEnum.md);
\}
  \| \{
  `ownerId`: `string`;
  `ownerType`: [`OwnerTypeEnum`](../type-aliases/OwnerTypeEnum.md);
  `permissionTypes`: [`PermissionTypeEnum`](../type-aliases/PermissionTypeEnum.md)[];
  `resourcePropertyName`: `string`;
  `resourceType`: [`ResourceTypeEnum`](../type-aliases/ResourceTypeEnum.md);
\}, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `authorizationKey`: `string`;
\}\>

### createDeployment()

```ts
createDeployment(...a): CancelablePromise<{
  decisionRequirements: object[];
  decisions: object[];
  deploymentKey: string;
  deployments: object[];
  forms: object[];
  processes: object[];
  resources: object[];
  tenantId: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `decisionRequirements`: `object`[];
  `decisions`: `object`[];
  `deploymentKey`: `string`;
  `deployments`: `object`[];
  `forms`: `object`[];
  `processes`: `object`[];
  `resources`: `object`[];
  `tenantId`: `string`;
\}\>

### createDocument()

```ts
createDocument(...a): CancelablePromise<{
  camunda.document.type: "camunda";
  contentHash: string | null;
  documentId: string;
  metadata: {
     contentType: string;
     customProperties: {
      [key: string]: unknown;
     };
     expiresAt: string | null;
     fileName: string;
     processDefinitionId:   | {
      [key: number]: string;
        __brand: "ProcessDefinitionId";
      }
        | null;
     processInstanceKey:   | {
      [key: number]: string;
        __brand: "ProcessInstanceKey";
      }
        | null;
     size: number;
  };
  storeId: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `camunda.document.type`: `"camunda"`;
  `contentHash`: `string` \| `null`;
  `documentId`: `string`;
  `metadata`: \{
     `contentType`: `string`;
     `customProperties`: \{
      \[`key`: `string`\]: `unknown`;
     \};
     `expiresAt`: `string` \| `null`;
     `fileName`: `string`;
     `processDefinitionId`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"ProcessDefinitionId"`;
      \}
        \| `null`;
     `processInstanceKey`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"ProcessInstanceKey"`;
      \}
        \| `null`;
     `size`: `number`;
  \};
  `storeId`: `string`;
\}\>

### createDocumentLink()

```ts
createDocumentLink(...a): CancelablePromise<{
  expiresAt: string;
  url: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `expiresAt`: `string`;
  `url`: `string`;
\}\>

### createDocuments()

```ts
createDocuments(...a): CancelablePromise<{
  createdDocuments: object[];
  failedDocuments: object[];
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `createdDocuments`: `object`[];
  `failedDocuments`: `object`[];
\}\>

### createElementInstanceVariables()

```ts
createElementInstanceVariables(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### createGlobalClusterVariable()

```ts
createGlobalClusterVariable(...a): CancelablePromise<{
  name: string;
  scope: ClusterVariableScopeEnum;
  tenantId: string | null;
  value: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `name`: `string`;
  `scope`: [`ClusterVariableScopeEnum`](../type-aliases/ClusterVariableScopeEnum.md);
  `tenantId`: `string` \| `null`;
  `value`: `string`;
\}\>

### createGlobalTaskListener()

```ts
createGlobalTaskListener(...a): CancelablePromise<{
  afterNonGlobal?: boolean;
  eventTypes: GlobalTaskListenerEventTypeEnum[];
  id: string;
  priority?: number;
  retries?: number;
  source: GlobalListenerSourceEnum;
  type?: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `afterNonGlobal?`: `boolean`;
  `eventTypes`: [`GlobalTaskListenerEventTypeEnum`](../type-aliases/GlobalTaskListenerEventTypeEnum.md)[];
  `id`: `string`;
  `priority?`: `number`;
  `retries?`: `number`;
  `source`: [`GlobalListenerSourceEnum`](../type-aliases/GlobalListenerSourceEnum.md);
  `type?`: `string`;
\}\>

### createGroup()

```ts
createGroup(...a): CancelablePromise<{
  description: string | null;
  groupId: string;
  name: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `description`: `string` \| `null`;
  `groupId`: `string`;
  `name`: `string`;
\}\>

### createJobWorker()

```ts
createJobWorker(...a): object;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

`object`

##### activeJobs

```ts
activeJobs: number;
```

##### name

```ts
name: string;
```

##### stopped

```ts
stopped: boolean;
```

##### start()

```ts
start(...a): void;
```

###### Parameters

###### a

...\[\]

###### Returns

`void`

##### stop()

```ts
stop(...a): void;
```

###### Parameters

###### a

...\[\]

###### Returns

`void`

##### stopGracefully()

```ts
stopGracefully(...a): Promise<{
  remainingJobs: number;
  timedOut: boolean;
}>;
```

###### Parameters

###### a

...\[`object`\]

###### Returns

`Promise`\<\{
  `remainingJobs`: `number`;
  `timedOut`: `boolean`;
\}\>

### createMappingRule()

```ts
createMappingRule(...a): CancelablePromise<{
  claimName: string;
  claimValue: string;
  mappingRuleId: string;
  name: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `claimName`: `string`;
  `claimValue`: `string`;
  `mappingRuleId`: `string`;
  `name`: `string`;
\}\>

### createProcessInstance()

```ts
createProcessInstance(...a): CancelablePromise<{
  businessId:   | {
   [key: number]: string;
     __brand: "BusinessId";
   }
     | null;
  processDefinitionId: string;
  processDefinitionKey: string;
  processDefinitionVersion: number;
  processInstanceKey: string;
  tags: string[];
  tenantId: string;
  variables: {
   [key: string]: unknown;
  };
}>;
```

#### Parameters

##### a

...\[
  \| \{
  `awaitCompletion?`: `boolean`;
  `businessId?`: \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"BusinessId"`;
  \};
  `fetchVariables?`: `string`[];
  `operationReference?`: `number`;
  `processDefinitionKey`: `string`;
  `processDefinitionVersion?`: `number`;
  `requestTimeout?`: `number`;
  `runtimeInstructions?`: `object`[];
  `startInstructions?`: `object`[];
  `tags?`: `string`[];
  `tenantId?`: \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"TenantId"`;
  \};
  `variables?`: \{
   \[`key`: `string`\]: `unknown`;
  \};
\}
  \| \{
  `awaitCompletion?`: `boolean`;
  `businessId?`: \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"BusinessId"`;
  \};
  `fetchVariables?`: `string`[];
  `operationReference?`: `number`;
  `processDefinitionId`: `string`;
  `processDefinitionVersion?`: `number`;
  `requestTimeout?`: `number`;
  `runtimeInstructions?`: `object`[];
  `startInstructions?`: `object`[];
  `tags?`: `string`[];
  `tenantId?`: \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"TenantId"`;
  \};
  `variables?`: \{
   \[`key`: `string`\]: `unknown`;
  \};
\}, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `businessId`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"BusinessId"`;
   \}
     \| `null`;
  `processDefinitionId`: `string`;
  `processDefinitionKey`: `string`;
  `processDefinitionVersion`: `number`;
  `processInstanceKey`: `string`;
  `tags`: `string`[];
  `tenantId`: `string`;
  `variables`: \{
   \[`key`: `string`\]: `unknown`;
  \};
\}\>

### createRole()

```ts
createRole(...a): CancelablePromise<{
  description: string | null;
  name: string;
  roleId: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `description`: `string` \| `null`;
  `name`: `string`;
  `roleId`: `string`;
\}\>

### createTenant()

```ts
createTenant(...a): CancelablePromise<{
  description: string | null;
  name: string;
  tenantId: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `description`: `string` \| `null`;
  `name`: `string`;
  `tenantId`: `string`;
\}\>

### createTenantClusterVariable()

```ts
createTenantClusterVariable(...a): CancelablePromise<{
  name: string;
  scope: ClusterVariableScopeEnum;
  tenantId: string | null;
  value: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `name`: `string`;
  `scope`: [`ClusterVariableScopeEnum`](../type-aliases/ClusterVariableScopeEnum.md);
  `tenantId`: `string` \| `null`;
  `value`: `string`;
\}\>

### createUser()

```ts
createUser(...a): CancelablePromise<{
  email: string | null;
  name: string | null;
  username: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `email`: `string` \| `null`;
  `name`: `string` \| `null`;
  `username`: `string`;
\}\>

### deleteAuthorization()

```ts
deleteAuthorization(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### deleteDecisionInstance()

```ts
deleteDecisionInstance(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### deleteDecisionInstancesBatchOperation()

```ts
deleteDecisionInstancesBatchOperation(...a): CancelablePromise<{
  batchOperationKey: string;
  batchOperationType: BatchOperationTypeEnum;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `batchOperationKey`: `string`;
  `batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>

### deleteDocument()

```ts
deleteDocument(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### deleteGlobalClusterVariable()

```ts
deleteGlobalClusterVariable(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### deleteGlobalTaskListener()

```ts
deleteGlobalTaskListener(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### deleteGroup()

```ts
deleteGroup(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### deleteMappingRule()

```ts
deleteMappingRule(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### deleteProcessInstance()

```ts
deleteProcessInstance(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### deleteProcessInstancesBatchOperation()

```ts
deleteProcessInstancesBatchOperation(...a): CancelablePromise<{
  batchOperationKey: string;
  batchOperationType: BatchOperationTypeEnum;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `batchOperationKey`: `string`;
  `batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>

### deleteResource()

```ts
deleteResource(...a): CancelablePromise<{
  batchOperation:   | {
     batchOperationKey: string;
     batchOperationType: BatchOperationTypeEnum;
   }
     | null;
  resourceKey: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `batchOperation`:   \| \{
     `batchOperationKey`: `string`;
     `batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
   \}
     \| `null`;
  `resourceKey`: `string`;
\}\>

### deleteRole()

```ts
deleteRole(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### deleteTenant()

```ts
deleteTenant(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### deleteTenantClusterVariable()

```ts
deleteTenantClusterVariable(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### deleteUser()

```ts
deleteUser(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### deployResourcesFromFiles()

```ts
deployResourcesFromFiles(...a): CancelablePromise<{
  decisionRequirements: object[];
  decisions: object[];
  deploymentKey: string;
  deployments: object[];
  forms: object[];
  processes: object[];
  resources: object[];
  tenantId: string;
}>;
```

#### Parameters

##### a

...\[`string`[], `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `decisionRequirements`: `object`[];
  `decisions`: `object`[];
  `deploymentKey`: `string`;
  `deployments`: `object`[];
  `forms`: `object`[];
  `processes`: `object`[];
  `resources`: `object`[];
  `tenantId`: `string`;
\}\>

### emitSupportLogPreamble()

```ts
emitSupportLogPreamble(...a): void;
```

#### Parameters

##### a

...\[\]

#### Returns

`void`

### evaluateConditionals()

```ts
evaluateConditionals(...a): CancelablePromise<{
  conditionalEvaluationKey: string;
  processInstances: object[];
  tenantId: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `conditionalEvaluationKey`: `string`;
  `processInstances`: `object`[];
  `tenantId`: `string`;
\}\>

### evaluateDecision()

```ts
evaluateDecision(...a): CancelablePromise<{
  decisionDefinitionId: string;
  decisionDefinitionKey: string;
  decisionDefinitionName: string;
  decisionDefinitionVersion: number;
  decisionEvaluationKey: string;
  decisionInstanceKey: string;
  decisionRequirementsId: string;
  decisionRequirementsKey: string;
  evaluatedDecisions: object[];
  failedDecisionDefinitionId:   | {
   [key: number]: string;
     __brand: "DecisionDefinitionId";
   }
     | null;
  failureMessage: string | null;
  output: string;
  tenantId: string;
}>;
```

#### Parameters

##### a

...\[
  \| \{
  `decisionDefinitionId`: `string`;
  `tenantId?`: \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"TenantId"`;
  \};
  `variables?`: \{
   \[`key`: `string`\]: `unknown`;
  \};
\}
  \| \{
  `decisionDefinitionKey`: `string`;
  `tenantId?`: \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"TenantId"`;
  \};
  `variables?`: \{
   \[`key`: `string`\]: `unknown`;
  \};
\}, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `decisionDefinitionId`: `string`;
  `decisionDefinitionKey`: `string`;
  `decisionDefinitionName`: `string`;
  `decisionDefinitionVersion`: `number`;
  `decisionEvaluationKey`: `string`;
  `decisionInstanceKey`: `string`;
  `decisionRequirementsId`: `string`;
  `decisionRequirementsKey`: `string`;
  `evaluatedDecisions`: `object`[];
  `failedDecisionDefinitionId`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"DecisionDefinitionId"`;
   \}
     \| `null`;
  `failureMessage`: `string` \| `null`;
  `output`: `string`;
  `tenantId`: `string`;
\}\>

### evaluateExpression()

```ts
evaluateExpression(...a): CancelablePromise<{
  expression: string;
  result: unknown;
  warnings: string[];
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `expression`: `string`;
  `result`: `unknown`;
  `warnings`: `string`[];
\}\>

### failJob()

```ts
failJob(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### forceAuthRefresh()

```ts
forceAuthRefresh(...a): Promise<string | undefined>;
```

#### Parameters

##### a

...\[\]

#### Returns

`Promise`\<`string` \| `undefined`\>

### getAuditLog()

```ts
getAuditLog(...a): CancelablePromise<{
  actorId: string | null;
  actorType:   | AuditLogActorTypeEnum
     | null;
  agentElementId: string | null;
  annotation: string | null;
  auditLogKey: string;
  batchOperationKey:   | {
   [key: number]: string;
     __brand: "BatchOperationKey";
   }
     | null;
  batchOperationType:   | BatchOperationTypeEnum
     | null;
  category: AuditLogCategoryEnum;
  decisionDefinitionId:   | {
   [key: number]: string;
     __brand: "DecisionDefinitionId";
   }
     | null;
  decisionDefinitionKey:   | {
   [key: number]: string;
     __brand: "DecisionDefinitionKey";
   }
     | null;
  decisionEvaluationKey:   | {
   [key: number]: string;
     __brand: "DecisionEvaluationKey";
   }
     | null;
  decisionRequirementsId: string | null;
  decisionRequirementsKey:   | {
   [key: number]: string;
     __brand: "DecisionRequirementsKey";
   }
     | null;
  deploymentKey:   | {
   [key: number]: string;
     __brand: "DeploymentKey";
   }
     | null;
  elementInstanceKey:   | {
   [key: number]: string;
     __brand: "ElementInstanceKey";
   }
     | null;
  entityDescription: string | null;
  entityKey: string;
  entityType: AuditLogEntityTypeEnum;
  formKey:   | {
   [key: number]: string;
     __brand: "FormKey";
   }
     | null;
  jobKey:   | {
   [key: number]: string;
     __brand: "JobKey";
   }
     | null;
  operationType: AuditLogOperationTypeEnum;
  processDefinitionId:   | {
   [key: number]: string;
     __brand: "ProcessDefinitionId";
   }
     | null;
  processDefinitionKey:   | {
   [key: number]: string;
     __brand: "ProcessDefinitionKey";
   }
     | null;
  processInstanceKey:   | {
   [key: number]: string;
     __brand: "ProcessInstanceKey";
   }
     | null;
  relatedEntityKey:   | {
   [key: number]: string;
     __brand: "AuditLogEntityKey";
   }
     | null;
  relatedEntityType:   | AuditLogEntityTypeEnum
     | null;
  resourceKey:   | {
   [key: number]: string;
     __brand: "FormKey";
   }
     | {
   [key: number]: string;
     __brand: "ProcessDefinitionKey";
   }
     | {
   [key: number]: string;
     __brand: "DecisionRequirementsKey";
   }
     | {
   [key: number]: string;
     __brand: "DecisionDefinitionKey";
   }
     | null;
  result: AuditLogResultEnum;
  rootProcessInstanceKey:   | {
   [key: number]: string;
     __brand: "ProcessInstanceKey";
   }
     | null;
  tenantId:   | {
   [key: number]: string;
     __brand: "TenantId";
   }
     | null;
  timestamp: string;
  userTaskKey:   | {
   [key: number]: string;
     __brand: "UserTaskKey";
   }
     | null;
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `actorId`: `string` \| `null`;
  `actorType`:   \| [`AuditLogActorTypeEnum`](../type-aliases/AuditLogActorTypeEnum.md)
     \| `null`;
  `agentElementId`: `string` \| `null`;
  `annotation`: `string` \| `null`;
  `auditLogKey`: `string`;
  `batchOperationKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"BatchOperationKey"`;
   \}
     \| `null`;
  `batchOperationType`:   \| [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md)
     \| `null`;
  `category`: [`AuditLogCategoryEnum`](../type-aliases/AuditLogCategoryEnum.md);
  `decisionDefinitionId`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"DecisionDefinitionId"`;
   \}
     \| `null`;
  `decisionDefinitionKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"DecisionDefinitionKey"`;
   \}
     \| `null`;
  `decisionEvaluationKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"DecisionEvaluationKey"`;
   \}
     \| `null`;
  `decisionRequirementsId`: `string` \| `null`;
  `decisionRequirementsKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"DecisionRequirementsKey"`;
   \}
     \| `null`;
  `deploymentKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"DeploymentKey"`;
   \}
     \| `null`;
  `elementInstanceKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"ElementInstanceKey"`;
   \}
     \| `null`;
  `entityDescription`: `string` \| `null`;
  `entityKey`: `string`;
  `entityType`: [`AuditLogEntityTypeEnum`](../type-aliases/AuditLogEntityTypeEnum.md);
  `formKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"FormKey"`;
   \}
     \| `null`;
  `jobKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"JobKey"`;
   \}
     \| `null`;
  `operationType`: [`AuditLogOperationTypeEnum`](../type-aliases/AuditLogOperationTypeEnum.md);
  `processDefinitionId`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"ProcessDefinitionId"`;
   \}
     \| `null`;
  `processDefinitionKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"ProcessDefinitionKey"`;
   \}
     \| `null`;
  `processInstanceKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"ProcessInstanceKey"`;
   \}
     \| `null`;
  `relatedEntityKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"AuditLogEntityKey"`;
   \}
     \| `null`;
  `relatedEntityType`:   \| [`AuditLogEntityTypeEnum`](../type-aliases/AuditLogEntityTypeEnum.md)
     \| `null`;
  `resourceKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"FormKey"`;
   \}
     \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"ProcessDefinitionKey"`;
   \}
     \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"DecisionRequirementsKey"`;
   \}
     \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"DecisionDefinitionKey"`;
   \}
     \| `null`;
  `result`: [`AuditLogResultEnum`](../type-aliases/AuditLogResultEnum.md);
  `rootProcessInstanceKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"ProcessInstanceKey"`;
   \}
     \| `null`;
  `tenantId`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"TenantId"`;
   \}
     \| `null`;
  `timestamp`: `string`;
  `userTaskKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"UserTaskKey"`;
   \}
     \| `null`;
\}\>

### getAuthentication()

```ts
getAuthentication(...a): CancelablePromise<{
  authorizedComponents: string[];
  c8Links: {
   [key: string]: string;
  };
  canLogout: boolean;
  displayName: string | null;
  email: string | null;
  groups: string[];
  roles: string[];
  salesPlanType: string | null;
  tenants: object[];
  username:   | {
   [key: number]: string;
     __brand: "Username";
   }
     | null;
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `authorizedComponents`: `string`[];
  `c8Links`: \{
   \[`key`: `string`\]: `string`;
  \};
  `canLogout`: `boolean`;
  `displayName`: `string` \| `null`;
  `email`: `string` \| `null`;
  `groups`: `string`[];
  `roles`: `string`[];
  `salesPlanType`: `string` \| `null`;
  `tenants`: `object`[];
  `username`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"Username"`;
   \}
     \| `null`;
\}\>

### getAuthHeaders()

```ts
getAuthHeaders(...a): Promise<{
[key: string]: string;
}>;
```

#### Parameters

##### a

...\[\]

#### Returns

`Promise`\<\{
\[`key`: `string`\]: `string`;
\}\>

### getAuthorization()

```ts
getAuthorization(...a): CancelablePromise<{
  authorizationKey: string;
  ownerId: string;
  ownerType: OwnerTypeEnum;
  permissionTypes: PermissionTypeEnum[];
  resourceId: string | null;
  resourcePropertyName: string | null;
  resourceType: ResourceTypeEnum;
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `authorizationKey`: `string`;
  `ownerId`: `string`;
  `ownerType`: [`OwnerTypeEnum`](../type-aliases/OwnerTypeEnum.md);
  `permissionTypes`: [`PermissionTypeEnum`](../type-aliases/PermissionTypeEnum.md)[];
  `resourceId`: `string` \| `null`;
  `resourcePropertyName`: `string` \| `null`;
  `resourceType`: [`ResourceTypeEnum`](../type-aliases/ResourceTypeEnum.md);
\}\>

### getBackpressureState()

```ts
getBackpressureState(...a): 
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

#### Parameters

##### a

...\[\]

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

### getBatchOperation()

```ts
getBatchOperation(...a): CancelablePromise<{
  actorId: string | null;
  actorType:   | AuditLogActorTypeEnum
     | null;
  batchOperationKey: string;
  batchOperationType: BatchOperationTypeEnum;
  endDate: string | null;
  errors: object[];
  operationsCompletedCount: number;
  operationsFailedCount: number;
  operationsTotalCount: number;
  startDate: string | null;
  state: BatchOperationStateEnum;
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `actorId`: `string` \| `null`;
  `actorType`:   \| [`AuditLogActorTypeEnum`](../type-aliases/AuditLogActorTypeEnum.md)
     \| `null`;
  `batchOperationKey`: `string`;
  `batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
  `endDate`: `string` \| `null`;
  `errors`: `object`[];
  `operationsCompletedCount`: `number`;
  `operationsFailedCount`: `number`;
  `operationsTotalCount`: `number`;
  `startDate`: `string` \| `null`;
  `state`: [`BatchOperationStateEnum`](../type-aliases/BatchOperationStateEnum.md);
\}\>

### getConfig()

```ts
getConfig(...a): object;
```

#### Parameters

##### a

...\[\]

#### Returns

`object`

##### \_\_raw

```ts
readonly __raw: object;
```

###### Index Signature

```ts
[key: string]: string | undefined
```

##### auth

```ts
readonly auth: object;
```

###### auth.basic?

```ts
optional basic: object;
```

###### auth.basic.password?

```ts
optional password: string;
```

###### auth.basic.username?

```ts
optional username: string;
```

###### auth.strategy

```ts
strategy: AuthStrategy;
```

##### backpressure

```ts
readonly backpressure: object;
```

###### backpressure.decayQuietMs

```ts
decayQuietMs: number;
```

###### backpressure.enabled

```ts
enabled: boolean;
```

###### backpressure.floor

```ts
floor: number;
```

###### backpressure.healthyRecoveryMultiplier

```ts
healthyRecoveryMultiplier: number;
```

###### backpressure.initialMax

```ts
initialMax: number;
```

###### backpressure.maxWaiters

```ts
maxWaiters: number;
```

###### backpressure.observeOnly

```ts
observeOnly: boolean;
```

###### backpressure.profile

```ts
profile: string;
```

###### backpressure.recoveryIntervalMs

```ts
recoveryIntervalMs: number;
```

###### backpressure.recoveryStep

```ts
recoveryStep: number;
```

###### backpressure.severeFactor

```ts
severeFactor: number;
```

###### backpressure.severeThreshold

```ts
severeThreshold: number;
```

###### backpressure.softFactor

```ts
softFactor: number;
```

###### backpressure.unlimitedAfterHealthyMs

```ts
unlimitedAfterHealthyMs: number;
```

##### defaultTenantId

```ts
readonly defaultTenantId: string;
```

##### eventual?

```ts
readonly optional eventual: object;
```

###### eventual.pollDefaultMs

```ts
pollDefaultMs: number;
```

##### httpRetry

```ts
readonly httpRetry: object;
```

###### httpRetry.baseDelayMs

```ts
baseDelayMs: number;
```

###### httpRetry.maxAttempts

```ts
maxAttempts: number;
```

###### httpRetry.maxDelayMs

```ts
maxDelayMs: number;
```

##### logLevel

```ts
readonly logLevel: "trace" | "error" | "silent" | "warn" | "info" | "debug";
```

##### mtls?

```ts
readonly optional mtls: object;
```

###### mtls.ca?

```ts
optional ca: string;
```

###### mtls.caPath?

```ts
optional caPath: string;
```

###### mtls.cert?

```ts
optional cert: string;
```

###### mtls.certPath?

```ts
optional certPath: string;
```

###### mtls.key?

```ts
optional key: string;
```

###### mtls.keyPassphrase?

```ts
optional keyPassphrase: string;
```

###### mtls.keyPath?

```ts
optional keyPath: string;
```

##### oauth

```ts
readonly oauth: object;
```

###### oauth.cacheDir?

```ts
optional cacheDir: string;
```

###### oauth.clientId?

```ts
optional clientId: string;
```

###### oauth.clientSecret?

```ts
optional clientSecret: string;
```

###### oauth.grantType

```ts
grantType: string;
```

###### oauth.oauthUrl

```ts
oauthUrl: string;
```

###### oauth.retry

```ts
retry: object;
```

###### oauth.retry.baseDelayMs

```ts
baseDelayMs: number;
```

###### oauth.retry.max

```ts
max: number;
```

###### oauth.scope?

```ts
optional scope: string;
```

###### oauth.timeoutMs

```ts
timeoutMs: number;
```

##### restAddress

```ts
readonly restAddress: string;
```

##### supportLog?

```ts
readonly optional supportLog: object;
```

###### supportLog.enabled

```ts
enabled: boolean;
```

###### supportLog.filePath

```ts
filePath: string;
```

##### telemetry?

```ts
readonly optional telemetry: object;
```

###### telemetry.correlation

```ts
correlation: boolean;
```

###### telemetry.log

```ts
log: boolean;
```

##### tokenAudience

```ts
readonly tokenAudience: string;
```

##### validation

```ts
readonly validation: object;
```

###### validation.raw

```ts
raw: string;
```

###### validation.req

```ts
req: ValidationMode;
```

###### validation.res

```ts
res: ValidationMode;
```

### getDecisionDefinition()

```ts
getDecisionDefinition(...a): CancelablePromise<{
  decisionDefinitionId: string;
  decisionDefinitionKey: string;
  decisionRequirementsId: string;
  decisionRequirementsKey: string;
  decisionRequirementsName: string;
  decisionRequirementsVersion: number;
  name: string;
  tenantId: string;
  version: number;
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `decisionDefinitionId`: `string`;
  `decisionDefinitionKey`: `string`;
  `decisionRequirementsId`: `string`;
  `decisionRequirementsKey`: `string`;
  `decisionRequirementsName`: `string`;
  `decisionRequirementsVersion`: `number`;
  `name`: `string`;
  `tenantId`: `string`;
  `version`: `number`;
\}\>

### getDecisionDefinitionXml()

```ts
getDecisionDefinitionXml(...a): CancelablePromise<string>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`string`\>

### getDecisionInstance()

```ts
getDecisionInstance(...a): CancelablePromise<{
  decisionDefinitionId: string;
  decisionDefinitionKey: string;
  decisionDefinitionName: string;
  decisionDefinitionType: DecisionDefinitionTypeEnum;
  decisionDefinitionVersion: number;
  decisionEvaluationInstanceKey: string;
  decisionEvaluationKey: string;
  elementInstanceKey:   | {
   [key: number]: string;
     __brand: "ElementInstanceKey";
   }
     | null;
  evaluatedInputs: object[];
  evaluationDate: string;
  evaluationFailure: string | null;
  matchedRules: object[];
  processDefinitionKey:   | {
   [key: number]: string;
     __brand: "ProcessDefinitionKey";
   }
     | null;
  processInstanceKey:   | {
   [key: number]: string;
     __brand: "ProcessInstanceKey";
   }
     | null;
  result: string;
  rootDecisionDefinitionKey: string;
  rootProcessInstanceKey:   | {
   [key: number]: string;
     __brand: "ProcessInstanceKey";
   }
     | null;
  state: DecisionInstanceStateEnum;
  tenantId: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `decisionDefinitionId`: `string`;
  `decisionDefinitionKey`: `string`;
  `decisionDefinitionName`: `string`;
  `decisionDefinitionType`: [`DecisionDefinitionTypeEnum`](../type-aliases/DecisionDefinitionTypeEnum.md);
  `decisionDefinitionVersion`: `number`;
  `decisionEvaluationInstanceKey`: `string`;
  `decisionEvaluationKey`: `string`;
  `elementInstanceKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"ElementInstanceKey"`;
   \}
     \| `null`;
  `evaluatedInputs`: `object`[];
  `evaluationDate`: `string`;
  `evaluationFailure`: `string` \| `null`;
  `matchedRules`: `object`[];
  `processDefinitionKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"ProcessDefinitionKey"`;
   \}
     \| `null`;
  `processInstanceKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"ProcessInstanceKey"`;
   \}
     \| `null`;
  `result`: `string`;
  `rootDecisionDefinitionKey`: `string`;
  `rootProcessInstanceKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"ProcessInstanceKey"`;
   \}
     \| `null`;
  `state`: [`DecisionInstanceStateEnum`](../type-aliases/DecisionInstanceStateEnum.md);
  `tenantId`: `string`;
\}\>

### getDecisionRequirements()

```ts
getDecisionRequirements(...a): CancelablePromise<{
  decisionRequirementsId: string;
  decisionRequirementsKey: string;
  decisionRequirementsName: string;
  resourceName: string;
  tenantId: string;
  version: number;
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `decisionRequirementsId`: `string`;
  `decisionRequirementsKey`: `string`;
  `decisionRequirementsName`: `string`;
  `resourceName`: `string`;
  `tenantId`: `string`;
  `version`: `number`;
\}\>

### getDecisionRequirementsXml()

```ts
getDecisionRequirementsXml(...a): CancelablePromise<string>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`string`\>

### getDocument()

```ts
getDocument(...a): CancelablePromise<{
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
\}\>

### getElementInstance()

```ts
getElementInstance(...a): CancelablePromise<{
  elementId: string;
  elementInstanceKey: string;
  elementName: string;
  endDate: string | null;
  hasIncident: boolean;
  incidentKey:   | {
   [key: number]: string;
     __brand: "IncidentKey";
   }
     | null;
  processDefinitionId: string;
  processDefinitionKey: string;
  processInstanceKey: string;
  rootProcessInstanceKey:   | {
   [key: number]: string;
     __brand: "ProcessInstanceKey";
   }
     | null;
  startDate: string;
  state: ElementInstanceStateEnum;
  tenantId: string;
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

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `elementId`: `string`;
  `elementInstanceKey`: `string`;
  `elementName`: `string`;
  `endDate`: `string` \| `null`;
  `hasIncident`: `boolean`;
  `incidentKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"IncidentKey"`;
   \}
     \| `null`;
  `processDefinitionId`: `string`;
  `processDefinitionKey`: `string`;
  `processInstanceKey`: `string`;
  `rootProcessInstanceKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"ProcessInstanceKey"`;
   \}
     \| `null`;
  `startDate`: `string`;
  `state`: [`ElementInstanceStateEnum`](../type-aliases/ElementInstanceStateEnum.md);
  `tenantId`: `string`;
  `type`:   \| `"USER_TASK"`
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

### getErrorMode()

```ts
getErrorMode(...a): "result" | "throw";
```

#### Parameters

##### a

...\[\]

#### Returns

`"result"` \| `"throw"`

### getGlobalClusterVariable()

```ts
getGlobalClusterVariable(...a): CancelablePromise<{
  name: string;
  scope: ClusterVariableScopeEnum;
  tenantId: string | null;
  value: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `name`: `string`;
  `scope`: [`ClusterVariableScopeEnum`](../type-aliases/ClusterVariableScopeEnum.md);
  `tenantId`: `string` \| `null`;
  `value`: `string`;
\}\>

### getGlobalJobStatistics()

```ts
getGlobalJobStatistics(...a): CancelablePromise<{
  completed: {
     count: number;
     lastUpdatedAt: string | null;
  };
  created: {
     count: number;
     lastUpdatedAt: string | null;
  };
  failed: {
     count: number;
     lastUpdatedAt: string | null;
  };
  isIncomplete: boolean;
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `completed`: \{
     `count`: `number`;
     `lastUpdatedAt`: `string` \| `null`;
  \};
  `created`: \{
     `count`: `number`;
     `lastUpdatedAt`: `string` \| `null`;
  \};
  `failed`: \{
     `count`: `number`;
     `lastUpdatedAt`: `string` \| `null`;
  \};
  `isIncomplete`: `boolean`;
\}\>

### getGlobalTaskListener()

```ts
getGlobalTaskListener(...a): CancelablePromise<{
  afterNonGlobal?: boolean;
  eventTypes: GlobalTaskListenerEventTypeEnum[];
  id: string;
  priority?: number;
  retries?: number;
  source: GlobalListenerSourceEnum;
  type?: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `afterNonGlobal?`: `boolean`;
  `eventTypes`: [`GlobalTaskListenerEventTypeEnum`](../type-aliases/GlobalTaskListenerEventTypeEnum.md)[];
  `id`: `string`;
  `priority?`: `number`;
  `retries?`: `number`;
  `source`: [`GlobalListenerSourceEnum`](../type-aliases/GlobalListenerSourceEnum.md);
  `type?`: `string`;
\}\>

### getGroup()

```ts
getGroup(...a): CancelablePromise<{
  description: string | null;
  groupId: string;
  name: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `description`: `string` \| `null`;
  `groupId`: `string`;
  `name`: `string`;
\}\>

### getIncident()

```ts
getIncident(...a): CancelablePromise<{
  creationTime: string;
  elementId: string;
  elementInstanceKey: string;
  errorMessage: string;
  errorType: IncidentErrorTypeEnum;
  incidentKey: string;
  jobKey:   | {
   [key: number]: string;
     __brand: "JobKey";
   }
     | null;
  processDefinitionId: string;
  processDefinitionKey: string;
  processInstanceKey: string;
  rootProcessInstanceKey:   | {
   [key: number]: string;
     __brand: "ProcessInstanceKey";
   }
     | null;
  state: IncidentStateEnum;
  tenantId: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `creationTime`: `string`;
  `elementId`: `string`;
  `elementInstanceKey`: `string`;
  `errorMessage`: `string`;
  `errorType`: [`IncidentErrorTypeEnum`](../type-aliases/IncidentErrorTypeEnum.md);
  `incidentKey`: `string`;
  `jobKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"JobKey"`;
   \}
     \| `null`;
  `processDefinitionId`: `string`;
  `processDefinitionKey`: `string`;
  `processInstanceKey`: `string`;
  `rootProcessInstanceKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"ProcessInstanceKey"`;
   \}
     \| `null`;
  `state`: [`IncidentStateEnum`](../type-aliases/IncidentStateEnum.md);
  `tenantId`: `string`;
\}\>

### getJobErrorStatistics()

```ts
getJobErrorStatistics(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### getJobTimeSeriesStatistics()

```ts
getJobTimeSeriesStatistics(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### getJobTypeStatistics()

```ts
getJobTypeStatistics(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### getJobWorkerStatistics()

```ts
getJobWorkerStatistics(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### getLicense()

```ts
getLicense(...a): CancelablePromise<{
  expiresAt: string | null;
  isCommercial: boolean;
  licenseType: string;
  validLicense: boolean;
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `expiresAt`: `string` \| `null`;
  `isCommercial`: `boolean`;
  `licenseType`: `string`;
  `validLicense`: `boolean`;
\}\>

### getMappingRule()

```ts
getMappingRule(...a): CancelablePromise<{
  claimName: string;
  claimValue: string;
  mappingRuleId: string;
  name: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `claimName`: `string`;
  `claimValue`: `string`;
  `mappingRuleId`: `string`;
  `name`: `string`;
\}\>

### getProcessDefinition()

```ts
getProcessDefinition(...a): CancelablePromise<{
  hasStartForm: boolean;
  name: string | null;
  processDefinitionId: string;
  processDefinitionKey: string;
  resourceName: string;
  tenantId: string;
  version: number;
  versionTag: string | null;
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `hasStartForm`: `boolean`;
  `name`: `string` \| `null`;
  `processDefinitionId`: `string`;
  `processDefinitionKey`: `string`;
  `resourceName`: `string`;
  `tenantId`: `string`;
  `version`: `number`;
  `versionTag`: `string` \| `null`;
\}\>

### getProcessDefinitionInstanceStatistics()

```ts
getProcessDefinitionInstanceStatistics(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### getProcessDefinitionInstanceVersionStatistics()

```ts
getProcessDefinitionInstanceVersionStatistics(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### getProcessDefinitionMessageSubscriptionStatistics()

```ts
getProcessDefinitionMessageSubscriptionStatistics(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### getProcessDefinitionStatistics()

```ts
getProcessDefinitionStatistics(...a): CancelablePromise<{
  items: object[];
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
\}\>

### getProcessDefinitionXml()

```ts
getProcessDefinitionXml(...a): CancelablePromise<string>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`string`\>

### getProcessInstance()

```ts
getProcessInstance(...a): CancelablePromise<{
  businessId:   | {
   [key: number]: string;
     __brand: "BusinessId";
   }
     | null;
  endDate: string | null;
  hasIncident: boolean;
  parentElementInstanceKey:   | {
   [key: number]: string;
     __brand: "ElementInstanceKey";
   }
     | null;
  parentProcessInstanceKey:   | {
   [key: number]: string;
     __brand: "ProcessInstanceKey";
   }
     | null;
  processDefinitionId: string;
  processDefinitionKey: string;
  processDefinitionName: string | null;
  processDefinitionVersion: number;
  processDefinitionVersionTag: string | null;
  processInstanceKey: string;
  rootProcessInstanceKey:   | {
   [key: number]: string;
     __brand: "ProcessInstanceKey";
   }
     | null;
  startDate: string;
  state: ProcessInstanceStateEnum;
  tags: string[];
  tenantId: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `businessId`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"BusinessId"`;
   \}
     \| `null`;
  `endDate`: `string` \| `null`;
  `hasIncident`: `boolean`;
  `parentElementInstanceKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"ElementInstanceKey"`;
   \}
     \| `null`;
  `parentProcessInstanceKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"ProcessInstanceKey"`;
   \}
     \| `null`;
  `processDefinitionId`: `string`;
  `processDefinitionKey`: `string`;
  `processDefinitionName`: `string` \| `null`;
  `processDefinitionVersion`: `number`;
  `processDefinitionVersionTag`: `string` \| `null`;
  `processInstanceKey`: `string`;
  `rootProcessInstanceKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"ProcessInstanceKey"`;
   \}
     \| `null`;
  `startDate`: `string`;
  `state`: [`ProcessInstanceStateEnum`](../type-aliases/ProcessInstanceStateEnum.md);
  `tags`: `string`[];
  `tenantId`: `string`;
\}\>

### getProcessInstanceCallHierarchy()

```ts
getProcessInstanceCallHierarchy(...a): CancelablePromise<object[]>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`object`[]\>

### getProcessInstanceSequenceFlows()

```ts
getProcessInstanceSequenceFlows(...a): CancelablePromise<{
  items: object[];
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
\}\>

### getProcessInstanceStatistics()

```ts
getProcessInstanceStatistics(...a): CancelablePromise<{
  items: object[];
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
\}\>

### getProcessInstanceStatisticsByDefinition()

```ts
getProcessInstanceStatisticsByDefinition(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### getProcessInstanceStatisticsByError()

```ts
getProcessInstanceStatisticsByError(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### getResource()

```ts
getResource(...a): CancelablePromise<{
  resourceId: string;
  resourceKey: string;
  resourceName: string;
  tenantId: string;
  version: number;
  versionTag: string | null;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `resourceId`: `string`;
  `resourceKey`: `string`;
  `resourceName`: `string`;
  `tenantId`: `string`;
  `version`: `number`;
  `versionTag`: `string` \| `null`;
\}\>

### getResourceContent()

```ts
getResourceContent(...a): CancelablePromise<string>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`string`\>

### getRole()

```ts
getRole(...a): CancelablePromise<{
  description: string | null;
  name: string;
  roleId: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `description`: `string` \| `null`;
  `name`: `string`;
  `roleId`: `string`;
\}\>

### getStartProcessForm()

```ts
getStartProcessForm(...a): CancelablePromise<
  | void
  | {
  formId: string;
  formKey: string;
  schema: string;
  tenantId: string;
  version: number;
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<
  \| `void`
  \| \{
  `formId`: `string`;
  `formKey`: `string`;
  `schema`: `string`;
  `tenantId`: `string`;
  `version`: `number`;
\}\>

### getStatus()

```ts
getStatus(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### getSystemConfiguration()

```ts
getSystemConfiguration(...a): CancelablePromise<{
  jobMetrics: {
     enabled: boolean;
     exportInterval: string;
     maxJobTypeLength: number;
     maxTenantIdLength: number;
     maxUniqueKeys: number;
     maxWorkerNameLength: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `jobMetrics`: \{
     `enabled`: `boolean`;
     `exportInterval`: `string`;
     `maxJobTypeLength`: `number`;
     `maxTenantIdLength`: `number`;
     `maxUniqueKeys`: `number`;
     `maxWorkerNameLength`: `number`;
  \};
\}\>

### getTenant()

```ts
getTenant(...a): CancelablePromise<{
  description: string | null;
  name: string;
  tenantId: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `description`: `string` \| `null`;
  `name`: `string`;
  `tenantId`: `string`;
\}\>

### getTenantClusterVariable()

```ts
getTenantClusterVariable(...a): CancelablePromise<{
  name: string;
  scope: ClusterVariableScopeEnum;
  tenantId: string | null;
  value: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `name`: `string`;
  `scope`: [`ClusterVariableScopeEnum`](../type-aliases/ClusterVariableScopeEnum.md);
  `tenantId`: `string` \| `null`;
  `value`: `string`;
\}\>

### getTopology()

```ts
getTopology(...a): CancelablePromise<{
  brokers: object[];
  clusterId: string | null;
  clusterSize: number;
  gatewayVersion: string;
  lastCompletedChangeId: string;
  partitionsCount: number;
  replicationFactor: number;
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `brokers`: `object`[];
  `clusterId`: `string` \| `null`;
  `clusterSize`: `number`;
  `gatewayVersion`: `string`;
  `lastCompletedChangeId`: `string`;
  `partitionsCount`: `number`;
  `replicationFactor`: `number`;
\}\>

### getUsageMetrics()

```ts
getUsageMetrics(...a): CancelablePromise<{
  activeTenants: number;
  assignees: number;
  decisionInstances: number;
  processInstances: number;
  tenants: {
   [key: string]: object;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `activeTenants`: `number`;
  `assignees`: `number`;
  `decisionInstances`: `number`;
  `processInstances`: `number`;
  `tenants`: \{
   \[`key`: `string`\]: `object`;
  \};
\}\>

### getUser()

```ts
getUser(...a): CancelablePromise<{
  email: string | null;
  name: string | null;
  username: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `email`: `string` \| `null`;
  `name`: `string` \| `null`;
  `username`: `string`;
\}\>

### getUserTask()

```ts
getUserTask(...a): CancelablePromise<{
  assignee: string | null;
  candidateGroups: string[];
  candidateUsers: string[];
  completionDate: string | null;
  creationDate: string;
  customHeaders: {
   [key: string]: string;
  };
  dueDate: string | null;
  elementId: string;
  elementInstanceKey: string;
  externalFormReference: string | null;
  followUpDate: string | null;
  formKey:   | {
   [key: number]: string;
     __brand: "FormKey";
   }
     | null;
  name: string | null;
  priority: number;
  processDefinitionId: string;
  processDefinitionKey: string;
  processDefinitionVersion: number;
  processInstanceKey: string;
  processName: string | null;
  rootProcessInstanceKey:   | {
   [key: number]: string;
     __brand: "ProcessInstanceKey";
   }
     | null;
  state: UserTaskStateEnum;
  tags: string[];
  tenantId: string;
  userTaskKey: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `assignee`: `string` \| `null`;
  `candidateGroups`: `string`[];
  `candidateUsers`: `string`[];
  `completionDate`: `string` \| `null`;
  `creationDate`: `string`;
  `customHeaders`: \{
   \[`key`: `string`\]: `string`;
  \};
  `dueDate`: `string` \| `null`;
  `elementId`: `string`;
  `elementInstanceKey`: `string`;
  `externalFormReference`: `string` \| `null`;
  `followUpDate`: `string` \| `null`;
  `formKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"FormKey"`;
   \}
     \| `null`;
  `name`: `string` \| `null`;
  `priority`: `number`;
  `processDefinitionId`: `string`;
  `processDefinitionKey`: `string`;
  `processDefinitionVersion`: `number`;
  `processInstanceKey`: `string`;
  `processName`: `string` \| `null`;
  `rootProcessInstanceKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"ProcessInstanceKey"`;
   \}
     \| `null`;
  `state`: [`UserTaskStateEnum`](../type-aliases/UserTaskStateEnum.md);
  `tags`: `string`[];
  `tenantId`: `string`;
  `userTaskKey`: `string`;
\}\>

### getUserTaskForm()

```ts
getUserTaskForm(...a): CancelablePromise<
  | void
  | {
  formId: string;
  formKey: string;
  schema: string;
  tenantId: string;
  version: number;
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<
  \| `void`
  \| \{
  `formId`: `string`;
  `formKey`: `string`;
  `schema`: `string`;
  `tenantId`: `string`;
  `version`: `number`;
\}\>

### getVariable()

```ts
getVariable(...a): CancelablePromise<{
  name: string;
  processInstanceKey: string;
  rootProcessInstanceKey:   | {
   [key: number]: string;
     __brand: "ProcessInstanceKey";
   }
     | null;
  scopeKey: string;
  tenantId: string;
  value: string;
  variableKey: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `name`: `string`;
  `processInstanceKey`: `string`;
  `rootProcessInstanceKey`:   \| \{
   \[`key`: `number`\]: `string`;
     `__brand`: `"ProcessInstanceKey"`;
   \}
     \| `null`;
  `scopeKey`: `string`;
  `tenantId`: `string`;
  `value`: `string`;
  `variableKey`: `string`;
\}\>

### getWorkers()

```ts
getWorkers(...a): any[];
```

#### Parameters

##### a

...\[\]

#### Returns

`any`[]

### logger()

```ts
logger(...a): object;
```

#### Parameters

##### a

...\[`string`\]

#### Returns

`object`

##### code()

```ts
code(...a): void;
```

###### Parameters

###### a

...\[[`LogLevel`](../../logger/type-aliases/LogLevel.md), `string`, `string`, `any`\]

###### Returns

`void`

##### debug()

```ts
debug(...a): void;
```

###### Parameters

###### a

...`any`[]

###### Returns

`void`

##### error()

```ts
error(...a): void;
```

###### Parameters

###### a

...`any`[]

###### Returns

`void`

##### info()

```ts
info(...a): void;
```

###### Parameters

###### a

...`any`[]

###### Returns

`void`

##### level()

```ts
level(...a): LogLevel;
```

###### Parameters

###### a

...\[\]

###### Returns

[`LogLevel`](../../logger/type-aliases/LogLevel.md)

##### scope()

```ts
scope(...a): { level: () => LogLevel; setLevel: (level: LogLevel) => void; setTransport: (t?: ((e: { level: LogLevel; scope: string; ts: number; args: any[]; code?: string | undefined; data?: any; }) => void) | undefined) => void; ... 7 more ...; code: (level: LogLevel, code: string, msg: string, data?: any) => void; };
```

###### Parameters

###### a

...\[`string`\]

###### Returns

\{ level: () =\> LogLevel; setLevel: (level: LogLevel) =\> void; setTransport: (t?: ((e: \{ level: LogLevel; scope: string; ts: number; args: any\[\]; code?: string \| undefined; data?: any; \}) =\> void) \| undefined) =\> void; ... 7 more ...; code: (level: LogLevel, code: string, msg: string, data?: any) =\> void; \}

##### setLevel()

```ts
setLevel(...a): void;
```

###### Parameters

###### a

...\[[`LogLevel`](../../logger/type-aliases/LogLevel.md)\]

###### Returns

`void`

##### setTransport()

```ts
setTransport(...a): void;
```

###### Parameters

###### a

...\[(...`a`) => `void`\]

###### Returns

`void`

##### silly()

```ts
silly(...a): void;
```

###### Parameters

###### a

...`any`[]

###### Returns

`void`

##### trace()

```ts
trace(...a): void;
```

###### Parameters

###### a

...`any`[]

###### Returns

`void`

##### warn()

```ts
warn(...a): void;
```

###### Parameters

###### a

...`any`[]

###### Returns

`void`

### migrateProcessInstance()

```ts
migrateProcessInstance(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### migrateProcessInstancesBatchOperation()

```ts
migrateProcessInstancesBatchOperation(...a): CancelablePromise<{
  batchOperationKey: string;
  batchOperationType: BatchOperationTypeEnum;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `batchOperationKey`: `string`;
  `batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>

### modifyProcessInstance()

```ts
modifyProcessInstance(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### modifyProcessInstancesBatchOperation()

```ts
modifyProcessInstancesBatchOperation(...a): CancelablePromise<{
  batchOperationKey: string;
  batchOperationType: BatchOperationTypeEnum;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `batchOperationKey`: `string`;
  `batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>

### onAuthHeaders()

```ts
onAuthHeaders(...a): void;
```

#### Parameters

##### a

...\[(...`a`) => 
  \| `Promise`\<\{
\[`key`: `string`\]: `string`;
\}\>
  \| \{
\[`key`: `string`\]: `string`;
\}\]

#### Returns

`void`

### pinClock()

```ts
pinClock(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### publishMessage()

```ts
publishMessage(...a): CancelablePromise<{
  messageKey: string;
  tenantId: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `messageKey`: `string`;
  `tenantId`: `string`;
\}\>

### resetClock()

```ts
resetClock(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### resolveIncident()

```ts
resolveIncident(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### resolveIncidentsBatchOperation()

```ts
resolveIncidentsBatchOperation(...a): CancelablePromise<{
  batchOperationKey: string;
  batchOperationType: BatchOperationTypeEnum;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `batchOperationKey`: `string`;
  `batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>

### resolveProcessInstanceIncidents()

```ts
resolveProcessInstanceIncidents(...a): CancelablePromise<{
  batchOperationKey: string;
  batchOperationType: BatchOperationTypeEnum;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `batchOperationKey`: `string`;
  `batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>

### resumeBatchOperation()

```ts
resumeBatchOperation(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### searchAuditLogs()

```ts
searchAuditLogs(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchAuthorizations()

```ts
searchAuthorizations(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchBatchOperationItems()

```ts
searchBatchOperationItems(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchBatchOperations()

```ts
searchBatchOperations(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchClientsForGroup()

```ts
searchClientsForGroup(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchClientsForRole()

```ts
searchClientsForRole(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchClientsForTenant()

```ts
searchClientsForTenant(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchClusterVariables()

```ts
searchClusterVariables(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchCorrelatedMessageSubscriptions()

```ts
searchCorrelatedMessageSubscriptions(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchDecisionDefinitions()

```ts
searchDecisionDefinitions(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchDecisionInstances()

```ts
searchDecisionInstances(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchDecisionRequirements()

```ts
searchDecisionRequirements(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchElementInstanceIncidents()

```ts
searchElementInstanceIncidents(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchElementInstances()

```ts
searchElementInstances(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchGlobalTaskListeners()

```ts
searchGlobalTaskListeners(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchGroupIdsForTenant()

```ts
searchGroupIdsForTenant(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchGroups()

```ts
searchGroups(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchGroupsForRole()

```ts
searchGroupsForRole(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchIncidents()

```ts
searchIncidents(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchJobs()

```ts
searchJobs(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchMappingRule()

```ts
searchMappingRule(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchMappingRulesForGroup()

```ts
searchMappingRulesForGroup(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchMappingRulesForRole()

```ts
searchMappingRulesForRole(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchMappingRulesForTenant()

```ts
searchMappingRulesForTenant(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchMessageSubscriptions()

```ts
searchMessageSubscriptions(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchProcessDefinitions()

```ts
searchProcessDefinitions(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchProcessInstanceIncidents()

```ts
searchProcessInstanceIncidents(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchProcessInstances()

```ts
searchProcessInstances(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchRoles()

```ts
searchRoles(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchRolesForGroup()

```ts
searchRolesForGroup(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchRolesForTenant()

```ts
searchRolesForTenant(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchTenants()

```ts
searchTenants(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchUsers()

```ts
searchUsers(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchUsersForGroup()

```ts
searchUsersForGroup(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchUsersForRole()

```ts
searchUsersForRole(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchUsersForTenant()

```ts
searchUsersForTenant(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchUserTaskAuditLogs()

```ts
searchUserTaskAuditLogs(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchUserTasks()

```ts
searchUserTasks(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchUserTaskVariables()

```ts
searchUserTaskVariables(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### searchVariables()

```ts
searchVariables(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor:   | {
      [key: number]: string;
        __brand: "EndCursor";
      }
        | null;
     hasMoreTotalItems: boolean;
     startCursor:   | {
      [key: number]: string;
        __brand: "StartCursor";
      }
        | null;
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `items`: `object`[];
  `page`: \{
     `endCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"EndCursor"`;
      \}
        \| `null`;
     `hasMoreTotalItems`: `boolean`;
     `startCursor`:   \| \{
      \[`key`: `number`\]: `string`;
        `__brand`: `"StartCursor"`;
      \}
        \| `null`;
     `totalItems`: `number`;
  \};
\}\>

### stopAllWorkers()

```ts
stopAllWorkers(...a): void;
```

#### Parameters

##### a

...\[\]

#### Returns

`void`

### suspendBatchOperation()

```ts
suspendBatchOperation(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### throwJobError()

```ts
throwJobError(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignClientFromGroup()

```ts
unassignClientFromGroup(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignClientFromTenant()

```ts
unassignClientFromTenant(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignGroupFromTenant()

```ts
unassignGroupFromTenant(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignMappingRuleFromGroup()

```ts
unassignMappingRuleFromGroup(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignMappingRuleFromTenant()

```ts
unassignMappingRuleFromTenant(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignRoleFromClient()

```ts
unassignRoleFromClient(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignRoleFromGroup()

```ts
unassignRoleFromGroup(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignRoleFromMappingRule()

```ts
unassignRoleFromMappingRule(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignRoleFromTenant()

```ts
unassignRoleFromTenant(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignRoleFromUser()

```ts
unassignRoleFromUser(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignUserFromGroup()

```ts
unassignUserFromGroup(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignUserFromTenant()

```ts
unassignUserFromTenant(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignUserTask()

```ts
unassignUserTask(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### updateAuthorization()

```ts
updateAuthorization(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[
  \| \{
  `authorizationKey`: `string`;
  `ownerId`: `string`;
  `ownerType`: [`OwnerTypeEnum`](../type-aliases/OwnerTypeEnum.md);
  `permissionTypes`: [`PermissionTypeEnum`](../type-aliases/PermissionTypeEnum.md)[];
  `resourceId`: `string`;
  `resourceType`: [`ResourceTypeEnum`](../type-aliases/ResourceTypeEnum.md);
\}
  \| \{
  `authorizationKey`: `string`;
  `ownerId`: `string`;
  `ownerType`: [`OwnerTypeEnum`](../type-aliases/OwnerTypeEnum.md);
  `permissionTypes`: [`PermissionTypeEnum`](../type-aliases/PermissionTypeEnum.md)[];
  `resourcePropertyName`: `string`;
  `resourceType`: [`ResourceTypeEnum`](../type-aliases/ResourceTypeEnum.md);
\}, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### updateGlobalClusterVariable()

```ts
updateGlobalClusterVariable(...a): CancelablePromise<{
  name: string;
  scope: ClusterVariableScopeEnum;
  tenantId: string | null;
  value: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `name`: `string`;
  `scope`: [`ClusterVariableScopeEnum`](../type-aliases/ClusterVariableScopeEnum.md);
  `tenantId`: `string` \| `null`;
  `value`: `string`;
\}\>

### updateGlobalTaskListener()

```ts
updateGlobalTaskListener(...a): CancelablePromise<{
  afterNonGlobal?: boolean;
  eventTypes: GlobalTaskListenerEventTypeEnum[];
  id: string;
  priority?: number;
  retries?: number;
  source: GlobalListenerSourceEnum;
  type?: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `afterNonGlobal?`: `boolean`;
  `eventTypes`: [`GlobalTaskListenerEventTypeEnum`](../type-aliases/GlobalTaskListenerEventTypeEnum.md)[];
  `id`: `string`;
  `priority?`: `number`;
  `retries?`: `number`;
  `source`: [`GlobalListenerSourceEnum`](../type-aliases/GlobalListenerSourceEnum.md);
  `type?`: `string`;
\}\>

### updateGroup()

```ts
updateGroup(...a): CancelablePromise<{
  description: string | null;
  groupId: string;
  name: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `description`: `string` \| `null`;
  `groupId`: `string`;
  `name`: `string`;
\}\>

### updateJob()

```ts
updateJob(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### updateMappingRule()

```ts
updateMappingRule(...a): CancelablePromise<{
  claimName: string;
  claimValue: string;
  mappingRuleId: string;
  name: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `claimName`: `string`;
  `claimValue`: `string`;
  `mappingRuleId`: `string`;
  `name`: `string`;
\}\>

### updateRole()

```ts
updateRole(...a): CancelablePromise<{
  description: string | null;
  name: string;
  roleId: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `description`: `string` \| `null`;
  `name`: `string`;
  `roleId`: `string`;
\}\>

### updateTenant()

```ts
updateTenant(...a): CancelablePromise<{
  description: string | null;
  name: string;
  tenantId: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `description`: `string` \| `null`;
  `name`: `string`;
  `tenantId`: `string`;
\}\>

### updateTenantClusterVariable()

```ts
updateTenantClusterVariable(...a): CancelablePromise<{
  name: string;
  scope: ClusterVariableScopeEnum;
  tenantId: string | null;
  value: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `name`: `string`;
  `scope`: [`ClusterVariableScopeEnum`](../type-aliases/ClusterVariableScopeEnum.md);
  `tenantId`: `string` \| `null`;
  `value`: `string`;
\}\>

### updateUser()

```ts
updateUser(...a): CancelablePromise<{
  email: string | null;
  name: string | null;
  username: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
  `email`: `string` \| `null`;
  `name`: `string` \| `null`;
  `username`: `string`;
\}\>

### updateUserTask()

```ts
updateUserTask(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### withCorrelation()

```ts
withCorrelation(...a): Promise<unknown>;
```

#### Parameters

##### a

...\[`string`, (...`a`) => `unknown`\]

#### Returns

`Promise`\<`unknown`\>
