---
title: "Type Alias: searchAuthorizationsConsistency"
sidebar_label: "searchAuthorizationsConsistency"
mdx:
  format: md
---

# Type Alias: searchAuthorizationsConsistency

```ts
type searchAuthorizationsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:670](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L670)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchAuthorizations>>;
```

Defined in: [gen/CamundaClient.ts:672](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L672)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
