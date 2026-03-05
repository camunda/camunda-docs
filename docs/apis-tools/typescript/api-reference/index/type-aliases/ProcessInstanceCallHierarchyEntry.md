---
title: "Type Alias: ProcessInstanceCallHierarchyEntry"
sidebar_label: "ProcessInstanceCallHierarchyEntry"
mdx:
  format: md
---

# Type Alias: ProcessInstanceCallHierarchyEntry

```ts
type ProcessInstanceCallHierarchyEntry = object;
```

Defined in: [gen/types.gen.ts:6479](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6479)

## Properties

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:6487](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6487)

The key of the process definition.

***

### processDefinitionName

```ts
processDefinitionName: string;
```

Defined in: [gen/types.gen.ts:6491](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6491)

The name of the process definition (fall backs to the process definition id if not available).

***

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:6483](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6483)

The key of the process instance.
