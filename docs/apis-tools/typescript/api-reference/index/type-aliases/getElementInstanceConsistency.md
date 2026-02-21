---
title: "Type Alias: getElementInstanceConsistency"
sidebar_label: "getElementInstanceConsistency"
mdx:
  format: md
---

# Type Alias: getElementInstanceConsistency

```ts
type getElementInstanceConsistency = object;
```

Defined in: [gen/CamundaClient.ts:366](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L366)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getElementInstance>>;
```

Defined in: [gen/CamundaClient.ts:368](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L368)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
