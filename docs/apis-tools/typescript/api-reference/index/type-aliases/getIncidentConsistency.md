---
title: "Type Alias: getIncidentConsistency"
sidebar_label: "getIncidentConsistency"
mdx:
  format: md
---

# Type Alias: getIncidentConsistency

```ts
type getIncidentConsistency = object;
```

Defined in: [gen/CamundaClient.ts:374](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L374)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getIncident>>;
```

Defined in: [gen/CamundaClient.ts:376](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L376)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
