---
title: "Type Alias: searchElementInstanceIncidentsConsistency"
sidebar_label: "searchElementInstanceIncidentsConsistency"
mdx:
  format: md
---

# Type Alias: searchElementInstanceIncidentsConsistency

```ts
type searchElementInstanceIncidentsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:746](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L746)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchElementInstanceIncidents>>;
```

Defined in: [gen/CamundaClient.ts:748](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L748)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
