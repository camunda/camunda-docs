---
title: "Type Alias: createAdminUserConsistency"
sidebar_label: "createAdminUserConsistency"
mdx:
  format: md
---

# Type Alias: createAdminUserConsistency

```ts
type createAdminUserConsistency = object;
```

Defined in: [gen/CamundaClient.ts:147](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L147)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.createAdminUser>>;
```

Defined in: [gen/CamundaClient.ts:149](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L149)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
