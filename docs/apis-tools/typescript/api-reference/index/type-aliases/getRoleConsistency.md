---
title: "Type Alias: getRoleConsistency"
sidebar_label: "getRoleConsistency"
mdx:
  format: md
---

# Type Alias: getRoleConsistency

```ts
type getRoleConsistency = object;
```

Defined in: [gen/CamundaClient.ts:521](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L521)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getRole>>;
```

Defined in: [gen/CamundaClient.ts:523](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L523)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
