---
title: "Type Alias: getProcessDefinitionInstanceStatisticsConsistency"
sidebar_label: "getProcessDefinitionInstanceStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessDefinitionInstanceStatisticsConsistency

```ts
type getProcessDefinitionInstanceStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:432](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L432)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getProcessDefinitionInstanceStatistics>>;
```

Defined in: [gen/CamundaClient.ts:434](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L434)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
