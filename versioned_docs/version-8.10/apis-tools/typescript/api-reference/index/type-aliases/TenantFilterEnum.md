---
title: "Type Alias: TenantFilterEnum"
sidebar_label: "TenantFilterEnum"
mdx:
  format: md
---

# Type Alias: TenantFilterEnum

```ts
type TenantFilterEnum =
  (typeof TenantFilterEnum)[keyof typeof TenantFilterEnum];
```

The tenant filtering strategy for job activation. Determines whether to use tenant IDs provided in the request or tenant IDs assigned to the authenticated principal.
