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

Defined in: [loose.ts:43](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/loose.ts#L43)

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

#### config.backpressure.initialMax

```ts
initialMax: number;
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

...\[`object`\]

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

...\[`object`\]

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

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### assignClientToTenant()

```ts
assignClientToTenant(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### assignGroupToTenant()

```ts
assignGroupToTenant(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### assignMappingRuleToGroup()

```ts
assignMappingRuleToGroup(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### assignMappingRuleToTenant()

```ts
assignMappingRuleToTenant(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### assignRoleToClient()

```ts
assignRoleToClient(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### assignRoleToGroup()

```ts
assignRoleToGroup(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### assignRoleToMappingRule()

```ts
assignRoleToMappingRule(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### assignRoleToTenant()

```ts
assignRoleToTenant(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### assignRoleToUser()

```ts
assignRoleToUser(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### assignUserTask()

```ts
assignUserTask(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### assignUserToGroup()

```ts
assignUserToGroup(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### assignUserToTenant()

```ts
assignUserToTenant(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

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

...\[`object`\]

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

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### cancelProcessInstancesBatchOperation()

```ts
cancelProcessInstancesBatchOperation(...a): CancelablePromise<{
  batchOperationKey?: {
   [key: number]: string;
     __brand: "BatchOperationKey";
  };
  batchOperationType?: BatchOperationTypeEnum;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"BatchOperationKey"`;
\};
`batchOperationType?`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
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

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### completeUserTask()

```ts
completeUserTask(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

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
  messageKey?: {
   [key: number]: string;
     __brand: "MessageKey";
  };
  processInstanceKey?: {
   [key: number]: string;
     __brand: "ProcessInstanceKey";
  };
  tenantId?: {
   [key: number]: string;
     __brand: "TenantId";
  };
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`messageKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"MessageKey"`;
\};
`processInstanceKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\};
`tenantId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"TenantId"`;
\};
\}\>

### createAdminUser()

```ts
createAdminUser(...a): CancelablePromise<{
  email?: string;
  name?: string;
  username?: {
   [key: number]: string;
     __brand: "Username";
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`email?`: `string`;
`name?`: `string`;
`username?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"Username"`;
\};
\}\>

### createAuthorization()

```ts
createAuthorization(...a): CancelablePromise<{
  authorizationKey?: {
   [key: number]: string;
     __brand: "AuthorizationKey";
  };
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
\}\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`authorizationKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"AuthorizationKey"`;
\};
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

...\[`object`\]

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
  camunda.document.type?: "camunda";
  contentHash?: string;
  documentId?: {
   [key: number]: string;
     __brand: "DocumentId";
  };
  metadata?: {
     contentType?: string;
     customProperties?: {
      [key: string]: unknown;
     };
     expiresAt?: string;
     fileName?: string;
     processDefinitionId?: {
      [key: number]: string;
        __brand: "ProcessDefinitionId";
     };
     processInstanceKey?: {
      [key: number]: string;
        __brand: "ProcessInstanceKey";
     };
     size?: number;
  };
  storeId?: string;
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`camunda.document.type?`: `"camunda"`;
`contentHash?`: `string`;
`documentId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"DocumentId"`;
\};
`metadata?`: \{
`contentType?`: `string`;
`customProperties?`: \{
\[`key`: `string`\]: `unknown`;
\};
`expiresAt?`: `string`;
`fileName?`: `string`;
`processDefinitionId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessDefinitionId"`;
\};
`processInstanceKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\};
`size?`: `number`;
\};
`storeId?`: `string`;
\}\>

### createDocumentLink()

```ts
createDocumentLink(...a): CancelablePromise<{
  expiresAt?: string;
  url?: string;
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`expiresAt?`: `string`;
`url?`: `string`;
\}\>

### createDocuments()

```ts
createDocuments(...a): CancelablePromise<{
  createdDocuments?: object[];
  failedDocuments?: object[];
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`createdDocuments?`: `object`[];
`failedDocuments?`: `object`[];
\}\>

### createElementInstanceVariables()

```ts
createElementInstanceVariables(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### createGlobalClusterVariable()

```ts
createGlobalClusterVariable(...a): CancelablePromise<{
  name: string;
  scope: ClusterVariableScopeEnum;
  tenantId?: string;
  value?: string;
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`name`: `string`;
`scope`: [`ClusterVariableScopeEnum`](../type-aliases/ClusterVariableScopeEnum.md);
`tenantId?`: `string`;
`value?`: `string`;
\}\>

### createGroup()

```ts
createGroup(...a): CancelablePromise<{
  description?: string;
  groupId?: string;
  name?: string;
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description?`: `string`;
`groupId?`: `string`;
`name?`: `string`;
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
  claimName?: string;
  claimValue?: string;
  mappingRuleId?: string;
  name?: string;
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`claimName?`: `string`;
`claimValue?`: `string`;
`mappingRuleId?`: `string`;
`name?`: `string`;
\}\>

### createProcessInstance()

```ts
createProcessInstance(...a): CancelablePromise<{
  processDefinitionId: string;
  processDefinitionKey: string;
  processDefinitionVersion: number;
  processInstanceKey: string;
  tags?: string[];
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
\}
\| \{
`awaitCompletion?`: `boolean`;
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
\}\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`processDefinitionId`: `string`;
`processDefinitionKey`: `string`;
`processDefinitionVersion`: `number`;
`processInstanceKey`: `string`;
`tags?`: `string`[];
`tenantId`: `string`;
`variables`: \{
\[`key`: `string`\]: `unknown`;
\};
\}\>

### createRole()

```ts
createRole(...a): CancelablePromise<{
  description?: string;
  name?: string;
  roleId?: string;
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description?`: `string`;
`name?`: `string`;
`roleId?`: `string`;
\}\>

### createTenant()

```ts
createTenant(...a): CancelablePromise<{
  description?: string;
  name?: string;
  tenantId?: {
   [key: number]: string;
     __brand: "TenantId";
  };
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description?`: `string`;
`name?`: `string`;
`tenantId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"TenantId"`;
\};
\}\>

### createTenantClusterVariable()

```ts
createTenantClusterVariable(...a): CancelablePromise<{
  name: string;
  scope: ClusterVariableScopeEnum;
  tenantId?: string;
  value?: string;
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`name`: `string`;
`scope`: [`ClusterVariableScopeEnum`](../type-aliases/ClusterVariableScopeEnum.md);
`tenantId?`: `string`;
`value?`: `string`;
\}\>

### createUser()

```ts
createUser(...a): CancelablePromise<{
  email?: string;
  name?: string;
  username?: {
   [key: number]: string;
     __brand: "Username";
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`email?`: `string`;
`name?`: `string`;
`username?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"Username"`;
\};
\}\>

### deleteAuthorization()

```ts
deleteAuthorization(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

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
  batchOperationKey?: {
   [key: number]: string;
     __brand: "BatchOperationKey";
  };
  batchOperationType?: BatchOperationTypeEnum;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"BatchOperationKey"`;
\};
`batchOperationType?`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>

### deleteDocument()

```ts
deleteDocument(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### deleteGlobalClusterVariable()

```ts
deleteGlobalClusterVariable(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### deleteGroup()

```ts
deleteGroup(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### deleteMappingRule()

```ts
deleteMappingRule(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

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
  batchOperationKey?: {
   [key: number]: string;
     __brand: "BatchOperationKey";
  };
  batchOperationType?: BatchOperationTypeEnum;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"BatchOperationKey"`;
\};
`batchOperationType?`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>

### deleteResource()

```ts
deleteResource(...a): CancelablePromise<{
  batchOperation?: {
     batchOperationKey?: {
      [key: number]: string;
        __brand: "BatchOperationKey";
     };
     batchOperationType?: BatchOperationTypeEnum;
  };
  resourceKey: string;
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperation?`: \{
`batchOperationKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"BatchOperationKey"`;
\};
`batchOperationType?`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\};
`resourceKey`: `string`;
\}\>

### deleteRole()

```ts
deleteRole(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### deleteTenant()

```ts
deleteTenant(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### deleteTenantClusterVariable()

```ts
deleteTenantClusterVariable(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

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

...\[`object`\]

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
  decisionInstanceKey?: {
   [key: number]: string;
     __brand: "DecisionInstanceKey";
  };
  decisionRequirementsId: string;
  decisionRequirementsKey: string;
  evaluatedDecisions: object[];
  failedDecisionDefinitionId: string;
  failureMessage: string;
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
\}\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`decisionDefinitionId`: `string`;
`decisionDefinitionKey`: `string`;
`decisionDefinitionName`: `string`;
`decisionDefinitionVersion`: `number`;
`decisionEvaluationKey`: `string`;
`decisionInstanceKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"DecisionInstanceKey"`;
\};
`decisionRequirementsId`: `string`;
`decisionRequirementsKey`: `string`;
`evaluatedDecisions`: `object`[];
`failedDecisionDefinitionId`: `string`;
`failureMessage`: `string`;
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

...\[`object`\]

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

...\[`object`\]

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
  actorId?: string;
  actorType?: AuditLogActorTypeEnum;
  annotation?: string;
  auditLogKey?: {
   [key: number]: string;
     __brand: "AuditLogKey";
  };
  batchOperationKey?: {
   [key: number]: string;
     __brand: "BatchOperationKey";
  };
  batchOperationType?: BatchOperationTypeEnum;
  category?: AuditLogCategoryEnum;
  decisionDefinitionId?: {
   [key: number]: string;
     __brand: "DecisionDefinitionId";
  };
  decisionDefinitionKey?: {
   [key: number]: string;
     __brand: "DecisionDefinitionKey";
  };
  decisionEvaluationKey?: {
   [key: number]: string;
     __brand: "DecisionEvaluationKey";
  };
  decisionRequirementsId?: string;
  decisionRequirementsKey?: {
   [key: number]: string;
     __brand: "DecisionRequirementsKey";
  };
  deploymentKey?: {
   [key: number]: string;
     __brand: "DeploymentKey";
  };
  elementInstanceKey?: {
   [key: number]: string;
     __brand: "ElementInstanceKey";
  };
  entityDescription?: string;
  entityKey?: {
   [key: number]: string;
     __brand: "AuditLogEntityKey";
  };
  entityType?: AuditLogEntityTypeEnum;
  formKey?: {
   [key: number]: string;
     __brand: "FormKey";
  };
  jobKey?: {
   [key: number]: string;
     __brand: "JobKey";
  };
  operationType?: AuditLogOperationTypeEnum;
  processDefinitionId?: {
   [key: number]: string;
     __brand: "ProcessDefinitionId";
  };
  processDefinitionKey?: {
   [key: number]: string;
     __brand: "ProcessDefinitionKey";
  };
  processInstanceKey?: {
   [key: number]: string;
     __brand: "ProcessInstanceKey";
  };
  relatedEntityKey?: {
   [key: number]: string;
     __brand: "AuditLogEntityKey";
  };
  relatedEntityType?: AuditLogEntityTypeEnum;
  resourceKey?:   | {
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
   };
  result?: AuditLogResultEnum;
  rootProcessInstanceKey?: {
   [key: number]: string;
     __brand: "ProcessInstanceKey";
  };
  tenantId?: {
   [key: number]: string;
     __brand: "TenantId";
  };
  timestamp?: string;
  userTaskKey?: {
   [key: number]: string;
     __brand: "UserTaskKey";
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`actorId?`: `string`;
`actorType?`: [`AuditLogActorTypeEnum`](../type-aliases/AuditLogActorTypeEnum.md);
`annotation?`: `string`;
`auditLogKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"AuditLogKey"`;
\};
`batchOperationKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"BatchOperationKey"`;
\};
`batchOperationType?`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
`category?`: [`AuditLogCategoryEnum`](../type-aliases/AuditLogCategoryEnum.md);
`decisionDefinitionId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"DecisionDefinitionId"`;
\};
`decisionDefinitionKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"DecisionDefinitionKey"`;
\};
`decisionEvaluationKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"DecisionEvaluationKey"`;
\};
`decisionRequirementsId?`: `string`;
`decisionRequirementsKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"DecisionRequirementsKey"`;
\};
`deploymentKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"DeploymentKey"`;
\};
`elementInstanceKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ElementInstanceKey"`;
\};
`entityDescription?`: `string`;
`entityKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"AuditLogEntityKey"`;
\};
`entityType?`: [`AuditLogEntityTypeEnum`](../type-aliases/AuditLogEntityTypeEnum.md);
`formKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"FormKey"`;
\};
`jobKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"JobKey"`;
\};
`operationType?`: [`AuditLogOperationTypeEnum`](../type-aliases/AuditLogOperationTypeEnum.md);
`processDefinitionId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessDefinitionId"`;
\};
`processDefinitionKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessDefinitionKey"`;
\};
`processInstanceKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\};
`relatedEntityKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"AuditLogEntityKey"`;
\};
`relatedEntityType?`: [`AuditLogEntityTypeEnum`](../type-aliases/AuditLogEntityTypeEnum.md);
`resourceKey?`: \| \{
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
\};
`result?`: [`AuditLogResultEnum`](../type-aliases/AuditLogResultEnum.md);
`rootProcessInstanceKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\};
`tenantId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"TenantId"`;
\};
`timestamp?`: `string`;
`userTaskKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"UserTaskKey"`;
\};
\}\>

