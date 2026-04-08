---
title: "Type Alias: searchProcessInstanceIncidentsConsistency"
sidebar_label: "searchProcessInstanceIncidentsConsistency"
mdx:
  format: md
---

# Type Alias: searchProcessInstanceIncidentsConsistency

```ts
type searchProcessInstanceIncidentsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:863](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L863)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.searchProcessInstanceIncidents>
>;
```

Defined in: [gen/CamundaClient.ts:865](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L865)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
