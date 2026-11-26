---
title: "Type Alias: SecretStatusEnum"
sidebar_label: "SecretStatusEnum"
mdx:
  format: md
---

# Type Alias: SecretStatusEnum

```ts
type SecretStatusEnum =
  (typeof SecretStatusEnum)[keyof typeof SecretStatusEnum];
```

The state a secret store reports for a secret.

- `ACTIVE`: the store reports the secret as usable.
- `DISABLED`: the secret was disabled in its store.
- `EXPIRED`: the secret's expiry date has passed.
- `NOT_YET_ACTIVE`: the secret's activation date is in the future.

A secret has exactly one status. When several apply, `DISABLED` wins over `EXPIRED`, and
`EXPIRED` over `NOT_YET_ACTIVE`: a secret that is both disabled and expired is listed only
as `DISABLED`, so an `EXPIRED` filter skips it.

A store that cannot report states reports every secret as `ACTIVE`.
