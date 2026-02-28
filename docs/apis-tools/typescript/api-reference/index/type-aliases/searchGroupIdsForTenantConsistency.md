---
title: "Type Alias: searchGroupIdsForTenantConsistency"
sidebar_label: "searchGroupIdsForTenantConsistency"
mdx:
  format: md
---

# Type Alias: searchGroupIdsForTenantConsistency

```ts
type searchGroupIdsForTenantConsistency = object;
```

Defined in: [gen/CamundaClient.ts:780](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L780)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchGroupIdsForTenant>>;
```

Defined in: [gen/CamundaClient.ts:782](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L782)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
