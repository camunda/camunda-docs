---
title: "Type Alias: searchMappingRulesForGroupConsistency"
sidebar_label: "searchMappingRulesForGroupConsistency"
mdx:
  format: md
---

# Type Alias: searchMappingRulesForGroupConsistency

```ts
type searchMappingRulesForGroupConsistency = object;
```

Defined in: [gen/CamundaClient.ts:830](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L830)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchMappingRulesForGroup>>;
```

Defined in: [gen/CamundaClient.ts:832](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L832)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
