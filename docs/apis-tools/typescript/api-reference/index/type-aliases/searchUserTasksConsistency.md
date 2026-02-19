---
title: "Type Alias: searchUserTasksConsistency"
sidebar_label: "searchUserTasksConsistency"
mdx:
  format: md
---

# Type Alias: searchUserTasksConsistency

```ts
type searchUserTasksConsistency = object;
```

Defined in: [gen/CamundaClient.ts:967](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L967)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUserTasks>>;
```

Defined in: [gen/CamundaClient.ts:969](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L969)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
