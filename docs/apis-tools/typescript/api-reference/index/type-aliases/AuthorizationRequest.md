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

Defined in: [gen/types.gen.ts:578](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L578)

Defines an authorization request.
Either an id-based or a property-based authorization can be provided.