### getAuthentication()

```ts
getAuthentication(...a): CancelablePromise<{
  authorizedComponents?: string[];
  c8Links: {
   [key: string]: string;
  };
  canLogout: boolean;
  displayName?: string | null;
  email?: string | null;
  groups: string[];
  roles: string[];
  salesPlanType: string;
  tenants: object[];
  username?:   | {
   [key: number]: string;
     __brand: "Username";
   }
     | null;
}>;
```

#### Parameters

##### a

...\[\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`authorizedComponents?`: `string`[];
`c8Links`: \{
\[`key`: `string`\]: `string`;
\};
`canLogout`: `boolean`;
`displayName?`: `string` \| `null`;
`email?`: `string` \| `null`;
`groups`: `string`[];
`roles`: `string`[];
`salesPlanType`: `string`;
`tenants`: `object`[];
`username?`: \| \{
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
  authorizationKey?: {
   [key: number]: string;
     __brand: "AuthorizationKey";
  };
  ownerId?: string;
  ownerType?: OwnerTypeEnum;
  permissionTypes?: PermissionTypeEnum[];
  resourceId?: string;
  resourcePropertyName?: string;
  resourceType?: ResourceTypeEnum;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`authorizationKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"AuthorizationKey"`;
\};
`ownerId?`: `string`;
`ownerType?`: [`OwnerTypeEnum`](../type-aliases/OwnerTypeEnum.md);
`permissionTypes?`: [`PermissionTypeEnum`](../type-aliases/PermissionTypeEnum.md)[];
`resourceId?`: `string`;
`resourcePropertyName?`: `string`;
`resourceType?`: [`ResourceTypeEnum`](../type-aliases/ResourceTypeEnum.md);
\}\>

