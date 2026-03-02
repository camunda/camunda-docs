---
title: "Type Alias: getProcessInstanceCallHierarchyConsistency"
sidebar_label: "getProcessInstanceCallHierarchyConsistency"
mdx:
  format: md
---

# Type Alias: getProcessInstanceCallHierarchyConsistency

```ts
type getProcessInstanceCallHierarchyConsistency = object;
```

Defined in: [gen/CamundaClient.ts:475](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L475)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessInstanceCallHierarchy>
>;
```

Defined in: [gen/CamundaClient.ts:477](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L477)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
