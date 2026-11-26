---
title: "Variable: SecretStatusEnum"
sidebar_label: "SecretStatusEnum"
mdx:
  format: md
---

# Variable: SecretStatusEnum

```ts
const SecretStatusEnum: object;
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

## Type Declaration

### ACTIVE

```ts
readonly ACTIVE: "ACTIVE" = 'ACTIVE';
```

### DISABLED

```ts
readonly DISABLED: "DISABLED" = 'DISABLED';
```

### EXPIRED

```ts
readonly EXPIRED: "EXPIRED" = 'EXPIRED';
```

### NOT\_YET\_ACTIVE

```ts
readonly NOT_YET_ACTIVE: "NOT_YET_ACTIVE" = 'NOT_YET_ACTIVE';
```