### getBackpressureState()

```ts
getBackpressureState(...a):
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

#### Parameters

##### a

...\[\]

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

### getBatchOperation()

```ts
getBatchOperation(...a): CancelablePromise<{
  actorId?: string;
  actorType?: AuditLogActorTypeEnum;
  batchOperationKey?: {
   [key: number]: string;
     __brand: "BatchOperationKey";
  };
  batchOperationType?: BatchOperationTypeEnum;
  endDate?: string;
  errors?: object[];
  operationsCompletedCount?: number;
  operationsFailedCount?: number;
  operationsTotalCount?: number;
  startDate?: string;
  state?: BatchOperationStateEnum;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`actorId?`: `string`;
`actorType?`: [`AuditLogActorTypeEnum`](../type-aliases/AuditLogActorTypeEnum.md);
`batchOperationKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"BatchOperationKey"`;
\};
`batchOperationType?`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
`endDate?`: `string`;
`errors?`: `object`[];
`operationsCompletedCount?`: `number`;
`operationsFailedCount?`: `number`;
`operationsTotalCount?`: `number`;
`startDate?`: `string`;
`state?`: [`BatchOperationStateEnum`](../type-aliases/BatchOperationStateEnum.md);
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

###### backpressure.initialMax

```ts
initialMax: number;
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
  decisionDefinitionId?: {
   [key: number]: string;
     __brand: "DecisionDefinitionId";
  };
  decisionDefinitionKey?: {
   [key: number]: string;
     __brand: "DecisionDefinitionKey";
  };
  decisionRequirementsId?: string;
  decisionRequirementsKey?: {
   [key: number]: string;
     __brand: "DecisionRequirementsKey";
  };
  decisionRequirementsName?: string;
  decisionRequirementsVersion?: number;
  name?: string;
  tenantId?: {
   [key: number]: string;
     __brand: "TenantId";
  };
  version?: number;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`decisionDefinitionId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"DecisionDefinitionId"`;
\};
`decisionDefinitionKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"DecisionDefinitionKey"`;
\};
`decisionRequirementsId?`: `string`;
`decisionRequirementsKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"DecisionRequirementsKey"`;
\};
`decisionRequirementsName?`: `string`;
`decisionRequirementsVersion?`: `number`;
`name?`: `string`;
`tenantId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"TenantId"`;
\};
`version?`: `number`;
\}\>

### getDecisionDefinitionXml()

```ts
getDecisionDefinitionXml(...a): CancelablePromise<string>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`string`\>

