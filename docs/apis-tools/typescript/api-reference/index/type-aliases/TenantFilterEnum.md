---
title: "Type Alias: TenantFilterEnum"
sidebar_label: "TenantFilterEnum"
mdx:
  format: md
---

# Type Alias: TenantFilterEnum

```ts
type TenantFilterEnum = "PROVIDED" | "ASSIGNED";
```

Defined in: [gen/types.gen.ts:4538](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4538)

The tenant filtering strategy for job activation. Determines whether to use tenant IDs provided in the request or tenant IDs assigned to the authenticated principal.
