---
title: "Type Alias: searchUsersForGroupConsistency"
sidebar_label: "searchUsersForGroupConsistency"
mdx:
  format: md
---

# Type Alias: searchUsersForGroupConsistency

```ts
type searchUsersForGroupConsistency = object;
```

Defined in: [gen/CamundaClient.ts:932](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L932)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUsersForGroup>>;
```

Defined in: [gen/CamundaClient.ts:934](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L934)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
