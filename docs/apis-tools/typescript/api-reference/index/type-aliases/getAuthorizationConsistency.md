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

Defined in: [gen/CamundaClient.ts:270](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L270)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getAuthorization>>;
```

Defined in: [gen/CamundaClient.ts:272](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L272)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
