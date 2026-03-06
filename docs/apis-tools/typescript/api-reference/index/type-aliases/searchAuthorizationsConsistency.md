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

Defined in: [gen/CamundaClient.ts:638](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L638)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchAuthorizations>>;
```

Defined in: [gen/CamundaClient.ts:640](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L640)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
