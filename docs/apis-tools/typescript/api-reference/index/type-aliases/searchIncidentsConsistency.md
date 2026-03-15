---
title: "Type Alias: searchIncidentsConsistency"
sidebar_label: "searchIncidentsConsistency"
mdx:
  format: md
---

# Type Alias: searchIncidentsConsistency

```ts
type searchIncidentsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:796](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L796)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchIncidents>>;
```

Defined in: [gen/CamundaClient.ts:798](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L798)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
