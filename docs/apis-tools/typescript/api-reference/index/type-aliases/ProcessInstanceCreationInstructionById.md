---
title: "Type Alias: ProcessInstanceCreationInstructionById"
sidebar_label: "ProcessInstanceCreationInstructionById"
mdx:
  format: md
---

# Type Alias: ProcessInstanceCreationInstructionById

```ts
type ProcessInstanceCreationInstructionById = object;
```

Defined in: [gen/types.gen.ts:5402](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5402)

Process creation by id

## Properties

### awaitCompletion?

```ts
optional awaitCompletion: boolean;
```

Defined in: [gen/types.gen.ts:5448](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5448)

Wait for the process instance to complete. If the process instance completion does
not occur within the requestTimeout, the request will be closed. This can lead to a 504
response status. Disabled by default.

---

### fetchVariables?

```ts
optional fetchVariables: string[];
```

Defined in: [gen/types.gen.ts:5454](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5454)

List of variables by name to be included in the response when awaitCompletion is set to true.
If empty, all visible variables in the root scope will be returned.

---

### operationReference?

```ts
optional operationReference: OperationReference;
```

Defined in: [gen/types.gen.ts:5425](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5425)

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:5407](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5407)

The BPMN process id of the process definition to start an instance of.

---

### processDefinitionVersion?

```ts
optional processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:5412](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5412)

The version of the process. By default, the latest version of the process is used.

---

### requestTimeout?

```ts
optional requestTimeout: number;
```

Defined in: [gen/types.gen.ts:5460](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5460)

Timeout (in ms) the request waits for the process to complete. By default or
when set to 0, the generic request timeout configured in the cluster is applied.

---

### runtimeInstructions?

```ts
optional runtimeInstructions: ProcessInstanceCreationRuntimeInstruction[];
```

Defined in: [gen/types.gen.ts:5441](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5441)

Runtime instructions (alpha). List of instructions that affect the runtime behavior of
the process instance. Refer to specific instruction types for more details.

This parameter is an alpha feature and may be subject to change
in future releases.

---

### startInstructions?

```ts
optional startInstructions: ProcessInstanceCreationStartInstruction[];
```

Defined in: [gen/types.gen.ts:5432](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5432)

List of start instructions. By default, the process instance will start at
the start event. If provided, the process instance will apply start instructions
after it has been created.

---

### tags?

```ts
optional tags: TagSet;
```

Defined in: [gen/types.gen.ts:5461](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5461)

---

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5424](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5424)

The tenant id of the process definition.

---

### variables?

```ts
optional variables: object;
```

Defined in: [gen/types.gen.ts:5418](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5418)

JSON object that will instantiate the variables for the root variable scope
of the process instance.

#### Index Signature

```ts
[key: string]: unknown
```
