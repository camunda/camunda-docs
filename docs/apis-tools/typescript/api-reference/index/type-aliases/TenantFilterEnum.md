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

Defined in: [gen/types.gen.ts:3896](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3896)

The tenant filtering strategy for job activation. Determines whether to use tenant IDs provided in the request or tenant IDs assigned to the authenticated principal.
