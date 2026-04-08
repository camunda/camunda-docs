---
title: "Type Alias: getProcessDefinitionConsistency"
sidebar_label: "getProcessDefinitionConsistency"
mdx:
  format: md
---

# Type Alias: getProcessDefinitionConsistency

```ts
type getProcessDefinitionConsistency = object;
```

Defined in: [gen/CamundaClient.ts:423](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L423)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getProcessDefinition>>;
```

Defined in: [gen/CamundaClient.ts:425](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L425)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
