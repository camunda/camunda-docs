---
title: "Type Alias: searchMappingRulesForTenantConsistency"
sidebar_label: "searchMappingRulesForTenantConsistency"
mdx:
  format: md
---

# Type Alias: searchMappingRulesForTenantConsistency

```ts
type searchMappingRulesForTenantConsistency = object;
```

Defined in: [gen/CamundaClient.ts:848](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L848)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.searchMappingRulesForTenant>
>;
```

Defined in: [gen/CamundaClient.ts:850](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L850)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
