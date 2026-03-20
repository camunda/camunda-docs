---
title: "Type Alias: createUserConsistency"
sidebar_label: "createUserConsistency"
mdx:
  format: md
---

# Type Alias: createUserConsistency

```ts
type createUserConsistency = object;
```

Defined in: [gen/CamundaClient.ts:202](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L202)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.createUser>>;
```

Defined in: [gen/CamundaClient.ts:204](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L204)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