### getDecisionInstance()

```ts
getDecisionInstance(...a): CancelablePromise<{
  decisionDefinitionId?: {
   [key: number]: string;
     __brand: "DecisionDefinitionId";
  };
  decisionDefinitionKey?: {
   [key: number]: string;
     __brand: "DecisionDefinitionKey";
  };
  decisionDefinitionName?: string;
  decisionDefinitionType?: DecisionDefinitionTypeEnum;
  decisionDefinitionVersion?: number;
  decisionEvaluationInstanceKey?: {
   [key: number]: string;
     __brand: "DecisionEvaluationInstanceKey";
  };
  decisionEvaluationKey?: {
   [key: number]: string;
     __brand: "DecisionEvaluationKey";
  };
  elementInstanceKey?: {
   [key: number]: string;
     __brand: "ElementInstanceKey";
  };
  evaluatedInputs?: object[];
  evaluationDate?: string;
  evaluationFailure?: string;
  matchedRules?: object[];
  processDefinitionKey?: {
   [key: number]: string;
     __brand: "ProcessDefinitionKey";
  };
  processInstanceKey?: {
   [key: number]: string;
     __brand: "ProcessInstanceKey";
  };
  result?: string;
  rootDecisionDefinitionKey?: {
   [key: number]: string;
     __brand: "DecisionDefinitionKey";
  };
  rootProcessInstanceKey?: {
   [key: number]: string;
     __brand: "ProcessInstanceKey";
  };
  state?: DecisionInstanceStateEnum;
  tenantId?: {
   [key: number]: string;
     __brand: "TenantId";
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`decisionDefinitionId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"DecisionDefinitionId"`;
\};
`decisionDefinitionKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"DecisionDefinitionKey"`;
\};
`decisionDefinitionName?`: `string`;
`decisionDefinitionType?`: [`DecisionDefinitionTypeEnum`](../type-aliases/DecisionDefinitionTypeEnum.md);
`decisionDefinitionVersion?`: `number`;
`decisionEvaluationInstanceKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"DecisionEvaluationInstanceKey"`;
\};
`decisionEvaluationKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"DecisionEvaluationKey"`;
\};
`elementInstanceKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ElementInstanceKey"`;
\};
`evaluatedInputs?`: `object`[];
`evaluationDate?`: `string`;
`evaluationFailure?`: `string`;
`matchedRules?`: `object`[];
`processDefinitionKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessDefinitionKey"`;
\};
`processInstanceKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\};
`result?`: `string`;
`rootDecisionDefinitionKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"DecisionDefinitionKey"`;
\};
`rootProcessInstanceKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\};
`state?`: [`DecisionInstanceStateEnum`](../type-aliases/DecisionInstanceStateEnum.md);
`tenantId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"TenantId"`;
\};
\}\>

### getDecisionRequirements()

```ts
getDecisionRequirements(...a): CancelablePromise<{
  decisionRequirementsId?: string;
  decisionRequirementsKey?: {
   [key: number]: string;
     __brand: "DecisionRequirementsKey";
  };
  decisionRequirementsName?: string;
  resourceName?: string;
  tenantId?: {
   [key: number]: string;
     __brand: "TenantId";
  };
  version?: number;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`decisionRequirementsId?`: `string`;
`decisionRequirementsKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"DecisionRequirementsKey"`;
\};
`decisionRequirementsName?`: `string`;
`resourceName?`: `string`;
`tenantId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"TenantId"`;
\};
`version?`: `number`;
\}\>

### getDecisionRequirementsXml()

```ts
getDecisionRequirementsXml(...a): CancelablePromise<string>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`string`\>

### getDocument()

```ts
getDocument(...a): CancelablePromise<{
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
\}\>

### getElementInstance()

```ts
getElementInstance(...a): CancelablePromise<{
  elementId: string;
  elementInstanceKey: string;
  elementName: string;
  endDate?: string;
  hasIncident: boolean;
  incidentKey?: {
   [key: number]: string;
     __brand: "IncidentKey";
  };
  processDefinitionId: string;
  processDefinitionKey: string;
  processInstanceKey: string;
  rootProcessInstanceKey?: {
   [key: number]: string;
     __brand: "ProcessInstanceKey";
  };
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

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`elementId`: `string`;
`elementInstanceKey`: `string`;
`elementName`: `string`;
`endDate?`: `string`;
`hasIncident`: `boolean`;
`incidentKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"IncidentKey"`;
\};
`processDefinitionId`: `string`;
`processDefinitionKey`: `string`;
`processInstanceKey`: `string`;
`rootProcessInstanceKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\};
`startDate`: `string`;
`state`: [`ElementInstanceStateEnum`](../type-aliases/ElementInstanceStateEnum.md);
`tenantId`: `string`;
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
  tenantId?: string;
  value?: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`name`: `string`;
`scope`: [`ClusterVariableScopeEnum`](../type-aliases/ClusterVariableScopeEnum.md);
`tenantId?`: `string`;
`value?`: `string`;
\}\>

### getGlobalJobStatistics()

```ts
getGlobalJobStatistics(...a): CancelablePromise<{
  completed: {
     count: number;
     lastUpdatedAt: string;
  };
  created: {
     count: number;
     lastUpdatedAt: string;
  };
  failed: {
     count: number;
     lastUpdatedAt: string;
  };
  isIncomplete: boolean;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`completed`: \{
`count`: `number`;
`lastUpdatedAt`: `string`;
\};
`created`: \{
`count`: `number`;
`lastUpdatedAt`: `string`;
\};
`failed`: \{
`count`: `number`;
`lastUpdatedAt`: `string`;
\};
`isIncomplete`: `boolean`;
\}\>

