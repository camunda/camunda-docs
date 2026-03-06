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

Defined in: [gen/CamundaClient.ts:266](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L266)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getAuthorization>>;
```

Defined in: [gen/CamundaClient.ts:268](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L268)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
