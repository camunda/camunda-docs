---
title: "Type Alias: searchUsersForTenantConsistency"
sidebar_label: "searchUsersForTenantConsistency"
mdx:
  format: md
---

# Type Alias: searchUsersForTenantConsistency

```ts
type searchUsersForTenantConsistency = object;
```

Defined in: [gen/CamundaClient.ts:950](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L950)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUsersForTenant>>;
```

Defined in: [gen/CamundaClient.ts:952](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L952)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
