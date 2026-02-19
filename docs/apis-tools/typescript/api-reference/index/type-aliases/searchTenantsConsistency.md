---
title: "Type Alias: searchTenantsConsistency"
sidebar_label: "searchTenantsConsistency"
mdx:
  format: md
---

# Type Alias: searchTenantsConsistency

```ts
type searchTenantsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:915](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L915)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchTenants>>;
```

Defined in: [gen/CamundaClient.ts:917](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L917)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
