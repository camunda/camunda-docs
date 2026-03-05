---
title: "Type Alias: searchRolesForTenantConsistency"
sidebar_label: "searchRolesForTenantConsistency"
mdx:
  format: md
---

# Type Alias: searchRolesForTenantConsistency

```ts
type searchRolesForTenantConsistency = object;
```

Defined in: [gen/CamundaClient.ts:907](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L907)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchRolesForTenant>>;
```

Defined in: [gen/CamundaClient.ts:909](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L909)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
