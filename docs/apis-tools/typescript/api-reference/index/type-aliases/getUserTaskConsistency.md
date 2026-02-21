---
title: "Type Alias: getUserTaskConsistency"
sidebar_label: "getUserTaskConsistency"
mdx:
  format: md
---

# Type Alias: getUserTaskConsistency

```ts
type getUserTaskConsistency = object;
```

Defined in: [gen/CamundaClient.ts:577](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L577)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getUserTask>>;
```

Defined in: [gen/CamundaClient.ts:579](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L579)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
