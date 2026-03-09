---
title: "Type Alias: deleteProcessInstanceConsistency"
sidebar_label: "deleteProcessInstanceConsistency"
mdx:
  format: md
---

# Type Alias: deleteProcessInstanceConsistency

```ts
type deleteProcessInstanceConsistency = object;
```

Defined in: [gen/CamundaClient.ts:244](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L244)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.deleteProcessInstance>>;
```

Defined in: [gen/CamundaClient.ts:246](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L246)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
