---
title: "Type Alias: getGroupConsistency"
sidebar_label: "getGroupConsistency"
mdx:
  format: md
---

# Type Alias: getGroupConsistency

```ts
type getGroupConsistency = object;
```

Defined in: [gen/CamundaClient.ts:392](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L392)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getGroup>>;
```

Defined in: [gen/CamundaClient.ts:394](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L394)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
