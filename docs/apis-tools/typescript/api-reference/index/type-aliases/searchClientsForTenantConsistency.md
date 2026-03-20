---
title: "Type Alias: searchClientsForTenantConsistency"
sidebar_label: "searchClientsForTenantConsistency"
mdx:
  format: md
---

# Type Alias: searchClientsForTenantConsistency

```ts
type searchClientsForTenantConsistency = object;
```

Defined in: [gen/CamundaClient.ts:713](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L713)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchClientsForTenant>>;
```

Defined in: [gen/CamundaClient.ts:715](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L715)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
