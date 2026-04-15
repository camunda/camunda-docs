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

Defines an authorization request.
Either an id-based or a property-based authorization can be provided.
