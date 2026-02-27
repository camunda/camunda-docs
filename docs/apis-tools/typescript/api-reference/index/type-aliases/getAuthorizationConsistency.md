---
title: "Type Alias: getAuthorizationConsistency"
sidebar_label: "getAuthorizationConsistency"
mdx:
  format: md
---

# Type Alias: getAuthorizationConsistency

```ts
type getAuthorizationConsistency = object;
```

Defined in: [gen/CamundaClient.ts:305](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L305)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getAuthorization>>;
```

Defined in: [gen/CamundaClient.ts:307](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L307)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
