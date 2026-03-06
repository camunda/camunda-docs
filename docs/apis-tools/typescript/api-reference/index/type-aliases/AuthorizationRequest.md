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

Defined in: [gen/types.gen.ts:595](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L595)

Defines an authorization request.
Either an id-based or a property-based authorization can be provided.
