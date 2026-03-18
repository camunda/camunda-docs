---
title: "Type Alias: getMappingRuleConsistency"
sidebar_label: "getMappingRuleConsistency"
mdx:
  format: md
---

# Type Alias: getMappingRuleConsistency

```ts
type getMappingRuleConsistency = object;
```

Defined in: [gen/CamundaClient.ts:410](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L410)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getMappingRule>>;
```

Defined in: [gen/CamundaClient.ts:412](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L412)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
