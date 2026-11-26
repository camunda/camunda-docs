---
title: "Type Alias: AuthenticatedCamundaUserResult"
sidebar_label: "AuthenticatedCamundaUserResult"
mdx:
  format: md
---

# Type Alias: AuthenticatedCamundaUserResult

```ts
type AuthenticatedCamundaUserResult = CamundaUserResult & object;
```

A `CamundaUserResult` with `isAnonymous` set to `false`, so `username` is always set. `GET /authentication/me` returns `CamundaUserResult`. Clients that only handle a caller with an identity can narrow the result to this schema once they checked `isAnonymous`.

## Type Declaration

### isAnonymous?

```ts
isAnonymous?: false;
```

Always `false`, because the caller has an identity.

### username?

```ts
username?: Username;
```

The username of the user.
