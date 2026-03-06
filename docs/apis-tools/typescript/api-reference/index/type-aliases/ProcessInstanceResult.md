---
title: "Type Alias: ProcessInstanceResult"
sidebar_label: "ProcessInstanceResult"
mdx:
  format: md
---

# Type Alias: ProcessInstanceResult

```ts
type ProcessInstanceResult = object;
```

Defined in: [gen/types.gen.ts:6413](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6413)

Process instance search response item.

## Properties

### businessId

```ts
businessId: BusinessId | null;
```

Defined in: [gen/types.gen.ts:6468](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6468)

The business id associated with this process instance.

***

### endDate

```ts
endDate: string | null;
```

Defined in: [gen/types.gen.ts:6434](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6434)

The completion or termination time of the process instance.

***

### hasIncident

```ts
hasIncident: boolean;
```

Defined in: [gen/types.gen.ts:6439](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6439)

Whether this process instance has a related incident or not.

***

### parentElementInstanceKey

```ts
parentElementInstanceKey: ElementInstanceKey | null;
```

Defined in: [gen/types.gen.ts:6456](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6456)

The parent element instance key.

***

### parentProcessInstanceKey

```ts
parentProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:6452](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6452)

The parent process instance key.

***

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:6414](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6414)

***

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:6448](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6448)

The process definition key.

***

### processDefinitionName

```ts
processDefinitionName: string | null;
```

Defined in: [gen/types.gen.ts:6418](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6418)

The process definition name.

***

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:6422](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6422)

The process definition version.

***

### processDefinitionVersionTag

```ts
processDefinitionVersionTag: string | null;
```

Defined in: [gen/types.gen.ts:6426](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6426)

The process definition version tag.

***

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:6444](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6444)

The key of this process instance.

***

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:6463](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6463)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

***

### startDate

```ts
startDate: string;
```

Defined in: [gen/types.gen.ts:6430](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6430)

The start time of the process instance.

***

### state

```ts
state: ProcessInstanceStateEnum;
```

Defined in: [gen/types.gen.ts:6435](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6435)

***

### tags

```ts
tags: TagSet;
```

Defined in: [gen/types.gen.ts:6464](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6464)

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:6440](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6440)