### getGroup()

```ts
getGroup(...a): CancelablePromise<{
  description?: string;
  groupId?: string;
  name?: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description?`: `string`;
`groupId?`: `string`;
`name?`: `string`;
\}\>

### getIncident()

```ts
getIncident(...a): CancelablePromise<{
  creationTime?: string;
  elementId?: {
   [key: number]: string;
     __brand: "ElementId";
  };
  elementInstanceKey?: {
   [key: number]: string;
     __brand: "ElementInstanceKey";
  };
  errorMessage?: string;
  errorType?: IncidentErrorTypeEnum;
  incidentKey?: {
   [key: number]: string;
     __brand: "IncidentKey";
  };
  jobKey?: {
   [key: number]: string;
     __brand: "JobKey";
  };
  processDefinitionId?: {
   [key: number]: string;
     __brand: "ProcessDefinitionId";
  };
  processDefinitionKey?: {
   [key: number]: string;
     __brand: "ProcessDefinitionKey";
  };
  processInstanceKey?: {
   [key: number]: string;
     __brand: "ProcessInstanceKey";
  };
  rootProcessInstanceKey?: {
   [key: number]: string;
     __brand: "ProcessInstanceKey";
  };
  state?: IncidentStateEnum;
  tenantId?: {
   [key: number]: string;
     __brand: "TenantId";
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`creationTime?`: `string`;
`elementId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ElementId"`;
\};
`elementInstanceKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ElementInstanceKey"`;
\};
`errorMessage?`: `string`;
`errorType?`: [`IncidentErrorTypeEnum`](../type-aliases/IncidentErrorTypeEnum.md);
`incidentKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"IncidentKey"`;
\};
`jobKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"JobKey"`;
\};
`processDefinitionId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessDefinitionId"`;
\};
`processDefinitionKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessDefinitionKey"`;
\};
`processInstanceKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\};
`rootProcessInstanceKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\};
`state?`: [`IncidentStateEnum`](../type-aliases/IncidentStateEnum.md);
`tenantId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"TenantId"`;
\};
\}\>

### getLicense()

```ts
getLicense(...a): CancelablePromise<{
  expiresAt?: string | null;
  isCommercial: boolean;
  licenseType: string;
  validLicense: boolean;
}>;
```

#### Parameters

##### a

...\[\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`expiresAt?`: `string` \| `null`;
`isCommercial`: `boolean`;
`licenseType`: `string`;
`validLicense`: `boolean`;
\}\>

### getMappingRule()

```ts
getMappingRule(...a): CancelablePromise<{
  claimName?: string;
  claimValue?: string;
  mappingRuleId?: string;
  name?: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`claimName?`: `string`;
`claimValue?`: `string`;
`mappingRuleId?`: `string`;
`name?`: `string`;
\}\>

### getProcessDefinition()

```ts
getProcessDefinition(...a): CancelablePromise<{
  hasStartForm?: boolean;
  name?: string;
  processDefinitionId?: {
   [key: number]: string;
     __brand: "ProcessDefinitionId";
  };
  processDefinitionKey?: {
   [key: number]: string;
     __brand: "ProcessDefinitionKey";
  };
  resourceName?: string;
  tenantId?: {
   [key: number]: string;
     __brand: "TenantId";
  };
  version?: number;
  versionTag?: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`hasStartForm?`: `boolean`;
`name?`: `string`;
`processDefinitionId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessDefinitionId"`;
\};
`processDefinitionKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessDefinitionKey"`;
\};
`resourceName?`: `string`;
`tenantId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"TenantId"`;
\};
`version?`: `number`;
`versionTag?`: `string`;
\}\>

### getProcessDefinitionInstanceStatistics()

```ts
getProcessDefinitionInstanceStatistics(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### getProcessDefinitionInstanceVersionStatistics()

```ts
getProcessDefinitionInstanceVersionStatistics(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### getProcessDefinitionMessageSubscriptionStatistics()

```ts
getProcessDefinitionMessageSubscriptionStatistics(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### getProcessDefinitionStatistics()

```ts
getProcessDefinitionStatistics(...a): CancelablePromise<{
  items?: object[];
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
\}\>

### getProcessDefinitionXml()

```ts
getProcessDefinitionXml(...a): CancelablePromise<string>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`string`\>

### getProcessInstance()

```ts
getProcessInstance(...a): CancelablePromise<{
  endDate?: string;
  hasIncident: boolean;
  parentElementInstanceKey?: {
   [key: number]: string;
     __brand: "ElementInstanceKey";
  };
  parentProcessInstanceKey?: {
   [key: number]: string;
     __brand: "ProcessInstanceKey";
  };
  processDefinitionId: string;
  processDefinitionKey: string;
  processDefinitionName: string;
  processDefinitionVersion: number;
  processDefinitionVersionTag?: string;
  processInstanceKey: string;
  rootProcessInstanceKey?: {
   [key: number]: string;
     __brand: "ProcessInstanceKey";
  };
  startDate: string;
  state: ProcessInstanceStateEnum;
  tags?: string[];
  tenantId: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`endDate?`: `string`;
`hasIncident`: `boolean`;
`parentElementInstanceKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ElementInstanceKey"`;
\};
`parentProcessInstanceKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\};
`processDefinitionId`: `string`;
`processDefinitionKey`: `string`;
`processDefinitionName`: `string`;
`processDefinitionVersion`: `number`;
`processDefinitionVersionTag?`: `string`;
`processInstanceKey`: `string`;
`rootProcessInstanceKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\};
`startDate`: `string`;
`state`: [`ProcessInstanceStateEnum`](../type-aliases/ProcessInstanceStateEnum.md);
`tags?`: `string`[];
`tenantId`: `string`;
\}\>

