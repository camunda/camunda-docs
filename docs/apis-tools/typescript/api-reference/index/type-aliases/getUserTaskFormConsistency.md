---
title: "Type Alias: getUserTaskFormConsistency"
sidebar_label: "getUserTaskFormConsistency"
mdx:
  format: md
---

# Type Alias: getUserTaskFormConsistency

```ts
type getUserTaskFormConsistency = object;
```

Defined in: [gen/CamundaClient.ts:585](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L585)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getUserTaskForm>>;
```

Defined in: [gen/CamundaClient.ts:587](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L587)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
