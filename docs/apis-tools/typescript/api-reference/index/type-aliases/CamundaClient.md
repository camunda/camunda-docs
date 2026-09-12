---
title: "Type Alias: CamundaClient"
sidebar_label: "CamundaClient"
mdx:
  format: md
---

# Type Alias: CamundaClient

```ts
type CamundaClient = WithSearchPagination<CamundaClientBase>;
```

Public Camunda client type: the base class augmented with `.paginate(...)` on
every `search*` operation. The `.paginate` methods are installed at runtime by
the constructor (via `installSearchPagination`), so both construction paths —
the `createCamundaClient` factory _and_ direct `new CamundaClient()` — yield a
value whose static type matches the runtime shape.

This is expressed as a separate type + value pair rather than
declaration-merging an interface onto the class because
`SearchPaginationApi<CamundaClient>` is self-referential (it maps over
`keyof CamundaClient`), which TypeScript rejects as an interface `extends`
clause ("recursively references itself as a base type").
