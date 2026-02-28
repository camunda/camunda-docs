---
title: "Type Alias: getProcessInstanceSequenceFlowsConsistency"
sidebar_label: "getProcessInstanceSequenceFlowsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessInstanceSequenceFlowsConsistency

```ts
type getProcessInstanceSequenceFlowsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:483](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L483)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessInstanceSequenceFlows>
>;
```

Defined in: [gen/CamundaClient.ts:485](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L485)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
