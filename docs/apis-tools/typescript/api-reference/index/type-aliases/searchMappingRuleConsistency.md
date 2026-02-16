---
title: "Type Alias: searchMappingRuleConsistency"
sidebar_label: "searchMappingRuleConsistency"
mdx:
  format: md
---

# Type Alias: searchMappingRuleConsistency

```ts
type searchMappingRuleConsistency = object;
```

Defined in: [gen/CamundaClient.ts:821](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L821)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchMappingRule>>;
```

Defined in: [gen/CamundaClient.ts:823](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L823)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
