---
title: "Type Alias: searchUsersConsistency"
sidebar_label: "searchUsersConsistency"
mdx:
  format: md
---

# Type Alias: searchUsersConsistency

```ts
type searchUsersConsistency = object;
```

Defined in: [gen/CamundaClient.ts:923](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L923)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUsers>>;
```

Defined in: [gen/CamundaClient.ts:925](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L925)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
