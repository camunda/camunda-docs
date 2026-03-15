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

Defined in: [gen/types.gen.ts:595](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L595)

Defines an authorization request.
Either an id-based or a property-based authorization can be provided.
