---
title: "Type Alias: getProcessInstanceConsistency"
sidebar_label: "getProcessInstanceConsistency"
mdx:
  format: md
---

# Type Alias: getProcessInstanceConsistency

```ts
type getProcessInstanceConsistency = object;
```

Defined in: [gen/CamundaClient.ts:467](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L467)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getProcessInstance>>;
```

Defined in: [gen/CamundaClient.ts:469](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L469)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
