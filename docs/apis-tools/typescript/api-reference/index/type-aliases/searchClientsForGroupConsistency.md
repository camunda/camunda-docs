---
title: "Type Alias: searchClientsForGroupConsistency"
sidebar_label: "searchClientsForGroupConsistency"
mdx:
  format: md
---

# Type Alias: searchClientsForGroupConsistency

```ts
type searchClientsForGroupConsistency = object;
```

Defined in: [gen/CamundaClient.ts:678](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L678)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchClientsForGroup>>;
```

Defined in: [gen/CamundaClient.ts:680](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L680)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
