---
title: "Type Alias: getUserConsistency"
sidebar_label: "getUserConsistency"
mdx:
  format: md
---

# Type Alias: getUserConsistency

```ts
type getUserConsistency = object;
```

Defined in: [gen/CamundaClient.ts:569](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L569)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getUser>>;
```

Defined in: [gen/CamundaClient.ts:571](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L571)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