### getProcessInstanceCallHierarchy()

```ts
getProcessInstanceCallHierarchy(...a): CancelablePromise<object[]>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`object`[]\>

### getProcessInstanceSequenceFlows()

```ts
getProcessInstanceSequenceFlows(...a): CancelablePromise<{
  items?: object[];
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
\}\>

### getProcessInstanceStatistics()

```ts
getProcessInstanceStatistics(...a): CancelablePromise<{
  items?: object[];
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
\}\>

### getProcessInstanceStatisticsByDefinition()

```ts
getProcessInstanceStatisticsByDefinition(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### getProcessInstanceStatisticsByError()

```ts
getProcessInstanceStatisticsByError(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### getResource()

```ts
getResource(...a): CancelablePromise<{
  resourceId?: string;
  resourceKey?:   | {
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
   };
  resourceName?: string;
  tenantId?: {
   [key: number]: string;
     __brand: "TenantId";
  };
  version?: number;
  versionTag?: string;
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`resourceId?`: `string`;
`resourceKey?`: \| \{
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
\};
`resourceName?`: `string`;
`tenantId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"TenantId"`;
\};
`version?`: `number`;
`versionTag?`: `string`;
\}\>

### getResourceContent()

```ts
getResourceContent(...a): CancelablePromise<{
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
\}\>

### getRole()

```ts
getRole(...a): CancelablePromise<{
  description?: string;
  name?: string;
  roleId?: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description?`: `string`;
`name?`: `string`;
`roleId?`: `string`;
\}\>

### getStartProcessForm()

```ts
getStartProcessForm(...a): CancelablePromise<
  | void
  | {
  formId?: {
   [key: number]: string;
     __brand: "FormId";
  };
  formKey?: {
   [key: number]: string;
     __brand: "FormKey";
  };
  schema?: {
   [key: string]: unknown;
  };
  tenantId?: {
   [key: number]: string;
     __brand: "TenantId";
  };
  version?: number;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<
\| `void`
\| \{
`formId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"FormId"`;
\};
`formKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"FormKey"`;
\};
`schema?`: \{
\[`key`: `string`\]: `unknown`;
\};
`tenantId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"TenantId"`;
\};
`version?`: `number`;
\}\>

### getStatus()

```ts
getStatus(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### getTenant()

```ts
getTenant(...a): CancelablePromise<{
  description?: string;
  name?: string;
  tenantId?: {
   [key: number]: string;
     __brand: "TenantId";
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description?`: `string`;
`name?`: `string`;
`tenantId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"TenantId"`;
\};
\}\>

### getTenantClusterVariable()

```ts
getTenantClusterVariable(...a): CancelablePromise<{
  name: string;
  scope: ClusterVariableScopeEnum;
  tenantId?: string;
  value?: string;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`name`: `string`;
`scope`: [`ClusterVariableScopeEnum`](../type-aliases/ClusterVariableScopeEnum.md);
`tenantId?`: `string`;
`value?`: `string`;
\}\>

### getTopology()

```ts
getTopology(...a): CancelablePromise<{
  brokers: object[];
  clusterId?: string | null;
  clusterSize: number;
  gatewayVersion: string;
  lastCompletedChangeId: string;
  partitionsCount: number;
  replicationFactor: number;
}>;
```

#### Parameters

##### a

...\[\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`brokers`: `object`[];
`clusterId?`: `string` \| `null`;
`clusterSize`: `number`;
`gatewayVersion`: `string`;
`lastCompletedChangeId`: `string`;
`partitionsCount`: `number`;
`replicationFactor`: `number`;
\}\>

### getUsageMetrics()

```ts
getUsageMetrics(...a): CancelablePromise<{
  activeTenants?: number;
  assignees?: number;
  decisionInstances?: number;
  processInstances?: number;
  tenants?: {
   [key: string]: object;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`activeTenants?`: `number`;
`assignees?`: `number`;
`decisionInstances?`: `number`;
`processInstances?`: `number`;
`tenants?`: \{
\[`key`: `string`\]: `object`;
\};
\}\>

### getUser()

```ts
getUser(...a): CancelablePromise<{
  email?: string;
  name?: string;
  username?: {
   [key: number]: string;
     __brand: "Username";
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`email?`: `string`;
`name?`: `string`;
`username?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"Username"`;
\};
\}\>

### getUserTask()

```ts
getUserTask(...a): CancelablePromise<{
  assignee?: string;
  candidateGroups?: string[];
  candidateUsers?: string[];
  completionDate?: string;
  creationDate?: string;
  customHeaders?: {
   [key: string]: string;
  };
  dueDate?: string;
  elementId?: {
   [key: number]: string;
     __brand: "ElementId";
  };
  elementInstanceKey?: {
   [key: number]: string;
     __brand: "ElementInstanceKey";
  };
  externalFormReference?: string;
  followUpDate?: string;
  formKey?: {
   [key: number]: string;
     __brand: "FormKey";
  };
  name?: string;
  priority?: number;
  processDefinitionId?: {
   [key: number]: string;
     __brand: "ProcessDefinitionId";
  };
  processDefinitionKey?: {
   [key: number]: string;
     __brand: "ProcessDefinitionKey";
  };
  processDefinitionVersion?: number;
  processInstanceKey?: {
   [key: number]: string;
     __brand: "ProcessInstanceKey";
  };
  processName?: string;
  rootProcessInstanceKey?: {
   [key: number]: string;
     __brand: "ProcessInstanceKey";
  };
  state?: UserTaskStateEnum;
  tags?: string[];
  tenantId?: {
   [key: number]: string;
     __brand: "TenantId";
  };
  userTaskKey?: {
   [key: number]: string;
     __brand: "UserTaskKey";
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

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
`elementId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ElementId"`;
\};
`elementInstanceKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ElementInstanceKey"`;
\};
`externalFormReference?`: `string`;
`followUpDate?`: `string`;
`formKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"FormKey"`;
\};
`name?`: `string`;
`priority?`: `number`;
`processDefinitionId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessDefinitionId"`;
\};
`processDefinitionKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessDefinitionKey"`;
\};
`processDefinitionVersion?`: `number`;
`processInstanceKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\};
`processName?`: `string`;
`rootProcessInstanceKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\};
`state?`: [`UserTaskStateEnum`](../type-aliases/UserTaskStateEnum.md);
`tags?`: `string`[];
`tenantId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"TenantId"`;
\};
`userTaskKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"UserTaskKey"`;
\};
\}\>

