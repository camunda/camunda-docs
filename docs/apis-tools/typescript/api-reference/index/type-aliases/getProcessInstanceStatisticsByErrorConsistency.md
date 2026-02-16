---
title: "Type Alias: getProcessInstanceStatisticsByErrorConsistency"
sidebar_label: "getProcessInstanceStatisticsByErrorConsistency"
mdx:
  format: md
---

# Type Alias: getProcessInstanceStatisticsByErrorConsistency

```ts
type getProcessInstanceStatisticsByErrorConsistency = object;
```

Defined in: [gen/CamundaClient.ts:507](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L507)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessInstanceStatisticsByError>
>;
```

Defined in: [gen/CamundaClient.ts:509](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L509)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
