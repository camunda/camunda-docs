---
title: "Type Alias: getProcessInstanceStatisticsByDefinitionConsistency"
sidebar_label: "getProcessInstanceStatisticsByDefinitionConsistency"
mdx:
  format: md
---

# Type Alias: getProcessInstanceStatisticsByDefinitionConsistency

```ts
type getProcessInstanceStatisticsByDefinitionConsistency = object;
```

Defined in: [gen/CamundaClient.ts:504](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L504)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessInstanceStatisticsByDefinition>
>;
```

Defined in: [gen/CamundaClient.ts:506](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L506)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
