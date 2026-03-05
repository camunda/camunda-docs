---
title: "Type Alias: updateUserConsistency"
sidebar_label: "updateUserConsistency"
mdx:
  format: md
---

# Type Alias: updateUserConsistency

```ts
type updateUserConsistency = object;
```

Defined in: [gen/CamundaClient.ts:1092](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1092)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.updateUser>>;
```

Defined in: [gen/CamundaClient.ts:1094](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1094)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
