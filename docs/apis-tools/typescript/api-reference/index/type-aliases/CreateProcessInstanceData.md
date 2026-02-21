---
title: "Type Alias: CreateProcessInstanceData"
sidebar_label: "CreateProcessInstanceData"
mdx:
  format: md
---

# Type Alias: CreateProcessInstanceData

```ts
type CreateProcessInstanceData = object;
```

Defined in: [gen/types.gen.ts:13212](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13212)

## Properties

### body

```ts
body:
  | {
  awaitCompletion?: boolean;
  fetchVariables?: string[];
  operationReference?: OperationReference;
  processDefinitionId: ProcessDefinitionId;
  processDefinitionVersion?: number;
  requestTimeout?: number;
  runtimeInstructions?: ProcessInstanceCreationRuntimeInstruction[];
  startInstructions?: ProcessInstanceCreationStartInstruction[];
  tags?: TagSet;
  tenantId?: TenantId;
  variables?: {
   [key: string]: unknown;
  };
}
  | {
  awaitCompletion?: boolean;
  fetchVariables?: string[];
  operationReference?: OperationReference;
  processDefinitionKey: ProcessDefinitionKey;
  processDefinitionVersion?: number;
  requestTimeout?: number;
  runtimeInstructions?: ProcessInstanceCreationRuntimeInstruction[];
  startInstructions?: ProcessInstanceCreationStartInstruction[];
  tags?: TagSet;
  tenantId?: TenantId;
  variables?: {
   [key: string]: unknown;
  };
};
```

Defined in: [gen/types.gen.ts:13218](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13218)

Instructions for creating a process instance. The process definition can be specified
either by id or by key.

#### Type Declaration

```ts
{
  awaitCompletion?: boolean;
  fetchVariables?: string[];
  operationReference?: OperationReference;
  processDefinitionId: ProcessDefinitionId;
  processDefinitionVersion?: number;
  requestTimeout?: number;
  runtimeInstructions?: ProcessInstanceCreationRuntimeInstruction[];
  startInstructions?: ProcessInstanceCreationStartInstruction[];
  tags?: TagSet;
  tenantId?: TenantId;
  variables?: {
   [key: string]: unknown;
  };
}
```

#### awaitCompletion?

```ts
optional awaitCompletion: boolean;
```

Wait for the process instance to complete. If the process instance completion does
not occur within the requestTimeout, the request will be closed. This can lead to a 504
response status. Disabled by default.

#### fetchVariables?

```ts
optional fetchVariables: string[];
```

List of variables by name to be included in the response when awaitCompletion is set to true.
If empty, all visible variables in the root scope will be returned.

#### operationReference?

```ts
optional operationReference: OperationReference;
```

#### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

The BPMN process id of the process definition to start an instance of.

#### processDefinitionVersion?

```ts
optional processDefinitionVersion: number;
```

The version of the process. By default, the latest version of the process is used.

#### requestTimeout?

```ts
optional requestTimeout: number;
```

Timeout (in ms) the request waits for the process to complete. By default or
when set to 0, the generic request timeout configured in the cluster is applied.

#### runtimeInstructions?

```ts
optional runtimeInstructions: ProcessInstanceCreationRuntimeInstruction[];
```

Runtime instructions (alpha). List of instructions that affect the runtime behavior of
the process instance. Refer to specific instruction types for more details.

This parameter is an alpha feature and may be subject to change
in future releases.

#### startInstructions?

```ts
optional startInstructions: ProcessInstanceCreationStartInstruction[];
```

List of start instructions. By default, the process instance will start at
the start event. If provided, the process instance will apply start instructions
after it has been created.

#### tags?

```ts
optional tags: TagSet;
```

#### tenantId?

```ts
optional tenantId: TenantId;
```

The tenant id of the process definition.

#### variables?

```ts
optional variables: object;
```

JSON object that will instantiate the variables for the root variable scope
of the process instance.

##### Index Signature

```ts
[key: string]: unknown
```

```ts
{
  awaitCompletion?: boolean;
  fetchVariables?: string[];
  operationReference?: OperationReference;
  processDefinitionKey: ProcessDefinitionKey;
  processDefinitionVersion?: number;
  requestTimeout?: number;
  runtimeInstructions?: ProcessInstanceCreationRuntimeInstruction[];
  startInstructions?: ProcessInstanceCreationStartInstruction[];
  tags?: TagSet;
  tenantId?: TenantId;
  variables?: {
   [key: string]: unknown;
  };
}
```

#### awaitCompletion?

```ts
optional awaitCompletion: boolean;
```

Wait for the process instance to complete. If the process instance completion does
not occur within the requestTimeout, the request will be closed. This can lead to a 504
response status. Disabled by default.

#### fetchVariables?

```ts
optional fetchVariables: string[];
```

List of variables by name to be included in the response when awaitCompletion is set to true.
If empty, all visible variables in the root scope will be returned.

#### operationReference?

```ts
optional operationReference: OperationReference;
```

#### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The unique key identifying the process definition, for example, returned for a process in the
deploy resources endpoint.

#### processDefinitionVersion?

```ts
optional processDefinitionVersion: number;
```

As the version is already identified by the `processDefinitionKey`, the value of this field is ignored.
It's here for backwards-compatibility only as previous releases accepted it in request bodies.

#### requestTimeout?

```ts
optional requestTimeout: number;
```

Timeout (in ms) the request waits for the process to complete. By default or
when set to 0, the generic request timeout configured in the cluster is applied.

#### runtimeInstructions?

```ts
optional runtimeInstructions: ProcessInstanceCreationRuntimeInstruction[];
```

Runtime instructions (alpha). List of instructions that affect the runtime behavior of
the process instance. Refer to specific instruction types for more details.

This parameter is an alpha feature and may be subject to change
in future releases.

#### startInstructions?

```ts
optional startInstructions: ProcessInstanceCreationStartInstruction[];
```

List of start instructions. By default, the process instance will start at
the start event. If provided, the process instance will apply start instructions
after it has been created.

#### tags?

```ts
optional tags: TagSet;
```

#### tenantId?

```ts
optional tenantId: TenantId;
```

The tenant id of the process definition.

#### variables?

```ts
optional variables: object;
```

JSON object that will instantiate the variables for the root variable scope
of the process instance.

##### Index Signature

```ts
[key: string]: unknown
```

---

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:13341](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13341)

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:13342](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13342)

---

### url

```ts
url: "/process-instances";
```

Defined in: [gen/types.gen.ts:13343](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13343)
