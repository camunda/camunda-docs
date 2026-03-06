---
title: "Type Alias: getAuditLogConsistency"
sidebar_label: "getAuditLogConsistency"
mdx:
  format: md
---

# Type Alias: getAuditLogConsistency

```ts
type getAuditLogConsistency = object;
```

Defined in: [gen/CamundaClient.ts:256](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L256)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getAuditLog>>;
```

Defined in: [gen/CamundaClient.ts:258](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L258)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