### getUserTaskForm()

```ts
getUserTaskForm(...a): CancelablePromise<
  | void
  | {
  formId?: {
   [key: number]: string;
     __brand: "FormId";
  };
  formKey?: {
   [key: number]: string;
     __brand: "FormKey";
  };
  schema?: {
   [key: string]: unknown;
  };
  tenantId?: {
   [key: number]: string;
     __brand: "TenantId";
  };
  version?: number;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<
\| `void`
\| \{
`formId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"FormId"`;
\};
`formKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"FormKey"`;
\};
`schema?`: \{
\[`key`: `string`\]: `unknown`;
\};
`tenantId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"TenantId"`;
\};
`version?`: `number`;
\}\>

### getVariable()

```ts
getVariable(...a): CancelablePromise<{
  name?: string;
  processInstanceKey?: {
   [key: number]: string;
     __brand: "ProcessInstanceKey";
  };
  rootProcessInstanceKey?: {
   [key: number]: string;
     __brand: "ProcessInstanceKey";
  };
  scopeKey?: {
   [key: number]: string;
     __brand: "ScopeKey";
  };
  tenantId?: {
   [key: number]: string;
     __brand: "TenantId";
  };
  value?: string;
  variableKey?: {
   [key: number]: string;
     __brand: "VariableKey";
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`name?`: `string`;
`processInstanceKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\};
`rootProcessInstanceKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\};
`scopeKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"ScopeKey"`;
\};
`tenantId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"TenantId"`;
\};
`value?`: `string`;
`variableKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"VariableKey"`;
\};
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

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### migrateProcessInstancesBatchOperation()

```ts
migrateProcessInstancesBatchOperation(...a): CancelablePromise<{
  batchOperationKey?: {
   [key: number]: string;
     __brand: "BatchOperationKey";
  };
  batchOperationType?: BatchOperationTypeEnum;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"BatchOperationKey"`;
\};
`batchOperationType?`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>

### modifyProcessInstance()

```ts
modifyProcessInstance(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### modifyProcessInstancesBatchOperation()

```ts
modifyProcessInstancesBatchOperation(...a): CancelablePromise<{
  batchOperationKey?: {
   [key: number]: string;
     __brand: "BatchOperationKey";
  };
  batchOperationType?: BatchOperationTypeEnum;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"BatchOperationKey"`;
\};
`batchOperationType?`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
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

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### publishMessage()

```ts
publishMessage(...a): CancelablePromise<{
  messageKey?: {
   [key: number]: string;
     __brand: "MessageKey";
  };
  tenantId?: {
   [key: number]: string;
     __brand: "TenantId";
  };
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`messageKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"MessageKey"`;
\};
`tenantId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"TenantId"`;
\};
\}\>

### resetClock()

```ts
resetClock(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### resolveIncident()

```ts
resolveIncident(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### resolveIncidentsBatchOperation()

```ts
resolveIncidentsBatchOperation(...a): CancelablePromise<{
  batchOperationKey?: {
   [key: number]: string;
     __brand: "BatchOperationKey";
  };
  batchOperationType?: BatchOperationTypeEnum;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"BatchOperationKey"`;
\};
`batchOperationType?`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>

### resolveProcessInstanceIncidents()

```ts
resolveProcessInstanceIncidents(...a): CancelablePromise<{
  batchOperationKey?: {
   [key: number]: string;
     __brand: "BatchOperationKey";
  };
  batchOperationType?: BatchOperationTypeEnum;
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"BatchOperationKey"`;
\};
`batchOperationType?`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
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
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchAuthorizations()

