---
title: "Type Alias: deleteUserConsistency"
sidebar_label: "deleteUserConsistency"
mdx:
  format: md
---

# Type Alias: deleteUserConsistency

```ts
type deleteUserConsistency = object;
```

Defined in: [gen/CamundaClient.ts:274](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L274)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.deleteUser>>;
```

Defined in: [gen/CamundaClient.ts:276](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L276)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
