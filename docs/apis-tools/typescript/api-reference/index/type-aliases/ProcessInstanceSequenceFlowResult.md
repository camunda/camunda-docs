---
title: "Type Alias: ProcessInstanceSequenceFlowResult"
sidebar_label: "ProcessInstanceSequenceFlowResult"
mdx:
  format: md
---

# Type Alias: ProcessInstanceSequenceFlowResult

```ts
type ProcessInstanceSequenceFlowResult = object;
```

Defined in: [gen/types.gen.ts:6507](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6507)

Process instance sequence flow result.

## Properties

### elementId?

```ts
optional elementId: ElementId;
```

Defined in: [gen/types.gen.ts:6534](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6534)

The element id for this sequence flow, as provided in the BPMN process.

***

### processDefinitionId?

```ts
optional processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:6530](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6530)

The process definition id.

***

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:6526](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6526)

The process definition key.

***

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:6515](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6515)

The key of this process instance.

***

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:6522](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6522)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

***

### sequenceFlowId?

```ts
optional sequenceFlowId: string;
```

Defined in: [gen/types.gen.ts:6511](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6511)

The sequence flow id.

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:6535](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6535)