```ts
searchAuthorizations(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchBatchOperationItems()

```ts
searchBatchOperationItems(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchBatchOperations()

```ts
searchBatchOperations(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchClientsForGroup()

```ts
searchClientsForGroup(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchClientsForRole()

```ts
searchClientsForRole(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchClientsForTenant()

```ts
searchClientsForTenant(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchClusterVariables()

```ts
searchClusterVariables(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchCorrelatedMessageSubscriptions()

```ts
searchCorrelatedMessageSubscriptions(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchDecisionDefinitions()

```ts
searchDecisionDefinitions(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchDecisionInstances()

```ts
searchDecisionInstances(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchDecisionRequirements()

```ts
searchDecisionRequirements(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchElementInstanceIncidents()

```ts
searchElementInstanceIncidents(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchElementInstances()

```ts
searchElementInstances(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchGroupIdsForTenant()

```ts
searchGroupIdsForTenant(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchGroups()

```ts
searchGroups(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchGroupsForRole()

```ts
searchGroupsForRole(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchIncidents()

```ts
searchIncidents(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchJobs()

```ts
searchJobs(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchMappingRule()

```ts
searchMappingRule(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchMappingRulesForGroup()

```ts
searchMappingRulesForGroup(...a): CancelablePromise<{
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchMappingRulesForRole()

```ts
searchMappingRulesForRole(...a): CancelablePromise<{
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchMappingRulesForTenant()

```ts
searchMappingRulesForTenant(...a): CancelablePromise<{
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchMessageSubscriptions()

```ts
searchMessageSubscriptions(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchProcessDefinitions()

```ts
searchProcessDefinitions(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchProcessInstanceIncidents()

```ts
searchProcessInstanceIncidents(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchProcessInstances()

```ts
searchProcessInstances(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchRoles()

```ts
searchRoles(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchRolesForGroup()

```ts
searchRolesForGroup(...a): CancelablePromise<{
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchRolesForTenant()

```ts
searchRolesForTenant(...a): CancelablePromise<{
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchTenants()

```ts
searchTenants(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchUsers()

```ts
searchUsers(...a): CancelablePromise<{
  items: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchUsersForGroup()

```ts
searchUsersForGroup(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchUsersForRole()

```ts
searchUsersForRole(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchUsersForTenant()

```ts
searchUsersForTenant(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchUserTaskAuditLogs()

```ts
searchUserTaskAuditLogs(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchUserTasks()

```ts
searchUserTasks(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchUserTaskVariables()

```ts
searchUserTaskVariables(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
`totalItems`: `number`;
\};
\}\>

### searchVariables()

```ts
searchVariables(...a): CancelablePromise<{
  items?: object[];
  page: {
     endCursor?: {
      [key: number]: string;
        __brand: "EndCursor";
     };
     hasMoreTotalItems?: boolean;
     startCursor?: {
      [key: number]: string;
        __brand: "StartCursor";
     };
     totalItems: number;
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items?`: `object`[];
`page`: \{
`endCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\};
`hasMoreTotalItems?`: `boolean`;
`startCursor?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\};
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

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignClientFromGroup()

```ts
unassignClientFromGroup(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignClientFromTenant()

```ts
unassignClientFromTenant(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignGroupFromTenant()

```ts
unassignGroupFromTenant(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignMappingRuleFromGroup()

```ts
unassignMappingRuleFromGroup(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignMappingRuleFromTenant()

```ts
unassignMappingRuleFromTenant(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignRoleFromClient()

```ts
unassignRoleFromClient(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignRoleFromGroup()

```ts
unassignRoleFromGroup(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignRoleFromMappingRule()

```ts
unassignRoleFromMappingRule(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignRoleFromTenant()

```ts
unassignRoleFromTenant(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignRoleFromUser()

```ts
unassignRoleFromUser(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignUserFromGroup()

```ts
unassignUserFromGroup(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignUserFromTenant()

```ts
unassignUserFromTenant(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### unassignUserTask()

```ts
unassignUserTask(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

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
\}\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### updateGlobalClusterVariable()

```ts
updateGlobalClusterVariable(...a): CancelablePromise<{
  name: string;
  scope: ClusterVariableScopeEnum;
  tenantId?: string;
  value?: string;
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`name`: `string`;
`scope`: [`ClusterVariableScopeEnum`](../type-aliases/ClusterVariableScopeEnum.md);
`tenantId?`: `string`;
`value?`: `string`;
\}\>

### updateGroup()

```ts
updateGroup(...a): CancelablePromise<{
  description?: string;
  groupId?: string;
  name?: string;
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description?`: `string`;
`groupId?`: `string`;
`name?`: `string`;
\}\>

### updateJob()

```ts
updateJob(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>

### updateMappingRule()

```ts
updateMappingRule(...a): CancelablePromise<{
  claimName?: string;
  claimValue?: string;
  mappingRuleId?: string;
  name?: string;
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`claimName?`: `string`;
`claimValue?`: `string`;
`mappingRuleId?`: `string`;
`name?`: `string`;
\}\>

### updateRole()

```ts
updateRole(...a): CancelablePromise<{
  description?: string;
  name?: string;
  roleId?: string;
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description?`: `string`;
`name?`: `string`;
`roleId?`: `string`;
\}\>

### updateTenant()

```ts
updateTenant(...a): CancelablePromise<{
  description?: string;
  name?: string;
  tenantId?: {
   [key: number]: string;
     __brand: "TenantId";
  };
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description?`: `string`;
`name?`: `string`;
`tenantId?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"TenantId"`;
\};
\}\>

### updateTenantClusterVariable()

```ts
updateTenantClusterVariable(...a): CancelablePromise<{
  name: string;
  scope: ClusterVariableScopeEnum;
  tenantId?: string;
  value?: string;
}>;
```

#### Parameters

##### a

...\[`object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`name`: `string`;
`scope`: [`ClusterVariableScopeEnum`](../type-aliases/ClusterVariableScopeEnum.md);
`tenantId?`: `string`;
`value?`: `string`;
\}\>

### updateUser()

```ts
updateUser(...a): CancelablePromise<{
  email?: string;
  name?: string;
  username?: {
   [key: number]: string;
     __brand: "Username";
  };
}>;
```

#### Parameters

##### a

...\[`object`, `object`\]

#### Returns

[`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`email?`: `string`;
`name?`: `string`;
`username?`: \{
\[`key`: `number`\]: `string`;
`__brand`: `"Username"`;
\};
\}\>

### updateUserTask()

```ts
updateUserTask(...a): CancelablePromise<void>;
```

#### Parameters

##### a

...\[`object`\]

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
