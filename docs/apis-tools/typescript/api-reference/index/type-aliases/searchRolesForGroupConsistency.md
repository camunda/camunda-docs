---
title: "Type Alias: searchRolesForGroupConsistency"
sidebar_label: "searchRolesForGroupConsistency"
mdx:
  format: md
---

# Type Alias: searchRolesForGroupConsistency

```ts
type searchRolesForGroupConsistency = object;
```

Defined in: [gen/CamundaClient.ts:898](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L898)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchRolesForGroup>>;
```

Defined in: [gen/CamundaClient.ts:900](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L900)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
