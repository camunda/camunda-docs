---
title: "Type Alias: AuthorizationRequest"
sidebar_label: "AuthorizationRequest"
mdx:
  format: md
---

# Type Alias: AuthorizationRequest

```ts
type AuthorizationRequest =
  | AuthorizationIdBasedRequest
  | AuthorizationPropertyBasedRequest;
```

Defined in: [gen/types.gen.ts:591](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L591)

Defines an authorization request.
Either an id-based or a property-based authorization can be provided.
